'use client'

import { riverLevels } from '@/lib/zimdrims-data'
import { useLocale } from '@/components/dare/locale-provider'
import { cn } from '@/lib/utils'

const toneStyles = {
  danger: 'bg-danger/15 text-danger',
  gold: 'bg-gold/15 text-gold',
  green: 'bg-primary/15 text-primary',
}

export function GovernanceDashboard() {
  const { t } = useLocale()

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{t.home.riverLevels}</h2>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[320px] text-left text-[12px]">
          <thead>
            <tr className="border-b border-border text-[10px] uppercase tracking-wide text-muted-foreground">
              <th className="pb-2 pr-3 font-semibold">Station</th>
              <th className="pb-2 pr-3 font-semibold">River</th>
              <th className="pb-2 pr-3 font-semibold">Current</th>
              <th className="pb-2 pr-3 font-semibold">Danger</th>
              <th className="pb-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {riverLevels.map((row) => (
              <tr key={row.station} className="border-b border-border/60 last:border-0">
                <td className="py-2.5 pr-3 font-medium text-foreground">{row.station}</td>
                <td className="py-2.5 pr-3 text-muted-foreground">{row.river}</td>
                <td className="py-2.5 pr-3 tabular-nums">{row.current}</td>
                <td className="py-2.5 pr-3 tabular-nums text-muted-foreground">{row.danger}</td>
                <td className="py-2.5">
                  <span className={cn('rounded px-2 py-0.5 text-[10px] font-bold', toneStyles[row.tone])}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
