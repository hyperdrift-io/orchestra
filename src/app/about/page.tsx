import { permanentRedirect } from 'next/navigation';

/** The about page was retired on 11 November 2026 (founder): it singled one person out and ran long. Links already out land on the home page. */
export default function AboutPage() { permanentRedirect('/'); }
