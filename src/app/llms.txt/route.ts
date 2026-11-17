import {archiveOrigin} from '@/site/archive';
import {allArticles} from '@/site/catalogue';
export const revalidate=60;
export function GET(){return new Response(`# Hyperdrift

> Hyperdrift helps founders build, operate and grow their apps. Traction provides an AI growth team; founders approve consequential work. HD OS connects the engineering and operating work.

## Start here

- [Traction](https://hyperdrift.io/traction): a seven-day trial with a website review, one customer search and email drafts.
- [How it works](https://hyperdrift.io/traction/how-it-works): research, context, market evidence, delivery and measurement.
- [Partnership](https://hyperdrift.io/traction/partnership): agree the scope and work with Hyperdrift.
- [HD OS](https://hyperdrift.io/os): how operating capabilities connect around an app.
- [Custom AI workflows](https://hyperdrift.io/workflows): useful work with people in control.
- [About](https://hyperdrift.io/about)
- [Work](https://hyperdrift.io/work)
- [Contact](https://hyperdrift.io/contact)
- [Projects & writing](${archiveOrigin}): earlier projects and articles.
- [Blog](https://hyperdrift.io/articles) · [RSS](https://hyperdrift.io/articles/feed.xml) · [JSON Feed](https://hyperdrift.io/feed.json)

## Published articles

${allArticles().map(a=>`- [${a.title}](https://hyperdrift.io${a.href}): ${a.excerpt}`).join('\n')}
`,{headers:{'Content-Type':'text/plain; charset=utf-8'}})}
