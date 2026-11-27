"""Opt-in, synchronous History example for DSPy's in-progress 3.5 adapters.

Illustrative external code, not an upstream patch or production replay policy.
"""

from copy import deepcopy

import dspy
from dspy._vendor.lm15.serde import message_from_dict, message_to_dict

KEY = "__continuity_example__"


def json_fields(fields):
    return dspy.History(messages=[fields]).model_dump(mode="json")["messages"][0]


class ContinuityAdapter(dspy.ChatAdapter):
    def __init__(self, route):
        super().__init__(use_json_adapter_fallback=False)
        self.route = route
        self.prompt = None
        self.message = None
        self.records = []

    def format_conversation_history(self, signature, history_field_name, inputs):
        messages = []
        for turn in inputs.get(history_field_name, dspy.History(messages=[])).messages:
            fields = {key: value for key, value in turn.items() if key != KEY}
            rendered = super().format_conversation_history(
                signature,
                history_field_name,
                {history_field_name: dspy.History(messages=[fields])},
            )
            record = turn.get(KEY)
            if record is not None:
                if record["route"] != self.route:
                    raise ValueError(
                        "This example requires the original explicitly compatible route."
                    )
                if json_fields(fields) != record["fields"]:
                    raise ValueError(
                        "History was edited; choose a fresh visible-context handoff."
                    )
                if len(rendered) != 2 or [m.role for m in rendered] != [
                    "user",
                    "assistant",
                ]:
                    raise ValueError(
                        "This example supports ordinary question/answer turns only."
                    )
                rendered[-1] = message_from_dict(record["assistant"])
                self.records.append(record)
            messages.extend(rendered)
        inputs.pop(history_field_name, None)
        return messages

    def format(self, signature, demos, inputs):
        self.records = []
        prompt = super().format(signature, demos, inputs)
        serialized = [message_to_dict(message) for message in prompt.messages]
        for record in self.records:
            prefix = record["prefix"]
            if prompt.system != record["system"] or serialized[: len(prefix)] != prefix:
                raise ValueError(
                    "The saved prompt prefix changed; explicit handoff is required."
                )
            if (
                len(serialized) <= len(prefix)
                or serialized[len(prefix)] != record["assistant"]
            ):
                raise ValueError("The saved assistant message changed position.")
        self.prompt = prompt
        return prompt

    def _call_postprocess(self, processed_signature, original_signature, responses):
        if len(responses) != 1:
            raise ValueError("This example supports a single candidate per turn.")
        values = super()._call_postprocess(
            processed_signature, original_signature, responses
        )
        self.message = responses[0].message
        return values


def predict_turn(predictor, *, lm, route, history, **inputs):
    """Return an ordinary Prediction with private opt-in capture metadata.

    `route` is a caller declaration, not automatic provider compatibility detection.
    The caller must retain endpoint, account, model and applicable settings.
    """
    adapter = ContinuityAdapter(route)
    with dspy.context(lm=lm, adapter=adapter):
        prediction = predictor(history=history, **inputs)
    fields = {**inputs, **prediction}
    prediction._continuity_example = {
        "route": route,
        "fields": json_fields(fields),
        "outputs": json_fields(dict(prediction)),
        "prefix": [message_to_dict(message) for message in adapter.prompt.messages],
        "system": adapter.prompt.system,
        "assistant": message_to_dict(adapter.message),
    }
    return prediction


def remember(history, prediction):
    """Explicitly carry captured metadata into History's existing JSON format.

    Spreading {**prediction} intentionally keeps its existing plain-field behaviour.
    """
    record = deepcopy(prediction._continuity_example)
    if json_fields(dict(prediction)) != record["outputs"]:
        raise ValueError("Prediction was edited after capture.")
    return dspy.History(messages=[*history.messages, {**record["fields"], KEY: record}])
