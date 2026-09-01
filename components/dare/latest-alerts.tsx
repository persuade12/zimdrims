'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { activeEarlyWarnings } from '@/lib/zimdrims-data'
import { useLocale } from '@/components/dare/locale-provider'
import { cn } from '@/lib/utils'

const levelTone = {
  Critical: 'bg-danger/15 text-danger',
  Warning: 'bg-[#ea580c]/15 text-[#ea580c]',
  Watch: 'bg-gold/15 text-gold',
  Advisory: 'bg-info/15 text-info',
}

export function LatestAlerts() {
  const { t } = useLocale()

  return (
    <section className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{t.home.activeWarnings}</h2>

      <ul className="mt-3 flex-1 divide-y divide-border">
        {activeEarlyWarnings.map((warning) => (
          <li key={warning.title} className="flex items-start gap-3 py-3">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${warning.color}1a`, color: warning.color }}
            >
              <warning.icon className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold leading-snug text-foreground">{warning.title}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{warning.location}</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-bold', levelTone[warning.level])}>
                  {warning.level}
                </span>
                <span className="text-[10px] text-muted-foreground">{warning.impact}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Link
        href="/early-warning/all-hazards"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary py-2 text-[13px] font-semibold text-primary transition-colors hover:bg-accent"
      >
        {t.home.viewAll}
        <ArrowRight className="size-3.5" />
      </Link>
    </section>
  )
}
