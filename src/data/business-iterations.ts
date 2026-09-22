import type { BusinessScenario, BusinessStep } from './business-scenarios';

/** Successful illustrative iterations, never presented as measured client results. Speak to Enable. */
export interface BusinessIteration { title:string; signal:string; action:string; benefit:string; measure:string; }
export const businessIterations: Record<string,BusinessIteration[]> = {
  product: [
    {title:'A clearer first step',signal:'Interested visitors reach pricing but hesitate during signup.',action:'Explain the first useful outcome and simplify the route into it.',benefit:'More of your existing demand can become customers.',measure:'Completed signups and paid conversion.'},
    {title:'Value arrives earlier',signal:'New customers repeat the same questions before getting a useful result.',action:'Bring the right guidance into the moment those questions arise.',benefit:'Customers reach value sooner, with less support work.',measure:'Time to first value, retention and cost to serve.'},
    {title:'The next visit builds on the last',signal:'Returning customers spend time reconstructing work they have already done.',action:'Carry the useful context forward and prepare their next step.',benefit:'More reasons to return. More value from the relationship.',measure:'Repeat use, retained revenue and contribution margin.'},
  ],
  operations: [
    {title:'Collect the context once',signal:'The team asks for the same information at several handoffs.',action:'Gather the request and its context in one shared view.',benefit:'Less repeated administration. More capacity for customers.',measure:'Handling time and cost per request.'},
    {title:'Exceptions reach the right person',signal:'Unusual requests wait while the team works out who should handle them.',action:'Prepare routine work and route exceptions with the evidence attached.',benefit:'Faster service while specialist judgement stays with people.',measure:'Exception waiting time, rework and satisfaction.'},
    {title:'Good service becomes easier to repeat',signal:'The team now knows which responses and handoffs work best.',action:'Reuse the proven preparation and retain what each exception teaches.',benefit:'Serve growing demand without the same growth in overhead.',measure:'Capacity, cost to serve and gross margin.'},
  ],
  consultancy: [
    {title:'Recognise the strongest fit',signal:'A new enquiry resembles valuable work the team has delivered before.',action:'Bring relevant experience and available capacity into the opportunity brief.',benefit:'Spend senior attention on engagements where it can matter.',measure:'Qualified enquiries, response time and target margin.'},
    {title:'A proposal that starts ahead',signal:'The team repeatedly assembles the same evidence and scope questions.',action:'Prepare relevant examples and a first scope for an expert to refine.',benefit:'More time for the judgement that wins suitable work.',measure:'Proposal time, win rate and scope confidence.'},
    {title:'Delivery inherits the learning',signal:'Useful context is lost between winning an engagement and starting delivery.',action:'Carry the agreed scope, decisions and reusable expertise into the work.',benefit:'Less rework. Stronger delivery and repeat relationships.',measure:'Time to first value, delivery margin and repeat business.'},
  ],
};
export function iterationSteps(scenario:BusinessScenario, iteration:BusinessIteration):BusinessStep[] {
  return [
    {name:'Notice',title:iteration.title,signal:iteration.signal,action:'Bring customer evidence, work in progress and business costs into a shared view.',impact:iteration.benefit,measure:iteration.measure},
    {name:'Choose',title:'Choose the move worth making.',signal:iteration.signal,action:`Agree this improvement: ${iteration.action} The founder sets the scope and spending limit.`,impact:'Put attention and budget behind one concrete opportunity.',measure:'Expected value, delivery cost and confidence.'},
    {name:'Improve',title:iteration.title,signal:'The founder has agreed the opportunity and the boundaries.',action:iteration.action,impact:iteration.benefit,measure:iteration.measure},
    {name:'Release',title:'Let the customer experience it.',signal:'The proposed improvement is ready for review.',action:'Review the work, release within the agreed scope and watch the response.',impact:iteration.benefit,measure:iteration.measure},
    {name:'Learn',title:'Let the next cycle start stronger.',signal:'There is now customer feedback and delivery evidence to compare.',action:'Compare the result with the baseline and costs. Keep what helps; revise or reverse what does not.',impact:`Retain the useful learning. ${scenario.outcome}`,measure:iteration.measure},
  ];
}
