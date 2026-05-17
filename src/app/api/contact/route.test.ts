import { describe, expect, it, vi, beforeEach } from 'vitest';

const sendMock = vi.fn();

vi.mock('@/lib/resend', () => ({
  getResendClient: () => ({ emails: { send: sendMock } }),
  getContactRoutes: () => ({ to: 'owner@example.com', from: 'contact@example.com' }),
}));

beforeEach(() => {
  sendMock.mockReset();
  sendMock.mockResolvedValue({ data: { id: 'eml_123' }, error: null });
});

async function callRoute(body: unknown) {
  const { POST } = await import('./route');
  const req = new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  return POST(req);
}

describe('POST /api/contact', () => {
  it('returns 200 and sends an email for a valid submission', async () => {
    const res = await callRoute({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'A reasonable length message about agents.',
    });
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledOnce();
    const call = sendMock.mock.calls[0]![0];
    expect(call.to).toBe('owner@example.com');
    expect(call.from).toBe('contact@example.com');
    expect(call.subject).toContain('Ada');
  });

  it('returns 400 for invalid submission', async () => {
    const res = await callRoute({ name: '', email: 'nope', message: 'x' });
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });
});
