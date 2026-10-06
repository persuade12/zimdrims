'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { opsModules, resolveOpsModule } from '@/lib/zimdrims-data'
import { useLocale } from '@/components/dare/locale-provider'
import { cn } from '@/lib/utils'

export function ModuleTopNav() {
  const pathname = usePathname()
  const { label } = useLocale()
  const active = resolveOpsModule(pathname)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [active.id])

  return (
    <nav
      aria-label="Modules"
      className="relative border-t border-white/[0.06] bg-gradient-to-b from-[#0d1512] to-[#0a100e]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#0a100e] to-transparent sm:w-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#0a100e] to-transparent sm:w-10"
      />

      <div
        ref={scrollerRef}
        className="flex gap-1 overflow-x-auto px-3 py-2.5 sm:gap-1.5 sm:px-5 lg:px-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {opsModules.map((mod) => {
          const isActive = mod.id === active.id
          return (
            <Link
              key={mod.id}
              ref={isActive ? activeRef : undefined}
              href={mod.href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'group relative inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-[11px] font-semibold tracking-wide transition-all duration-200 sm:px-3.5 sm:text-[12px]',
                isActive
                  ? 'bg-[#16794a] text-white shadow-[0_0_0_1px_rgba(22,121,74,0.45),0_8px_20px_-10px_rgba(22,121,74,0.85)]'
                  : 'text-white/55 hover:bg-white/[0.07] hover:text-white',
              )}
            >
              <span
                className={cn(
                  'flex size-6 items-center justify-center rounded-full transition-colors',
                  isActive ? 'bg-white/15' : 'bg-white/[0.04] group-hover:bg-white/10',
                )}
              >
                <mod.icon
                  className={cn(
                    'size-3.5 transition-transform duration-200',
                    isActive ? 'scale-105' : 'opacity-80 group-hover:opacity-100',
                  )}
                />
              </span>
              <span className="whitespace-nowrap">{label(mod.label)}</span>
              {isActive ? (
                <span
                  aria-hidden
                  className="absolute -bottom-px left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[#e6a70a]"
                />
              ) : null}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
