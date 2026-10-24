We want the fleet to look after its apps. The UI gives us the intel to understand what is happening, check the work done and engage with an agent. We can set the direction, ask a question or intervene. The agent carries on operating when we close the page.

This is what we're building with **Integrated Fleet**: agents that know an app's purpose, its releases and the health of the server it runs on, and can follow a problem from one to the other.

Our [First Officer](/articles/the-first-officer) already reports before we ask. Integrated Fleet is the work behind that report.

## One operator can see the app, its release and its server

At Hyperdrift, most apps are experiments. Some may never prove demand. A few matter to the business every day. We want the fleet to recognise the difference and give capacity to the apps that earn it.

We control the code, deployments and infrastructure configuration. An operator with access to all three can know what an app is for, what changed in its latest release and whether its server has enough capacity. It can use that context to act, then check the result.

We want to stop experiments when they aren't needed, recover services when they fail and give successful apps more capacity as demand grows. This should be practical for a founder or a small tech hub running its own services, on infrastructure they choose, with tools they control. That is the alternative we want to build.

When we open the UI, we should be able to see what changed and why the agent acted. If we disagree, we can give it a new instruction. A new capability adds something to read and something the agent may do. It doesn't need a new control panel.

## The first repair already works locally

We tested automatic recovery on Stack One, a static app in our fleet. We deliberately broke the content in a local release. After three failed checks, thirty seconds apart, the recovery policy restored the previous release and verified the response through Nginx.

{{visual:primary}}

The repair followed a fixed rule. For decisions such as whether an experiment still deserves resources or a traffic spike is useful demand, we want an agent to consider the app's purpose and the work underway. That part is still to be built.

We're building on Ansible, Nginx and tools we already use. Next, we'll put this recovery setup on the replacement server as we migrate our apps. The broader agent operation will follow from what we learn running it.
