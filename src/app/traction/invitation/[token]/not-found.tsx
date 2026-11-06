import Link from 'next/link';
import '../../offering.css';

export default function InvitationNotFound() {
  return <article id="traction" data-offering="">
    <header>
      <p>Traction</p>
      <h1>This invitation link couldn’t be opened.</h1>
      <p data-lead="">You can still try Traction on your app, or reply to Yann’s email for help with your invitation.</p>
      <div data-start=""><Link href="/traction" data-primary="">Explore Traction →</Link></div>
    </header>
  </article>;
}
