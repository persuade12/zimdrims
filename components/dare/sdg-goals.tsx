'use client'

import { ArrowRight } from 'lucide-react'
import { sdgGoals } from '@/lib/dare-data'
import { useLocale } from '@/components/dare/locale-provider'

export function SdgGoals() {
  const { t } = useLocale()

  return (
    <section className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{t.home.sdgGoals}</h2>

      <div className="mt-3 grid grid-cols-5 gap-2">
        {sdgGoals.map((g) => (
          <div
            key={g.title}
            className="flex aspect-square flex-col justify-between rounded-lg p-2 text-white"
            style={{ backgroundColor: g.color }}
          >
            <span className="font-display text-lg font-black leading-none">{g.n}</span>
            <span className="text-[8px] font-bold uppercase leading-tight">{g.title}</span>
          </div>
        ))}
      </div>

      <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary py-2 text-[13px] font-semibold text-primary transition-colors hover:bg-accent">
        {t.home.sdgGoals}
        <ArrowRight className="size-3.5" />
      </button>
    </section>
  )
}
