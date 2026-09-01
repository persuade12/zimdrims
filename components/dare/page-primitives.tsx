import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Chip, StatTile } from '@/components/dare/ui'

export type KpiItem = {
  value: string
  label: string
  sub?: string
  icon?: LucideIcon
  color?: string
}

export function PageHeader({
  title,
  subtitle,
  meta,
  actions,
}: {
  title: string
  subtitle?: string
  meta?: string
  actions?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="font-display text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h1>
        {subtitle ? <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {meta ? <span className="text-[11px] text-muted-foreground">{meta}</span> : null}
        {actions}
      </div>
    </div>
  )
}

export function KpiRow({ items, className }: { items: KpiItem[]; className?: string }) {
  return (
    <div
      className={cn(
        'grid grid-cols-[repeat(auto-fill,minmax(min(100%,11rem),1fr))] gap-3',
        className,
      )}
    >
      {items.map((item) => (
        <StatTile
          key={item.label}
          icon={item.icon}
          value={item.value}
          label={item.label}
          sub={item.sub}
          color={item.color}
        />
      ))}
    </div>
  )
}

export type FilterField = {
  id: string
  label: string
  type?: 'text' | 'select'
  options?: string[]
  placeholder?: string
}

export function FilterBar({
  fields,
  actionLabel = 'Search',
}: {
  fields: FilterField[]
  actionLabel?: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {fields.map((field) => (
            <label key={field.id} className="block min-w-0">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                {field.label}
              </span>
              {field.type === 'select' ? (
                <select
                  className="h-9 w-full rounded-lg border border-border bg-background px-2.5 text-sm text-foreground"
                  defaultValue=""
                >
                  <option value="">{field.placeholder ?? 'All'}</option>
                  {(field.options ?? []).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  placeholder={field.placeholder ?? field.label}
                  className="h-9 w-full rounded-lg border border-border bg-background px-2.5 text-sm text-foreground placeholder:text-muted-foreground"
                />
              )}
            </label>
          ))}
        </div>
        <button
          type="button"
          className="h-9 shrink-0 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  )
}

export function GeoFilterBar({
  defaults,
}: {
  defaults?: {
    province?: string
    district?: string
    chief?: string
    headmanship?: string
    village?: string
  }
}) {
  const fields = [
    { label: 'Province', value: defaults?.province ?? 'Manicaland' },
    { label: 'District', value: defaults?.district ?? 'Makoni' },
    { label: 'Chief', value: defaults?.chief ?? 'Makoni' },
    { label: 'Headmanship', value: defaults?.headmanship ?? 'Chimwewe' },
    { label: 'Village', value: defaults?.village ?? 'Chitora' },
  ]
  return (
    <div className="flex flex-wrap gap-2 rounded-xl border border-border bg-card p-3">
      {fields.map((f) => (
        <div
          key={f.label}
          className="flex min-w-[140px] flex-1 flex-col rounded-lg border border-border bg-background px-2.5 py-1.5"
        >
          <span className="text-[9px] font-bold uppercase tracking-wide text-muted-foreground">{f.label}</span>
          <span className="truncate text-sm font-semibold text-foreground">{f.value}</span>
        </div>
      ))}
    </div>
  )
}

export type TableColumn = {
  key: string
  label: string
  className?: string
}

export type TableCell =
  | string
  | number
  | {
      type: 'badge'
      label: string
      tone?: 'green' | 'gold' | 'danger' | 'info' | 'muted'
    }
  | {
      type: 'link'
      label: string
      href: string
    }
  | {
      type: 'progress'
      pct: number
    }

export function SimpleTable({
  columns,
  rows,
  caption,
}: {
  columns: TableColumn[]
  rows: Record<string, TableCell>[]
  caption?: string
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      {caption ? (
        <div className="border-b border-border px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-foreground">
          {caption}
        </div>
      ) : null}
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'px-3 py-2.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground',
                  col.className,
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30">
              {columns.map((col) => (
                <td key={col.key} className={cn('px-3 py-2.5 text-[13px] text-foreground', col.className)}>
                  <Cell value={row[col.key]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Cell({ value }: { value: TableCell | undefined }) {
  if (value == null) return <span className="text-muted-foreground">—</span>
  if (typeof value === 'string' || typeof value === 'number') return <>{value}</>
  if (value.type === 'badge') return <Chip tone={value.tone}>{value.label}</Chip>
  if (value.type === 'link') {
    return (
      <Link href={value.href} className="font-semibold text-primary hover:underline">
        {value.label}
      </Link>
    )
  }
  if (value.type === 'progress') {
    return (
      <div className="flex min-w-[100px] items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary" style={{ width: `${value.pct}%` }} />
        </div>
        <span className="w-8 shrink-0 text-right text-[11px] font-semibold tabular-nums">{value.pct}%</span>
      </div>
    )
  }
  return null
}

export function InsightList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-lg border border-border bg-background px-3 py-2 text-[12px] leading-snug text-foreground"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
