'use client'

import { ArrowRight } from 'lucide-react'
import { zimvacIndicators } from '@/lib/dare-data'
import { Donut } from './donut'
import { useLocale } from '@/components/dare/locale-provider'

export function ZimvacIndicators() {
  const { t } = useLocale()
  const fcs = zimvacIndicators[0]
  return (
    <section className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{t.home.zimvac}</h2>
      <p className="text-[10px] text-muted-foreground">(Latest)</p>

      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Donut
          size={84}
          thickness={10}
          segments={[
            { value: fcs.pct, color: 'var(--gold)' },
            { value: 100 - fcs.pct, color: 'var(--border)' },
          ]}
        >
          <span className="font-display text-base font-extrabold tabular-nums text-foreground">{fcs.value}</span>
          <span className="text-[8px] text-muted-foreground">{fcs.code}</span>
        </Donut>

        <div className="grid w-full flex-1 grid-cols-2 gap-x-3 gap-y-3 sm:gap-y-2">
          {zimvacIndicators.map((z) => (
            <div key={z.code} className="min-w-0 leading-tight">
              <p className="text-[10px] font-semibold text-muted-foreground">{z.code}</p>
              <p className="font-display text-base font-bold tabular-nums text-foreground">{z.value}</p>
              <p className="text-[9px] text-muted-foreground">{z.status}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary py-2 text-[13px] font-semibold text-primary transition-colors hover:bg-accent">
        {t.home.zimvac}
        <ArrowRight className="size-3.5" />
      </button>
    </section>
  )
}

