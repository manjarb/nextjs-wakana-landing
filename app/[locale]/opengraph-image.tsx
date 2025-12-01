import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';

export const alt = 'Wanaka Sanctuary';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  // Read the SVG logo file
  const logoPath = join(process.cwd(), 'public/images/logo/waka-logo.svg');
  const logoSrc = readFileSync(logoPath);
  const logoBase64 = `data:image/svg+xml;base64,${logoSrc.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: '#f7f2e8',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={logoBase64}
          alt="Wanaka Sanctuary Logo"
          width="415"
          height="237"
          style={{
            maxWidth: '80%',
            maxHeight: '80%',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
