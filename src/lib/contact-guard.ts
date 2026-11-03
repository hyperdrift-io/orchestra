import { isIP } from 'node:net';

// nginx appends the connection address to X-Forwarded-For and the app listens on loopback,
// so the last hop is the client. Anything before it is whatever the client claimed.
export function clientAddress(request: Request) {
  const value = request.headers.get('x-forwarded-for')?.split(',').at(-1)?.trim() || '';
  const address = value.startsWith('::ffff:') ? value.slice(7) : value;
  return isIP(address) ? address : 'unknown';
}

// Fixed-window admission counts in memory: nothing about the visitor is stored, and a restart resets them.
export function createRateGate({ windowMs, perClient, total, now = Date.now }: { windowMs: number; perClient: number; total: number; now?: () => number }) {
  let windowEnd = 0;
  let count = 0;
  const clients = new Map<string, number>();
  return (request: Request) => {
    const time = now();
    if (time >= windowEnd) {
      windowEnd = time + windowMs;
      count = 0;
      clients.clear();
    }
    const key = clientAddress(request);
    const used = clients.get(key) || 0;
    if (count >= total || used >= perClient) return false;
    count += 1;
    clients.set(key, used + 1);
    return true;
  };
}

/** RFC 2606 and 6761 names never receive mail, so a submission from one is a test or a scanner. */
export function reservedEmailDomain(email: string) {
  const domain = email.slice(email.lastIndexOf('@') + 1).toLowerCase().replace(/\.$/, '');
  return /(^|\.)example\.(com|org|net)$/.test(domain) || /(^|\.)(example|test|invalid|localhost)$/.test(domain);
}
