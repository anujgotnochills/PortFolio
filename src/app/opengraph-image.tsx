import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Anuj - video editor and visual storyteller. Video editing, motion graphics and color grading.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default async function OpenGraphImage() {
  const portrait = await readFile(join(process.cwd(), 'public', 'portrait-suit-cutout.png'));
  const portraitSrc = `data:image/png;base64,${portrait.toString('base64')}`;

  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#f4f3eb', color: '#242820', padding: '48px 60px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: 720, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', fontSize: 22, letterSpacing: 3, color: '#eb3327' }}>INDEPENDENT VIDEO EDITOR</div>
        <div style={{ display: 'flex', fontSize: 142, fontWeight: 700, letterSpacing: -8, marginTop: 40, lineHeight: 1 }}>HELLO.</div>
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, marginTop: 10 }}>I&apos;m Anuj.</div>
        <div style={{ display: 'flex', fontSize: 29, marginTop: 26, maxWidth: 590, lineHeight: 1.4 }}>Turning raw clips into stories you feel.</div>
        <div style={{ display: 'flex', fontSize: 20, marginTop: 'auto', color: '#55594e' }}>VIDEO EDITING / MOTION GRAPHICS / COLOR GRADING</div>
      </div>
      <div style={{ display: 'flex', position: 'absolute', width: 440, height: 440, right: -40, top: 115, borderRadius: '50%', background: '#eb3327' }} />
      {/* The existing portrait is embedded so rendering needs no remote image fetch. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={portraitSrc} alt="" width={400} height={580} style={{ position: 'absolute', right: 22, bottom: -4, objectFit: 'contain' }} />
    </div>,
    size,
  );
}
