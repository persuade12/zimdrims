import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ---------------- Panel ---------------- */
export function Panel({
  title,
  icon: Icon,
  action,
  children,
  className,
  bodyClassName,
}: {
  title?: string
  icon?: LucideIcon
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
  bodyClassName?: string
}) {
  return (
    <section className={cn('flex flex-col rounded-xl border border-border bg-card', className)}>
      {title ? (
        <header className="flex items-center justify-between gap-2 border-b border-border px-4 py-2.5">
          <div className="flex items-center gap-2">
            {Icon ? <Icon className="size-4 text-primary" /> : null}
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-foreground">{title}</h3>
          </div>
          {action}
        </header>
      ) : null}
      <div className={cn('flex-1 p-4', bodyClassName)}>{children}</div>
    </section>
  )
}

/* ---------------- Progress row ---------------- */
export function ProgressRow({
  label,
  value,
  pct,
  color = 'var(--primary)',
  valueClassName,
}: {
  label: string
  value?: string
  pct: number
  color?: string
  valueClassName?: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 truncate text-[12px] text-muted-foreground sm:w-28">{label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className={cn('min-w-[2.5rem] shrink-0 text-right text-[12px] font-semibold tabular-nums text-foreground', valueClassName)}>
        {value ?? `${pct}%`}
      </span>
    </div>
  )
}

/* ---------------- Stat tile ---------------- */
export function StatTile({
  icon: Icon,
  value,
  label,
  sub,
  color = 'var(--primary)',
  className,
}: {
  icon?: LucideIcon
  value: string
  label: string
  sub?: string
  color?: string
  className?: string
}) {
  return (
    <div className={cn('min-w-0 rounded-xl border border-border bg-card p-3 sm:p-3.5', className)}>
      <div className="flex items-start gap-2.5 sm:gap-3">
        {Icon ? (
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-lg sm:size-9"
            style={{ backgroundColor: `color-mix(in oklab, ${color} 15%, transparent)`, color }}
          >
            <Icon className="size-4 sm:size-[18px]" />
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-extrabold tabular-nums leading-tight text-foreground sm:text-lg lg:text-xl">
            {value}
          </p>
          <p className="mt-1 line-clamp-2 text-[11px] font-medium leading-snug text-muted-foreground">{label}</p>
          {sub ? <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-primary">{sub}</p> : null}
        </div>
      </div>
    </div>
  )
}

/* ---------------- Legend dot ---------------- */
export function LegendItem({
  color,
  label,
  value,
}: {
  color: string
  label: string
  value?: string
}) {
  return (
    <div className="flex items-center gap-2 text-[12px]">
      <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
      <span className="flex-1 text-muted-foreground">{label}</span>
      {value ? <span className="font-semibold text-foreground">{value}</span> : null}
    </div>
  )
}

/* ---------------- Status chip ---------------- */
const toneMap: Record<string, { bg: string; fg: string }> = {
  green: { bg: 'color-mix(in oklab, var(--primary) 15%, transparent)', fg: 'var(--primary)' },
  gold: { bg: 'color-mix(in oklab, var(--gold) 20%, transparent)', fg: 'var(--gold-foreground)' },
  danger: { bg: 'color-mix(in oklab, var(--danger) 18%, transparent)', fg: 'var(--danger)' },
  info: { bg: 'color-mix(in oklab, var(--info) 15%, transparent)', fg: 'var(--info)' },
  muted: { bg: 'var(--muted)', fg: 'var(--muted-foreground)' },
}

export function Chip({
  children,
  tone = 'muted',
  className,
}: {
  children: React.ReactNode
  tone?: keyof typeof toneMap
  className?: string
}) {
  const t = toneMap[tone]
  return (
    <span
      className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold', className)}
      style={{ backgroundColor: t.bg, color: t.fg }}
    >
      {children}
    </span>
  )
}

/* ---------------- Gauge (semi-circle) ---------------- */
export function Gauge({
  value,
  max = 100,
  label,
  size = 150,
  color = 'var(--primary)',
}: {
  value: number
  max?: number
  label?: string
  size?: number
  color?: string
}) {
  const thickness = 12
  const r = (size - thickness) / 2
  const cx = size / 2
  const cy = size / 2
  const circumference = Math.PI * r
  const pct = Math.min(value / max, 1)
  return (
    <div className="relative inline-flex flex-col items-center" style={{ width: size, height: size / 2 + 24 }}>
      <svg width={size} height={size / 2 + 8}>
        <path
          d={`M ${thickness / 2} ${cy} A ${r} ${r} 0 0 1 ${size - thickness / 2} ${cy}`}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={thickness}
          strokeLinecap="round"
        />
        <path
          d={`M ${thickness / 2} ${cy} A ${r} ${r} 0 0 1 ${size - thickness / 2} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={`${pct * circumference} ${circumference}`}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center leading-tight">
        <span className="font-display text-2xl font-extrabold text-foreground">
          {value}
          {max === 100 ? '' : `/${max}`}
        </span>
        {label ? <span className="text-[11px] text-muted-foreground">{label}</span> : null}
      </div>
    </div>
  )
}
