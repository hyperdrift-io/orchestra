An agent should be able to pick up a job tomorrow without asking you to explain it again. It should have the sources it checked, the decisions you made and the questions still open.

That is why we investigated a gap in [DSPy's conversation history](https://github.com/stanfordnlp/dspy/issues/10675). DSPy helps developers build AI programmes. Its history can retain the words of a conversation while losing other information a model supplied to help it continue. We built a small example to find out what survived a save and reload.

## What should survive a pause?

Imagine asking an agent to compare suppliers. It has checked three offers, ruled one out and found a question that needs your answer. When you return tomorrow, it should know what it checked and why. You should be able to inspect those sources, correct its decision and continue from there.

The same applies when you choose a different model. Your goal, evidence, decisions and next action should remain usable. Those are your work, and they deserve a readable record.

A model may also return additional continuation information that people cannot read. A compatible model can sometimes use that information on the next call. It is different from a handoff another person or model can understand. Saving one does not replace the other.

{{visual:editorial}}

## What did our example show?

We compared two ways of saving the same exchange. The ordinary path kept the visible answer but lost the extra continuation information. Our helper kept both through a save and reload, and passed them into the next request.

Seven offline checks passed on 30 October against [the DSPy version we tested](https://github.com/stanfordnlp/dspy/tree/25162c4fc05c2d2d019b0ffb5b6b2a9f315ec007). We used simulated responses, so this proves that the information survived the journey. It does not show that a live model gave a better answer or saved money.

The code and test instructions are in [our Hyperdrift reference PR](https://github.com/hyperdrift-io/orchestra/pull/5). The [DSPy continuity issue](https://github.com/stanfordnlp/dspy/issues/10675) is still open, and another contributor has [offered tests for saved conversations](https://github.com/stanfordnlp/dspy/issues/10675#issuecomment-6321503189). We haven’t submitted our example to DSPy.

## What does this mean for people using agents?

A useful handoff lets you see where the work stands. It keeps the goal, the evidence behind a decision and what should happen next. It also records actions already completed, so a resumed agent can check before doing them again.

At Hyperdrift, we want people to be able to inspect and resume an agent’s work after a pause or a change of model. The DSPy example tests one part of that: what a compatible model can recover from a saved exchange.

When choosing an agent workflow, try pausing a real task and resuming it. Can you find its sources? Does it remember the decision you changed? Can you see what it has already done? Those answers tell you more about continuity than the length of its chat history.
