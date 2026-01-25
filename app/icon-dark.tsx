import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 32,
  height: 32,
}
 
export const contentType = 'image/png'
 
// Dark mode icon
export default function IconDark() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#1c1c1c',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#e0e0e0',
          fontWeight: 'bold',
          borderRadius: '20%',
          border: '2px solid #7fa6c9',
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
