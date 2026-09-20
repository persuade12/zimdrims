'use client'

import Image from 'next/image'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const COPY = {
  eyebrow: 'In partnership with',
  title: 'Centre for Humanitarian Analytics',
  body: 'Decision-ready maps, risk intelligence and anticipatory insight for ZIM-DRIMS — built with CHA.',
  cta: 'Analytics by CHA',
}

type ChaPromoProps = {
  className?: string
  /** banner = full content ad; strip = slim mid-page; card = compact sidebar-friendly */
  variant?: 'banner' | 'strip' | 'card'
}

export function ChaPromo({ className, variant = 'banner' }: ChaPromoProps) {
  if (variant === 'strip') {
    return (
      <aside
        className={cn(
          'relative overflow-hidden rounded-xl border border-[#1e3a5f]/40 bg-gradient-to-r from-[#071018] via-[#0c1e33] to-[#0a4a5c]',
          className,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 90% 50%, #22d3ee55, transparent 40%), linear-gradient(120deg, transparent 40%, #22d3ee11 100%)',
          }}
        />
        <div className="relative flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <LogoChip />
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#67e8f9]/80">{COPY.eyebrow}</p>
              <p className="truncate font-display text-sm font-bold text-white">{COPY.title}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-[#22d3ee]/35 bg-[#22d3ee]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#a5f3fc]">
            <Sparkles className="size-3" />
            {COPY.cta}
          </span>
        </div>
      </aside>
    )
  }

  if (variant === 'card') {
    return (
      <aside
        className={cn(
          'relative overflow-hidden rounded-2xl border border-[#1e3a5f]/50 bg-[#071018] p-4 text-white shadow-lg',
          className,
        )}
      >
        <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-[#22d3ee]/20 blur-2xl" />
        <div className="relative space-y-3">
          <LogoChip large />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#67e8f9]/80">{COPY.eyebrow}</p>
            <p className="mt-1 font-display text-base font-extrabold leading-snug">{COPY.title}</p>
            <p className="mt-2 text-[12px] leading-relaxed text-white/70">{COPY.body}</p>
          </div>
          <p className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#67e8f9]">
            {COPY.cta}
            <ArrowUpRight className="size-3.5" />
          </p>
        </div>
      </aside>
    )
  }

  return (
    <aside
      className={cn(
        'relative overflow-hidden rounded-2xl border border-[#1e3a5f]/45 text-white shadow-md',
        className,
      )}
      style={{
        background:
          'linear-gradient(135deg, #050d14 0%, #0c1e33 45%, #0a3d4a 78%, #083344 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 0% 100%, #22d3ee22, transparent 45%), radial-gradient(ellipse at 100% 0%, #38bdf822, transparent 40%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/3 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, transparent, transparent 10px, #22d3ee22 10px, #22d3ee22 11px)',
        }}
      />

      <div className="relative grid gap-4 p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6 sm:p-5">
        <LogoChip large />
        <div className="min-w-0">
          <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-[#22d3ee]/30 bg-[#22d3ee]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#a5f3fc]">
            <Sparkles className="size-3" />
            {COPY.eyebrow}
          </div>
          <h2 className="font-display text-lg font-extrabold tracking-tight sm:text-xl">{COPY.title}</h2>
          <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-white/75">{COPY.body}</p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <span className="rounded-lg bg-[#22d3ee] px-3 py-2 text-[11px] font-extrabold uppercase tracking-wide text-[#042f2e]">
            CHA
          </span>
          <p className="text-[10px] font-medium text-white/55">Humanitarian Analytics</p>
        </div>
      </div>
    </aside>
  )
}

function LogoChip({ large }: { large?: boolean }) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_0_0_1px_rgba(34,211,238,0.25)]',
        large ? 'p-2.5' : 'p-1.5',
      )}
    >
      <Image
        src="/cha.png"
        alt="Centre for Humanitarian Analytics"
        width={140}
        height={48}
        className={cn('w-auto object-contain', large ? 'h-10 sm:h-11' : 'h-8')}
      />
    </div>
  )
}

export { ChaAccreditation } from '@/components/dare/cha-accreditation'
