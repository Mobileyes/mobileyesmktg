import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Mobileyes — Live Streaming Talent Agency'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          background: '#0B0F2E',
          fontFamily: 'system-ui',
        }}
      >
        {/* MBIcon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: '#1A0008',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #EF4444, #B91C1C)',
              }}
            />
          </div>
          <span
            style={{
              color: 'white',
              fontSize: '28px',
              fontWeight: 800,
              letterSpacing: '0.03em',
            }}
          >
            MOBILEYES
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <span style={{ color: 'white', fontSize: '64px', fontWeight: 800, lineHeight: 1 }}>
            Represent.
          </span>
          <span style={{ color: '#3B82F6', fontSize: '64px', fontWeight: 800, lineHeight: 1 }}>
            Perform.
          </span>
          <span style={{ color: 'white', fontSize: '64px', fontWeight: 800, lineHeight: 1 }}>
            Get paid.
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '24px',
            marginTop: '32px',
            maxWidth: '600px',
          }}
        >
          Live streaming talent agency · Sydney, Australia · AU & APAC
        </p>

        {/* URL */}
        <p
          style={{
            color: 'rgba(255,255,255,0.3)',
            fontSize: '16px',
            position: 'absolute',
            bottom: '40px',
            right: '80px',
          }}
        >
          mobileyes.live
        </p>
      </div>
    ),
    { ...size }
  )
}
