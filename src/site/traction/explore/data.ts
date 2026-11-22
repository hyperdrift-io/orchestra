/** A worked example of how Traction uses HD OS. Events and counts are illustrative. */
export const operatingServices = [
  { id: 'pulse', name: 'Market pulse', symbol: 'eye', colour: '#78dcca' },
  { id: 'team', name: 'Agent team', symbol: 'conversation', colour: '#9dbdff' },
  { id: 'crm', name: 'Prospect CRM', symbol: 'magnifier', colour: '#e6b46c' },
  { id: 'build', name: 'Initiative delivery', symbol: 'wrench', colour: '#f19c9a' },
  { id: 'measure', name: 'Analytics', symbol: 'chart', colour: '#c3a6f5' },
] as const;

export const operatingScenes = [
  {
    domain: 2, next: 3, label: 'A prospect raises an objection',
    title: 'Build around the friction customers report.',
    text: 'Studio owners say they would switch booking apps if they could keep their current appointments. The Growth Manager checks which prospects raised it and how it affects their decisions.',
    work: 'Record the replies in Traction CRM. Agree an initiative for the Builder to test calendar import with those studios.',
    record: 'Prospect replies, the repeated objection and the agreed scope.',
    handoff: 'CRM evidence → Builder',
    packet: 'Customer objection',
  },
  {
    domain: 0, next: 1, label: 'A competitor changes its fees',
    title: 'Check whether conditions have changed for your customers.',
    text: 'A booking platform raises its fees. Intel finds the announcement. The Growth Manager checks whether independent studios using it are looking to switch.',
    work: 'Bring a sourced market change into the team’s decisions. You can pursue the opportunity or revisit it when you know more.',
    record: 'Source, date and the customer segment it could affect.',
    handoff: 'Intel → Growth Manager',
    packet: 'Market signal',
  },
  {
    domain: 4, next: 1, label: 'Customer behaviour changes',
    title: 'Read the outcome and choose what to do next.',
    text: 'Check the trial and first-booking events, then compare cohorts. More studios in this example got a first booking after calendar import. Paid conversion and repeat use still need evidence.',
    cohorts: [{ label: 'Before', completed: 12, enrolled: 40 }, { label: 'After', completed: 18, enrolled: 40 }],
    work: 'Analytics links the comparison to the initiative. The Growth Manager uses the result and customer replies to decide whether there’s enough evidence for a follow-up.',
    record: 'First-booking comparison and the result still to check.',
    handoff: 'Analytics evidence → Growth Manager',
    packet: 'Outcome evidence',
  },
  {
    domain: 3, next: 4, label: 'An improvement goes live',
    title: 'Check the release and measure what customers do.',
    text: 'After you approve a release of calendar import, the Builder checks that a studio can import its appointments and take its first booking.',
    work: 'Attach the live release and checked events to the initiative. Analytics uses them to compare customer behaviour with the baseline.',
    record: 'Live release, customer-path check and measurement plan.',
    handoff: 'Shipped initiative → Analytics',
    packet: 'Release and measurement plan',
  },
  {
    domain: 1, next: 2, label: 'The team spots a better audience',
    title: 'Put customer research behind the next priority.',
    text: 'The Growth Manager finds that independent studios ask about moving appointments, while larger businesses need features your app doesn’t offer. You agree to focus research on smaller studios.',
    work: 'Apply the agreed criteria in Traction CRM. Research prospects who match and keep the evidence of fit with each record.',
    record: 'Target segment, reason to focus and the next research question.',
    handoff: 'Growth Manager → Traction CRM',
    packet: 'Agreed prospect criteria',
  },
] as const;
