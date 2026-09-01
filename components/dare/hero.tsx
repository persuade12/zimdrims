'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Play, ArrowRight } from 'lucide-react'
import { journeySteps } from '@/lib/dare-data'
import { useLocale } from '@/components/dare/locale-provider'

export function Hero() {
  const { t, label } = useLocale()

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border">
      <Image
        src="/images/hero-landscape.png"
        alt="Rural Zimbabwean village landscape with traditional thatched huts"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />

      <div className="relative flex min-h-[340px] flex-col justify-center gap-5 p-6 sm:p-8 lg:p-10">
        <div className="max-w-lg">
          <h1 className="font-display text-4xl font-black leading-[1.05] text-white sm:text-5xl">
            {t.hero.line1}
            <br />
            {t.hero.line2}
            <br />
            {t.hero.line3}
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/85">{t.hero.body}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/platform-overview"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-colors hover:opacity-95"
            >
              {t.hero.explore}
              <ArrowRight className="size-4" />
            </Link>
            <button className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
              <Play className="size-4 fill-white" />
              {t.hero.watchDemo}
            </button>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-1 gap-y-3">
          {journeySteps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-1">
              <div className="flex flex-col items-center gap-1">
                <div
                  className="flex size-11 items-center justify-center rounded-full border-2 border-white/70 bg-white shadow-md"
                  style={{ color: step.color }}
                >
                  <step.icon className="size-5" />
                </div>
                <span className="text-[11px] font-semibold text-white">{label(step.label, 'journey')}</span>
              </div>
              {i < journeySteps.length - 1 ? (
                <span className="mb-4 h-px w-6 border-t-2 border-dashed border-white/50" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
