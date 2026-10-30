DSPy helps developers improve language-model programmes against a clear measure of success. We think it is worth trying when a team repeats the same valuable task, can recognise a good answer and wants to compare changes systematically.

The useful starting point is a small job your team already understands. Define its inputs and outputs, collect representative examples and measure the current result. DSPy gives that work a structure you can extend as the evidence improves.

> Give the programme a clear job and a useful measure of success. Improve it against real examples.

## Start with a task people can judge

Consider an illustrative support workflow. A customer describes a billing problem. The programme reads the relevant policy and prepares a suggested reply with supporting passages. A person reviews it before sending.

The team can judge several things: did it identify the right policy, support the answer with evidence and leave the customer with a useful next step? Those judgements give the developer something concrete to improve. They also reveal what needs human review.

DSPy calls the task definition a **signature**. Inputs and outputs have meaningful names and can have types. Our example might take `question` and `policy` and return `answer` and `evidence`. A class-based signature can give each field a description. These are useful software interfaces; whether the answer is correct still needs evaluation. [DSPy signatures](https://github.com/stanfordnlp/dspy/blob/98830391be6fbf81523757271432bba1c6c4eb80/docs/docs/learn/programming/signatures.md).

## Build a programme from small modules

A **module** applies a strategy to a signature. `Predict` is the basic building block. Other modules support additional reasoning or tool use. Modules can be composed into a larger programme, with normal Python controlling how results move between them. [DSPy modules](https://github.com/stanfordnlp/dspy/blob/98830391be6fbf81523757271432bba1c6c4eb80/docs/docs/learn/programming/modules.md).

For the support example, we would first keep policy retrieval separate from response preparation. That lets the team inspect which passages were found and what the answer did with them. If retrieval is already reliable, the first experiment can focus on the reply.

This makes a model change easier to assess. Keep the task and evaluation examples stable, run the same programme with another supported model and compare the results. The interface gives us a consistent experiment. Model behaviour, provider features and operating cost still need checking on that workload.

We would begin with one module and add another when a recurring failure explains why it belongs. A short programme is easier for a colleague to review and for an evaluation to diagnose.

## Make the metric reflect useful work

DSPy's **metric** evaluates a prediction against an example. It can return a simple correct-or-incorrect result or a score. More involved evaluations can use model feedback. The framework's documentation treats metric design as work that improves through inspection and iteration. [DSPy metrics](https://github.com/stanfordnlp/dspy/blob/98830391be6fbf81523757271432bba1c6c4eb80/docs/docs/learn/evaluation/metrics.md).

Our support example needs more than fluent prose. We would check whether the answer follows the selected policy, whether its references support its claims and whether a person can act on it. Human reviewers should examine disagreements between their judgement and the metric. A model-based judge brings its own errors, so its score needs that calibration.

Keep difficult and ordinary examples. A workflow that helps with routine questions but struggles with exceptions may still have value if those exceptions reliably reach a person. Measure that boundary explicitly.

## Optimise after the baseline

DSPy's optimisers search for improvements to a programme using examples and a metric. Depending on the optimiser, that can include instructions, demonstrations or model weights. Training, validation and held-out evaluation have different jobs. The held-out set helps assess whether a promising change transfers beyond the examples used to select it. [Optimisation overview](https://github.com/stanfordnlp/dspy/blob/98830391be6fbf81523757271432bba1c6c4eb80/docs/docs/learn/optimization/overview.md).

We would record the starting programme, model settings, dataset version and metric before the first run. Then compare a candidate against that baseline. Keep the accepted programme and enough context to reproduce the comparison.

Quality, latency and cost should travel together. An optimisation run consumes model calls, and the resulting programme may make more calls per task. A stronger evaluation score can justify that cost when it saves worthwhile review time or improves task completion. Those benefits need measuring in the actual workflow.

For a founder, the decision is practical: does the improvement help the team finish useful work at an acceptable cost? DSPy supplies a way to investigate that question. The team's examples and acceptance criteria make the answer relevant.

## Where RLM fits

**RLM means Recursive Language Model.** DSPy's implementation puts large inputs into a Python interpreter, where the model can inspect them through code and make smaller model calls on selected material. A long document collection can stay available as data while the model works on relevant portions. [DSPy RLM guide](https://github.com/stanfordnlp/dspy/blob/98830391be6fbf81523757271432bba1c6c4eb80/docs/docs/diving-deeper/rlm.md).

For example, an exploratory programme could locate relevant policy sections with Python, ask a sub-model to examine each one and combine the findings. That is an illustrative design, not a benchmark we have run. RLM is experimental in the inspected revision. Its call budget, execution environment and recovery behaviour need deliberate configuration.

RLM's interpreter state is one part of the work. The conversation record and a provider's native reasoning state are other parts. Each has its own lifetime. This distinction led us to research DSPy's [reasoning-continuity issue](https://github.com/stanfordnlp/dspy/issues/10675), which we explore in [Helping agents pick up where they left off](/articles/dspy-reasoning-continuity).

## Choose one repeatable workflow

DSPy is a good candidate when you can define a recurring task, assemble useful examples and evaluate the result. A team still discovering what customers need may get more value first from reviewing a few real cases with people.

For a first experiment, choose one task and agree what success means with the person who uses its output. Establish the baseline, make one change and review the differences on held-out examples. That gives you a sound basis for deciding whether to keep improving the programme with DSPy.
