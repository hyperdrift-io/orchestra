import {pageMetadata} from '@/lib/site-metadata';
import {StaticPage} from '@/site/StaticPage';
export const metadata=pageMetadata("Custom AI workflows","Connect agents, tools, data and permissions around one useful business workflow, with people in control.","/workflows");
export default function Page(){return <StaticPage name="workflows" styles={["/assets/workflows.css"]} scripts={["/assets/workflows.js"]}/>}
