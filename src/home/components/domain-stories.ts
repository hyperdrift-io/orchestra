/** Independent Traction workflows within the original five-domain HD OS sphere. */
export const domainStories = [
  {name:'Research',form:'Customer research',promise:'Find people your app could help.',emotion:'Your app works, but finding relevant customers takes time. You need reasons to approach someone beyond a name on a list.',facets:['Find customers','Research fit','Review & matches','Choose contacts']},
  {name:'CRM',form:'Prospect CRM',promise:'Keep the next conversation in context.',emotion:'Drafts, replies and follow-ups can end up scattered across your inbox and notes.',facets:['Lost context','Draft outreach','Prospect records','Review & send']},
  {name:'Market',form:'Market signals',promise:'See which market change deserves your attention.',emotion:'News moves quickly. You need to know which change could matter to your app and its customers.',facets:['Market change','Read sources','Sourced briefing','Choose a move']},
  {name:'Build',form:'Initiative delivery',promise:'Make the improvement customers need.',emotion:'A customer objection or product gap needs more than another task on a list.',facets:['Product gap','Agree the build','Preview & checks','Review release']},
  {name:'Analytics',form:'Customer outcomes',promise:'See what happened after the work.',emotion:'You have shipped a change or contacted prospects. You need to see whether customer behaviour changed.',facets:['Unclear results','Connect evidence','Activity & work','Next decision']},
] as const;
