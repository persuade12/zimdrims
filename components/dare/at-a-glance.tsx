'use client'

import { alertSummary } from '@/lib/zimdrims-data'
import { useLocale } from '@/components/dare/locale-provider'
import { cn } from '@/lib/utils'

const toneStyles = {
  critical: 'border-danger/30 bg-danger/5 text-danger',
  warning: 'border-[#ea580c]/30 bg-[#ea580c]/5 text-[#ea580c]',
  watch: 'border-gold/30 bg-gold/5 text-gold',
  advisory: 'border-info/30 bg-info/5 text-info',
  clear: 'border-primary/30 bg-primary/5 text-primary',
  total: 'border-border bg-secondary text-foreground',
}

const labelKeys = {
  Critical: 'critical',
  Warning: 'warning',
  Watch: 'watch',
  Advisory: 'advisory',
  'All Clear': 'allClear',
} as const

export function AtAGlance() {
  const { t } = useLocale()

  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-display text-lg font-bold text-foreground">{t.home.alertSummary}</h2>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-primary">
          <span className="size-2 rounded-full bg-primary" />
          {t.common.liveSystem}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {alertSummary.map((item) => (
          <div
            key={item.label}
            className={cn('rounded-xl border p-3 text-center', toneStyles[item.tone])}
          >
            <p className="text-[10px] font-bold uppercase tracking-wide opacity-80">
              {labelKeys[item.label as keyof typeof labelKeys]
                ? t.common[labelKeys[item.label as keyof typeof labelKeys] as keyof typeof t.common]
                : item.label}
            </p>
            <p className="mt-1 font-display text-2xl font-black tabular-nums">{item.value}</p>
            <p className="mt-1 text-[9px] opacity-75">{item.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
