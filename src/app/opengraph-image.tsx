import { ImageResponse } from 'next/og';
import { meshLogoImage, shareFonts } from '@/lib/share-brand';
import { brandShareImage } from '@/lib/share-metadata';

export const alt = brandShareImage.alt;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default async function Image() {
  const [logo, fonts] = await Promise.all([meshLogoImage(), shareFonts()]);
  // ImageResponse requires styles in its image document; the website keeps its CSS cascade.
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '64px 76px 48px', background: '#13110b', color: '#eee5d6', fontFamily: 'Plex' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', fontFamily: 'Cormorant', fontWeight: 500, fontSize: 47 }}>Orchestra AI</div>
        <div style={{ display: 'flex', marginTop: 7, fontSize: 14, letterSpacing: 4, color: '#c8beae' }}>BY HYPERDRIFT</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 72, fontFamily: 'Cormorant', fontWeight: 500, fontSize: 72, lineHeight: 1.1 }}>
        <div style={{ display: 'flex' }}>Grow your business.</div>
        <div style={{ display: 'flex', marginTop: 4, fontSize: 68, fontStyle: 'italic', color: '#e6b46c' }}>Keep more of the upside.</div>
      </div>
      <img src={logo} width={290} height={290} alt="" style={{ position: 'absolute', right: 64, top: 145 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 24, borderTop: '1px solid #5e4a2c', fontSize: 20, color: '#c8beae' }}>
        <span>AI engineering for founders with momentum.</span>
        <span style={{ color: '#e6b46c' }}>ai.hyperdrift.io</span>
      </div>
    </div>, { ...size, fonts },
  );
}
