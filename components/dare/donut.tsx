type Segment = { value: number; color: string }

export function Donut({
  segments,
  size = 120,
  thickness = 14,
  children,
  track = 'var(--muted)',
}: {
  segments: Segment[]
  size?: number
  thickness?: number
  children?: React.ReactNode
  track?: string
}) {
  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius
  const total = segments.reduce((a, s) => a + s.value, 0) || 1
  let offset = 0

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={track} strokeWidth={thickness} />
        {segments.map((s, i) => {
          const len = (s.value / total) * circumference
          const dash = `${len} ${circumference - len}`
          const el = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeDasharray={dash}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          )
          offset += len
          return el
        })}
      </svg>
      {children ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-tight">
          {children}
        </div>
      ) : null}
    </div>
  )
}
