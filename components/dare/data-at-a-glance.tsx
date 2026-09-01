'use client'

import { TrendingUp } from 'lucide-react'
import { dataAtAGlance } from '@/lib/dare-data'
import { useLocale } from '@/components/dare/locale-provider'

export function DataAtAGlance() {
  const { t } = useLocale()

  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">
        {t.home.dataAtAGlance} – Zimbabwe
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,9.5rem),1fr))] gap-4">
        {dataAtAGlance.map((d) => (
          <div key={d.label} className="flex min-w-0 flex-col items-start gap-1.5">
            <div
              className="flex size-9 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${d.color}1a`, color: d.color }}
            >
              <d.icon className="size-[18px]" />
            </div>
            <p className="font-display text-lg font-extrabold tabular-nums leading-tight text-foreground sm:text-xl">
              {d.value}
            </p>
            <p className="line-clamp-2 text-[11px] font-medium leading-snug text-muted-foreground">{d.label}</p>
            <p className="flex items-center gap-1 text-[10px] font-semibold text-primary">
              <TrendingUp className="size-3 shrink-0" />
              <span className="line-clamp-1">{d.change}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
