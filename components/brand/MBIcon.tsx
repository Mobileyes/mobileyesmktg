/**
 * MBIcon — Mobileyes Recording Pulse Icon
 * 
 * Solid red radial core (NO white inside), red→orange concentric rings.
 * Container: #1A0008 (dark-red tinted, warm not cold)
 * 
 * Scale behaviour:
 * - 16px: solid red core only (favicon)
 * - 28px: inner ring appears
 * - 44px+: full three-layer mark
 */

export function MBIcon({ size = 44, className = '' }: { size?: number; className?: string }) {
  const showInnerRing = size >= 28
  const showOuterRing = size >= 44

  return (
    <div
      className={`relative flex items-center justify-center rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: '#1A0008',
      }}
    >
      {/* Outer ring — dashed, red/orange */}
      {showOuterRing && (
        <svg
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: '12s' }}
          width={size}
          height={size}
          viewBox="0 0 44 44"
        >
          <circle
            cx="22"
            cy="22"
            r="19"
            fill="none"
            stroke="#EF4444"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.5"
          />
        </svg>
      )}

      {/* Inner ring — solid, subtle */}
      {showInnerRing && (
        <svg
          className="absolute"
          width={size * 0.7}
          height={size * 0.7}
          viewBox="0 0 30 30"
        >
          <circle
            cx="15"
            cy="15"
            r="12"
            fill="none"
            stroke="#F97316"
            strokeWidth="1"
            opacity="0.4"
          />
        </svg>
      )}

      {/* Core — solid red radial gradient, NO white */}
      <div
        className="rounded-full"
        style={{
          width: size * 0.36,
          height: size * 0.36,
          background: 'radial-gradient(circle, #EF4444 0%, #DC2626 70%, #B91C1C 100%)',
          boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)',
        }}
      />
    </div>
  )
}

export function MobileyesLogo({ size = 26, className = '' }: { size?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <MBIcon size={size} />
      <span
        className="text-white font-extrabold tracking-[0.03em]"
        style={{ fontSize: size * 0.62, fontFamily: 'var(--font-space-grotesk), system-ui' }}
      >
        MOBILEYES
      </span>
    </div>
  )
}
