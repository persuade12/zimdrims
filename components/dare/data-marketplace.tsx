'use client'

import { Store, CheckCircle2, ArrowRight } from 'lucide-react'
import { useLocale } from '@/components/dare/locale-provider'

export function DataMarketplace() {
  const { t } = useLocale()

  return (
    <section className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{t.home.dataMarketplace}</h2>

      <div className="mt-3 flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
          <Store className="size-6" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">Trusted Zimbabwe Development Data</p>
        </div>
      </div>

      <ul className="mt-3 space-y-2">
        {['API & data services', 'Custom dashboards', 'Analytics & research'].map((s) => (
          <li key={s} className="flex items-center gap-2 text-[12px] text-foreground">
            <CheckCircle2 className="size-4 shrink-0 text-primary" />
            {s}
          </li>
        ))}
      </ul>

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-95">
        {t.home.exploreMarketplace}
        <ArrowRight className="size-4" />
      </button>
    </section>
  )
}
