'use client'

import { ArrowRight } from 'lucide-react'
import { governanceStats } from '@/lib/dare-data'
import { useLocale } from '@/components/dare/locale-provider'

const labelMap: Record<string, 'villages' | 'provinces' | 'districts' | 'traditionalLeaders' | 'hazardAlerts' | 'activeProjects'> = {
  Villages: 'villages',
  Provinces: 'provinces',
  Districts: 'districts',
  'Traditional Leaders': 'traditionalLeaders',
  'Hazard Alerts': 'hazardAlerts',
  'Active Projects': 'activeProjects',
}

export function GovernanceDashboard() {
  const { t } = useLocale()

  return (
    <section className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-lg font-bold text-foreground">{t.home.governanceDashboard}</h2>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-primary">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          {t.common.liveSystem}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {governanceStats.map((s) => (
          <div
            key={s.label}
            className="flex min-w-0 items-center gap-3 rounded-xl border border-border bg-background p-3"
          >
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${s.color}1a`, color: s.color }}
            >
              <s.icon className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-base font-extrabold tabular-nums leading-tight text-foreground sm:text-lg">
                {s.value}
              </p>
              <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
                {labelMap[s.label] ? t.common[labelMap[s.label]] : s.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-accent">
        {t.home.viewFullGovernance}
        <ArrowRight className="size-4" />
      </button>
    </section>
  )
}
