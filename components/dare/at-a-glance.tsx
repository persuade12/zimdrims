'use client'

import { ChevronDown } from 'lucide-react'
import { atAGlance } from '@/lib/dare-data'
import { useLocale } from '@/components/dare/locale-provider'

const stats = [...atAGlance.row1, ...atAGlance.row2]

const labelMap: Record<string, 'villages' | 'provinces' | 'districts' | 'traditionalLeaders' | 'households' | 'population' | 'activeProjects' | 'hazardAlerts'> = {
  Villages: 'villages',
  Provinces: 'provinces',
  Districts: 'districts',
  'Traditional Leaders': 'traditionalLeaders',
  Households: 'households',
  Population: 'population',
  'Active Projects': 'activeProjects',
  'Hazard Alerts': 'hazardAlerts',
}

export function AtAGlance() {
  const { t } = useLocale()

  return (
    <section className="@container flex flex-col rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-lg font-bold text-foreground">{t.home.atAGlance}</h2>
        <button className="flex w-fit items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground">
          Data Year: 2025
          <ChevronDown className="size-3.5" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5 border-b border-border pb-5 @[32rem]:grid-cols-4 @[32rem]:gap-x-3 @[32rem]:gap-y-4">
        {stats.map((s) => (
          <Stat
            key={s.label}
            value={s.value}
            label={labelMap[s.label] ? t.common[labelMap[s.label]] : s.label}
          />
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2 rounded-xl bg-secondary px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <div className="text-[11px] leading-snug text-muted-foreground">
          Last Updated:{' '}
          <span className="font-medium text-foreground">23 May 2025 · 10:18 AM</span>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-primary">
          <span className="size-2 rounded-full bg-primary" />
          {t.common.liveSystem}
        </span>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-0 flex-col items-center justify-center px-1 py-1 text-center">
      <p className="font-display text-xl font-extrabold leading-none tabular-nums tracking-tight text-primary @[32rem]:text-2xl">
        {value}
      </p>
      <p className="mt-1.5 text-[10px] leading-snug text-muted-foreground sm:text-[11px]">{label}</p>
    </div>
  )
}
