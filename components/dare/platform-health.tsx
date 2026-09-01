'use client'

import { Donut } from '@/components/dare/donut'
import { alertStatistics } from '@/lib/zimdrims-data'
import { useLocale } from '@/components/dare/locale-provider'

export function PlatformHealth() {
  const { t } = useLocale()

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{t.home.alertStatistics}</h2>
      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Donut
          size={120}
          thickness={14}
          segments={alertStatistics.map((s) => ({ value: s.pct, color: s.color }))}
        >
          <span className="font-display text-xl font-black">14</span>
        </Donut>
        <ul className="space-y-2">
          {alertStatistics.map((s) => (
            <li key={s.label} className="flex items-center gap-2 text-[12px]">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="font-medium text-foreground">{s.label}</span>
              <span className="text-muted-foreground">{s.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
