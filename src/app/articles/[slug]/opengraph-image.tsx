import { ImageResponse } from 'next/og';
import { visibleArticles } from '@/lib/article-catalogue';
import { apertureImage } from '@/lib/share-brand';

export const alt = 'The AI-native organisation — an idea from Hyperdrift';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const entry = visibleArticles().find((item) => item.slug === slug);
  if (!entry) return new Response('Not found', { status: 404 });
  const logo = await apertureImage();
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: 55, background: '#181510', color: '#f6eee1' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 18, color: '#e3a857', letterSpacing: 2 }}><div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><img src={logo} width={48} height={48} alt="" /><span>THE AI-NATIVE ORGANISATION</span></div><span>0{entry.order} / HYPERDRIFT</span></div>
      <div style={{ display: 'flex', fontSize: 55, lineHeight: 1.08, marginTop: 40, maxWidth: 1000 }}>{entry.shareLine}</div>
      <div style={{ display: 'flex', gap: 24, marginTop: 'auto', marginBottom: 36 }}>{entry.steps.map((step, index) => <div key={step} style={{ display: 'flex', flexDirection: 'column', width: 250, borderTop: '1px solid #a4753e', paddingTop: 18, fontSize: 23 }}><span style={{ fontSize: 15, color: '#e3a857', marginBottom: 12 }}>0{index + 1}</span><span>{step}</span></div>)}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #584633', paddingTop: 18, fontSize: 16, color: '#dcc5a8' }}><span>{entry.example} · {entry.exampleStatus}</span><span>ai.hyperdrift.io/articles</span></div>
    </div>, size,
  );
}
