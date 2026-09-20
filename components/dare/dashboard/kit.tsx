'use client'

import Link from 'next/link'
import { Download, FileDown, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FilterBar, type FilterField, KpiRow, type KpiItem, PageHeader } from '@/components/dare/page-primitives'
import { ChaPromo } from '@/components/dare/cha-promo'

const defaultFilters: FilterField[] = [
  {
    id: 'hazard',
    label: 'Hazard',
    type: 'select',
    options: ['Drought', 'Flood', 'Cyclone', 'Fire', 'Disease', 'All Hazards'],
    placeholder: 'All Hazards',
  },
  {
    id: 'province',
    label: 'Province',
    type: 'select',
    options: [
      'Harare',
      'Bulawayo',
      'Manicaland',
      'Mashonaland Central',
      'Mashonaland East',
      'Mashonaland West',
      'Masvingo',
      'Matabeleland North',
      'Matabeleland South',
      'Midlands',
    ],
    placeholder: 'All Provinces',
  },
  {
    id: 'district',
    label: 'District',
    type: 'select',
    options: ['Buhera', 'Chipinge', 'Chiredzi', 'Gutu', 'Hwange', 'Makoni', 'Mutare'],
    placeholder: 'All Districts',
  },
  {
    id: 'timeframe',
    label: 'Timeframe',
    type: 'select',
    options: ['Last 24 Hours', 'Last 7 Days', 'Next 3 Months', 'Current Response'],
    placeholder: 'Next 3 Months',
  },
]

export function DashboardChrome({
  title,
  subtitle,
  breadcrumbs,
  kpis,
  filters = defaultFilters,
  primaryAction = 'Generate Report',
  asOf = '25 Aug 2026 · 15:48 CAT',
  children,
}: {
  title: string
  subtitle: string
  breadcrumbs: { label: string; href?: string }[]
  kpis: KpiItem[]
  filters?: FilterField[]
  primaryAction?: string
  asOf?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <nav className="flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
          {breadcrumbs.map((crumb, i) => (
            <span key={`${crumb.label}-${i}`} className="inline-flex items-center gap-1.5">
              {i > 0 ? <span aria-hidden>/</span> : null}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-primary">
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-semibold text-foreground">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <PageHeader
          title={title}
          subtitle={subtitle}
          meta={asOf}
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground hover:bg-secondary"
              >
                <RefreshCw className="size-3.5" />
                Refresh
              </button>
              <button
                type="button"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground hover:bg-secondary"
              >
                <Download className="size-3.5" />
                Export
              </button>
              <button
                type="button"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                <FileDown className="size-3.5" />
                {primaryAction}
              </button>
            </div>
          }
        />
      </div>

      <FilterBar fields={filters} actionLabel="Apply" />
      <KpiRow items={kpis} />
      <ChaPromo variant="strip" />
      {children}
    </div>
  )
}

export function DonutChart({
  segments,
  centerValue,
  centerLabel,
  size = 140,
}: {
  segments: { label: string; value: number; color: string }[]
  centerValue?: string
  centerLabel?: string
  size?: number
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1
  let cursor = 0
  const stops = segments
    .map((s) => {
      const start = cursor
      const pct = (s.value / total) * 100
      cursor += pct
      return `${s.color} ${start}% ${cursor}%`
    })
    .join(', ')

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
      <div
        className="relative shrink-0 rounded-full"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(${stops})`,
        }}
      >
        <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full bg-card text-center">
          {centerValue ? (
            <span className="font-display text-lg font-extrabold tabular-nums text-foreground">{centerValue}</span>
          ) : null}
          {centerLabel ? <span className="text-[10px] text-muted-foreground">{centerLabel}</span> : null}
        </div>
      </div>
      <ul className="w-full space-y-1.5">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2 text-[11px]">
            <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="flex-1 text-muted-foreground">{s.label}</span>
            <span className="font-semibold tabular-nums text-foreground">
              {Math.round((s.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Pipeline({
  steps,
}: {
  steps: { label: string; count?: string | number; active?: boolean }[]
}) {
  return (
    <ol className="flex flex-col gap-2 lg:flex-row lg:flex-wrap">
      {steps.map((step, i) => (
        <li
          key={step.label}
          className={cn(
            'relative flex min-w-0 flex-1 items-center gap-2 rounded-lg border px-3 py-2',
            step.active
              ? 'border-primary bg-accent text-foreground'
              : 'border-border bg-secondary/40 text-muted-foreground',
          )}
        >
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-card text-[10px] font-bold text-primary">
            {i + 1}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold text-foreground">{step.label}</p>
            {step.count !== undefined ? (
              <p className="text-[10px] tabular-nums text-muted-foreground">{step.count}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}

export function MiniBars({
  items,
}: {
  items: { label: string; value: number; color?: string; suffix?: string }[]
}) {
  const max = Math.max(...items.map((i) => i.value), 1)
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item.label} className="space-y-1">
          <div className="flex items-center justify-between gap-2 text-[11px]">
            <span className="truncate text-muted-foreground">{item.label}</span>
            <span className="font-semibold tabular-nums text-foreground">
              {item.suffix ?? item.value}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full"
              style={{
                width: `${(item.value / max) * 100}%`,
                backgroundColor: item.color ?? 'var(--primary)',
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

export function QuickActions({
  actions,
}: {
  actions: { label: string; href?: string }[]
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {actions.map((action) =>
        action.href ? (
          <Link
            key={action.label}
            href={action.href}
            className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2.5 text-center text-[11px] font-semibold text-primary hover:bg-primary/15"
          >
            {action.label}
          </Link>
        ) : (
          <button
            key={action.label}
            type="button"
            className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2.5 text-[11px] font-semibold text-primary hover:bg-primary/15"
          >
            {action.label}
          </button>
        ),
      )}
    </div>
  )
}

export function DataTable({
  columns,
  rows,
}: {
  columns: string[]
  rows: (string | React.ReactNode)[][]
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[28rem] text-left text-[11px]">
        <thead>
          <tr className="border-b border-border text-[10px] uppercase tracking-wide text-muted-foreground">
            {columns.map((col) => (
              <th key={col} className="px-2 py-2 font-bold">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/70 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-2 py-2.5 align-middle text-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function FeedList({
  items,
}: {
  items: { title: string; meta: string; tone?: 'new' | 'info' | 'alert' }[]
}) {
  const toneClass = {
    new: 'bg-danger/15 text-danger',
    info: 'bg-info/15 text-info',
    alert: 'bg-gold/20 text-gold-foreground',
  }
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={`${item.title}-${item.meta}`} className="flex items-start gap-2 border-b border-border/60 pb-2.5 last:border-0 last:pb-0">
          {item.tone ? (
            <span className={cn('mt-0.5 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase', toneClass[item.tone])}>
              {item.tone}
            </span>
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-medium leading-snug text-foreground">{item.title}</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">{item.meta}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
