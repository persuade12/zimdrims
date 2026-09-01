'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { quickModules } from '@/lib/dare-data'
import { useLocale } from '@/components/dare/locale-provider'

export function QuickAccess() {
  const { t } = useLocale()

  return (
    <section>
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
        {t.home.quickAccess}
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {quickModules.map((m) => {
          const local = t.quick[m.title]
          return (
            <Link
              key={m.title}
              href={m.href}
              className="group flex flex-col rounded-xl border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className="mb-2 flex size-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${m.color}1a`, color: m.color }}
              >
                <m.icon className="size-5" />
              </div>
              <p className="text-[12px] font-bold leading-tight text-foreground">{local?.title ?? m.title}</p>
              <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-muted-foreground">
                {local?.description ?? m.description}
              </p>
              <span className="mt-auto flex items-center gap-1 pt-2 text-[11px] font-semibold text-primary">
                {t.hero.explore}
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
