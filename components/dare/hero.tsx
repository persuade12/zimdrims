'use client'

import Link from 'next/link'
import { Bell, Download, RefreshCw } from 'lucide-react'
import { hazardFilters } from '@/lib/zimdrims-data'
import { useLocale } from '@/components/dare/locale-provider'
import { cn } from '@/lib/utils'

export function Hero() {
  const { t } = useLocale()

  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-[11px] font-medium text-muted-foreground">{t.hero.breadcrumb}</p>
          <h1 className="mt-1 font-display text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl">
            {t.hero.title}
          </h1>
          <div className="mt-3 flex flex-wrap gap-2">
            {hazardFilters.map((filter, i) => (
              <button
                key={filter}
                type="button"
                className={cn(
                  'rounded-full px-3 py-1 text-[11px] font-semibold transition-colors',
                  i === 0
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border bg-background text-muted-foreground hover:bg-secondary',
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
            <span>25 Aug 2026 · 15:48 CAT</span>
            <span className="hidden sm:inline">·</span>
            <span>{t.hero.dataSources}</span>
            <span className="hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-1">
              <RefreshCw className="size-3" />
              {t.hero.lastUpdate}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/early-warning/all-hazards"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95"
            >
              <Bell className="size-4" />
              {t.hero.createAlert}
            </Link>
            <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary">
              <Download className="size-4" />
              {t.hero.exportReport}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
