'use client'

import Link from 'next/link'
import { quickActions } from '@/lib/zimdrims-data'
import { useLocale } from '@/components/dare/locale-provider'

export function QuickAccess() {
  const { t } = useLocale()

  return (
    <section>
      <h2 className="mb-3 font-display text-lg font-bold text-foreground">{t.home.quickActions}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {quickActions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center shadow-sm transition-colors hover:bg-secondary"
          >
            <div
              className="flex size-11 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: action.color }}
            >
              <action.icon className="size-5" />
            </div>
            <span className="text-[11px] font-semibold leading-snug text-foreground">{action.label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
