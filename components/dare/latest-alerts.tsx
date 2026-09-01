'use client'

import { CloudRain, Droplets, Sprout, HeartPulse, Route, ArrowRight } from 'lucide-react'
import { alerts, type Alert } from '@/lib/dare-data'
import { useLocale } from '@/components/dare/locale-provider'

const kindMeta: Record<Alert['kind'], { icon: typeof CloudRain; color: string }> = {
  flood: { icon: CloudRain, color: '#d64545' },
  drought: { icon: Droplets, color: '#ea580c' },
  crop: { icon: Sprout, color: '#16a34a' },
  nutrition: { icon: HeartPulse, color: '#2563eb' },
  road: { icon: Route, color: '#7c3aed' },
}

export function LatestAlerts() {
  const { t } = useLocale()

  return (
    <section className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{t.home.latestAlerts}</h2>

      <ul className="mt-3 divide-y divide-border">
        {alerts.map((a) => {
          const meta = kindMeta[a.kind]
          return (
            <li key={a.title} className="flex items-center gap-3 py-2.5">
              <div
                className="flex size-8 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${meta.color}1a`, color: meta.color }}
              >
                <meta.icon className="size-4" />
              </div>
              <p className="flex-1 text-[12px] leading-snug text-foreground">
                {a.title}
                {a.severity === 'high' ? (
                  <span className="ml-1 rounded bg-danger/15 px-1.5 py-0.5 text-[10px] font-bold text-danger">High</span>
                ) : null}
              </p>
              <span className="shrink-0 text-[10px] text-muted-foreground">{a.time}</span>
            </li>
          )
        })}
      </ul>

      <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary py-2 text-[13px] font-semibold text-primary transition-colors hover:bg-accent">
        {t.shell.viewAllAlerts}
        <ArrowRight className="size-3.5" />
      </button>
    </section>
  )
}
