import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Darío Garavello'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #a7c7e7, #b8e0d2, #f7c8e0)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: 20,
          }}
        >
          Darío Garavello
        </div>
        <div
          style={{
            fontSize: 48,
            color: '#4b5563',
          }}
        >
          Developer
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#6b7280',
            marginTop: 30,
            display: 'flex',
            gap: '20px',
          }}
        >
          React • Next.js • TypeScript • Node.js
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
