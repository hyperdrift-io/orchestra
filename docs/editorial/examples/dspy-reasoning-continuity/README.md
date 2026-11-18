# Replaying a saved DSPy turn

This offline example accompanies [DSPy discussion #10675](https://github.com/stanfordnlp/dspy/issues/10675). It checks what survives when a DSPy History is saved as JSON and reloaded before the next Predict call.

The control keeps the visible answer and drops the model's extra state. The opt-in adapter preserves the original assistant message, including synthetic continuation state, and replays it only when the visible fields, prompt prefix and declared route match. It uses private DSPy hooks and handles synchronous, single-candidate question-and-answer turns. The fixtures send zero provider requests. Live model quality, cost and cross-provider replay are outside the test.

## Reproduce

In a fresh Python virtual environment, install the pinned DSPy source and pytest, then run the suite from this directory.

```sh
python -m pip install 'dspy @ git+https://github.com/stanfordnlp/dspy.git@25162c4fc05c2d2d019b0ffb5b6b2a9f315ec007' pytest
python -m pytest -q test_continuity.py
```

The [DSPy adapter migration](https://github.com/stanfordnlp/dspy/pull/10713) is a separate upstream change. This example documents the investigation and has no upstream review or acceptance.
