import json

import dspy
import pytest
from continuity import KEY, predict_turn, remember
from dspy._vendor.lm15.providers.openai import OpenAILM
from dspy._vendor.lm15.serde import message_to_dict
from dspy.lm15 import (
    ContinuationState,
    Message,
    Response,
    TextPart,
    ThinkingPart,
    Usage,
)


class QA(dspy.Signature):
    """Answer the question."""

    question: str = dspy.InputField()
    history: dspy.History = dspy.InputField()
    answer: str = dspy.OutputField()


def response(answer, *, opaque=False):
    parts = []
    if opaque:
        parts.append(
            ThinkingPart(
                "",
                continuation=(
                    ContinuationState(
                        provider="openai",
                        kind="reasoning_item",
                        data={
                            "id": "synthetic-item",
                            "encrypted_content": "synthetic-opaque",
                        },
                    ),
                ),
            )
        )
    parts.append(TextPart(f"[[ ## answer ## ]]\n{answer}\n\n[[ ## completed ## ]]"))
    return Response(
        id=None,
        model="fixture/model",
        message=Message.assistant(parts),
        finish_reason="stop",
        usage=Usage(),
    )


class Engine:
    supports_reasoning = True
    supports_function_calling = False
    supports_response_schema = False
    supported_params = frozenset({"temperature", "max_tokens"})

    def __init__(self):
        self.responses = [response("Paris", opaque=True), response("Yes")]
        self.requests = []

    def complete(self, request):
        self.requests.append(request)
        return self.responses.pop(0)


def setup():
    engine = Engine()
    return (
        dspy.Predict(QA),
        dspy.LM("fixture/model", engine=engine, cache=False),
        engine,
    )


def captured():
    predict, lm, engine = setup()
    original = engine.responses[0].message
    history = dspy.History(messages=[])
    prediction = predict_turn(
        predict,
        lm=lm,
        route="same-offline-route",
        history=history,
        question="Capital of France?",
    )
    return predict, lm, engine, original, prediction, remember(history, prediction)


def test_public_two_turn_json_restore_preserves_empty_summary_state():
    predict, lm, engine, original, prediction, history = captured()
    restored = dspy.History.model_validate_json(history.model_dump_json())
    result = predict_turn(
        predict,
        lm=lm,
        route="same-offline-route",
        history=restored,
        question="Are you sure?",
    )
    assert result.answer == "Yes"
    outbound = engine.requests[1].messages[1]
    assert message_to_dict(outbound) == message_to_dict(original)
    assert isinstance(outbound.parts[0], ThinkingPart)
    assert outbound.parts[0].text == ""
    assert (
        outbound.parts[0].continuation[0].data["encrypted_content"]
        == "synthetic-opaque"
    )
    assert dict(prediction) == {"answer": "Paris"}
    assert "synthetic-opaque" not in repr(prediction)
    provider = OpenAILM(api_key="synthetic-not-a-real-key")
    request = engine.requests[1]
    wire_items = provider._build_input(request.messages, provider._compat(request))
    assert wire_items[1] == {
        "type": "reasoning",
        "id": "synthetic-item",
        "encrypted_content": "synthetic-opaque",
        "summary": [],
    }
    assert wire_items[2]["role"] == "assistant"


def test_plain_history_still_matches_unmodified_chat_adapter():
    predict, lm, engine = setup()
    history = dspy.History(
        messages=[{"question": "Earlier?", "answer": "Earlier answer"}]
    )
    expected = dspy.ChatAdapter().format(
        QA, [], {"question": "Now?", "history": history}
    )
    predict_turn(
        predict, lm=lm, route="same-offline-route", history=history, question="Now?"
    )
    assert engine.requests[0].messages == expected.messages
    assert engine.requests[0].system == expected.system


def test_unmodified_spread_history_reproduces_loss():
    predict, lm, engine = setup()
    original = engine.responses[0].message
    with dspy.context(lm=lm, adapter=dspy.ChatAdapter()):
        first = predict(
            question="Capital of France?", history=dspy.History(messages=[])
        )
        history = dspy.History(messages=[{"question": "Capital of France?", **first}])
        restored = dspy.History.model_validate_json(history.model_dump_json())
        predict(question="Are you sure?", history=restored)
    assert original.parts[0].continuation
    assert not any(part.continuation for part in engine.requests[1].messages[1].parts)


@pytest.mark.parametrize("change", ["answer", "question", "route", "instructions"])
def test_changed_replay_is_rejected_before_engine_and_preserves_record(change):
    predict, lm, engine, _, _, history = captured()
    if change in ("answer", "question"):
        history.messages[0][change] = "edited"
    if change == "instructions":
        predict.signature = predict.signature.with_instructions("Answer differently.")
    before = history.model_dump_json()
    route = "other-route" if change == "route" else "same-offline-route"
    with pytest.raises(ValueError):
        predict_turn(predict, lm=lm, route=route, history=history, question="Again?")
    assert len(engine.requests) == 1
    assert history.model_dump_json() == before
    assert history.messages[0][KEY]["assistant"]["parts"][0]["continuation"]


if __name__ == "__main__":
    predict, lm, engine, original, _, history = captured()
    restored = dspy.History.model_validate_json(history.model_dump_json())
    prediction = predict_turn(
        predict,
        lm=lm,
        route="same-offline-route",
        history=restored,
        question="Are you sure?",
    )
    print(
        json.dumps(
            {
                "answer": prediction.answer,
                "requests": len(engine.requests),
                "assistant_message_preserved": message_to_dict(
                    engine.requests[1].messages[1]
                )
                == message_to_dict(original),
                "empty_summary_preserved": engine.requests[1].messages[1].parts[0].text
                == "",
                "provider_calls": 0,
            },
            indent=2,
        )
    )
