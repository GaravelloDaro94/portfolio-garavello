import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 32,
  height: 32,
}
 
export const contentType = 'image/png'
 
// Light mode icon
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: 'linear-gradient(135deg, #a7c7e7, #b8e0d2)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1f2937',
          fontWeight: 'bold',
          borderRadius: '20%',
          border: '2px solid #1f2937',
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
