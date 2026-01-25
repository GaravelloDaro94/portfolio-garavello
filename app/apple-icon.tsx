import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 180,
  height: 180,
}
 
export const contentType = 'image/png'
 
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          background: 'linear-gradient(135deg, #a7c7e7, #b8e0d2)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1f2937',
          fontWeight: 'bold',
          borderRadius: '20%',
          border: '4px solid #1f2937',
        }}
      >
        DG
      </div>
    ),
    {
      ...size,
    }
  )
}
