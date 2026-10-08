import { ImageResponse } from 'next/og'

export const alt = 'K Line Academy — Digital Aligner Planning Bootcamp'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0B132B',
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(6,176,174,0.25), transparent 45%), radial-gradient(circle at 85% 85%, rgba(6,176,174,0.15), transparent 40%)',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: '#ffffff',
              color: '#0B132B',
              fontSize: 30,
              fontWeight: 800,
              padding: '10px 18px',
              borderRadius: 12,
              letterSpacing: '-0.5px',
            }}
          >
            K LINE
          </div>
          <div
            style={{
              display: 'flex',
              color: '#ffffff',
              fontSize: 30,
              fontWeight: 600,
              marginLeft: 20,
            }}
          >
            Academy
          </div>
          <div style={{ display: 'flex', color: '#06B0AE', fontSize: 30, fontWeight: 700 }}>.</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              color: '#ffffff',
              fontSize: 82,
              fontWeight: 800,
              letterSpacing: '-2px',
              lineHeight: 1.05,
            }}
          >
            Master Digital
          </div>
          <div
            style={{
              display: 'flex',
              color: '#3DD4D2',
              fontSize: 82,
              fontWeight: 800,
              letterSpacing: '-2px',
              lineHeight: 1.05,
            }}
          >
            Aligner Planning
          </div>
          <div
            style={{
              display: 'flex',
              color: '#cbd5e1',
              fontSize: 40,
              fontWeight: 600,
              marginTop: 18,
            }}
          >
            in 4 Weekends — Cairo, Egypt
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '2px solid rgba(6,176,174,0.35)',
            paddingTop: 28,
          }}
        >
          <div style={{ display: 'flex', color: '#94a3b8', fontSize: 28 }}>
            Batch 3 · Applications Open · Fri &amp; Sat
          </div>
          <div style={{ display: 'flex', color: '#06B0AE', fontSize: 28, fontWeight: 700 }}>
            OnyxCeph &amp; Titan
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
