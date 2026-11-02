import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const source = (path: string) => readFile(new URL(path, import.meta.url), 'utf8');

describe('legal contacts', () => {
  it('names the privacy contact on the privacy page and the company number in the footer', async () => {
    expect(await source('./page.tsx')).toContain('privacy@hyperdrift.io');
    expect(await source('../../components/Footer.tsx')).toContain('16638188');
  });
});
