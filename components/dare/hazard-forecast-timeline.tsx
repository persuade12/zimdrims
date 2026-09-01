'use client'

import { hazardForecastTimeline, timelineLabels } from '@/lib/zimdrims-data'
import { useLocale } from '@/components/dare/locale-provider'
import { cn } from '@/lib/utils'

const segmentStyles = {
  critical: 'bg-danger',
  warning: 'bg-[#ea580c]',
  watch: 'bg-gold',
  advisory: 'bg-info',
  clear: 'bg-primary/40',
}

export function HazardForecastTimeline() {
  const { t } = useLocale()

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{t.home.forecastTimeline}</h2>

      <div className="mt-4 overflow-x-auto">
        <div className="min-w-[480px]">
          <div className="mb-2 grid grid-cols-[120px_repeat(6,1fr)] gap-1 text-center text-[10px] text-muted-foreground">
            <span />
            {timelineLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          {hazardForecastTimeline.map((row) => (
            <div key={row.hazard} className="mb-2 grid grid-cols-[120px_repeat(6,1fr)] items-center gap-1">
              <span className="text-[12px] font-semibold text-foreground">{row.hazard}</span>
              {row.segments.map((segment, i) => (
                <div
                  key={`${row.hazard}-${i}`}
                  className={cn('h-6 rounded', segmentStyles[segment as keyof typeof segmentStyles])}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
