import type { Metadata } from 'next';
import { websiteOpenGraph } from '@/lib/share-metadata';
import { Footer } from '@/components/Footer';

const description = 'This site runs without cookies. Page views are counted per page load with PostHog, hosted in the EU. No session is recorded.';

export const metadata: Metadata = {title:'Privacy',description,alternates:{canonical:'/privacy'},openGraph:{...websiteOpenGraph,title:'Privacy',description,url:'https://orchestra.hyperdrift.io/privacy'}};

/** Each sentence states a flow verified in this app's code: PostHog init, session storage, the contact relay and its records. */
export default function PrivacyPage(){return <><article id="privacy" aria-labelledby="privacy-title">
  <h1 id="privacy-title">Privacy</h1>
  <p>This site runs without cookies. Page views are counted per page load with PostHog, hosted in the EU. No session is recorded.</p>
  <p>While your tab is open, the site holds a random token and remembers which campaign link or Hyperdrift page brought you, so the pages you read count as one visit and an enquiry can say where it came from. Both live in session storage and go when the tab closes; nothing links one visit to the next.</p>
  <p>A personal invitation we email you carries a reference with no name in it. Your visit, and starting Traction from that page, are counted against it so we can tell whether the invitation helped you.</p>
  <p>A link from your Traction board to this site carries your app’s name on Traction and nothing else, so we know which board is asking. It travels with that visit and with a message you send from it.</p>
  <p>If you write to us, your name, email and message reach Yann’s mailbox so we can answer. A copy of your enquiry stays on our server so we can follow it up, and a record that a message arrived is kept with the other site events.</p>
  <p>Hyperdrift Limited, company 16638188, 4 Rope Street, London SE16 7TE, is the controller. Write to <a href="mailto:privacy@hyperdrift.io">privacy@hyperdrift.io</a> about your data.</p>
  <p>Found a security problem? Write to <a href="mailto:security@hyperdrift.io">security@hyperdrift.io</a>. The details researchers expect are at <a href="/.well-known/security.txt">/.well-known/security.txt</a>.</p>
</article><Footer/></>;}
