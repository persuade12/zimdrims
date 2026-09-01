'use client'

import { ArrowRight } from 'lucide-react'
import { zimlacServices } from '@/lib/dare-data'
import { Donut } from './donut'
import { useLocale } from '@/components/dare/locale-provider'

export function ZimlacServiceDelivery() {
  const { t } = useLocale()
  const { overall, items } = zimlacServices
  return (
    <section className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{t.home.zimlac}</h2>
      <p className="text-[10px] text-muted-foreground">(Latest)</p>

      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Donut
          size={84}
          thickness={10}
          segments={items.map((it, i) => ({
            value: it.pct,
            color: ['#16794a', '#2563eb', '#e6a70a', '#7c3aed', '#d64545'][i],
          }))}
        >
          <span className="font-display text-base font-extrabold tabular-nums text-foreground">{overall}%</span>
          <span className="text-[8px] text-muted-foreground">Overall</span>
        </Donut>

        <ul className="w-full flex-1 space-y-2 sm:w-auto">
          {items.map((it) => (
            <li key={it.label} className="flex min-w-0 items-center gap-2">
              <span className="w-20 shrink-0 truncate text-[10px] text-muted-foreground sm:w-24">{it.label}</span>
              <span className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
                <span className="block h-full rounded-full bg-primary" style={{ width: `${it.pct}%` }} />
              </span>
              <span className="w-8 shrink-0 text-right text-[10px] font-semibold tabular-nums text-foreground">
                {it.pct}%
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary py-2 text-[13px] font-semibold text-primary transition-colors hover:bg-accent">
        {t.home.zimlac}
        <ArrowRight className="size-3.5" />
      </button>
    </section>
  )
}

