'use client'

import { CheckCircle2, ArrowRight } from 'lucide-react'
import { platformHealth } from '@/lib/dare-data'
import { Donut } from './donut'
import { useLocale } from '@/components/dare/locale-provider'

export function PlatformHealth() {
  const { t } = useLocale()
  const { uptime, items } = platformHealth
  return (
    <section className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{t.home.platformHealth}</h2>

      <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-center">
        <Donut
          size={104}
          thickness={11}
          segments={[
            { value: uptime, color: 'var(--primary)' },
            { value: 100 - uptime, color: 'var(--border)' },
          ]}
        >
          <span className="font-display text-xl font-extrabold tabular-nums text-foreground">{uptime}%</span>
          <span className="text-[9px] text-muted-foreground">System Uptime</span>
        </Donut>

        <ul className="w-full flex-1 space-y-2 sm:w-auto">
          {items.map((it) => (
            <li key={it} className="flex items-center gap-2 text-[12px] text-foreground">
              <CheckCircle2 className="size-4 shrink-0 text-primary" />
              {it}
            </li>
          ))}
        </ul>
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-accent">
        {t.home.platformHealth}
        <ArrowRight className="size-4" />
      </button>
    </section>
  )
}
