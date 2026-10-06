'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { opsModules, resolveOpsModule } from '@/lib/zimdrims-data'
import { useLocale } from '@/components/dare/locale-provider'
import { cn } from '@/lib/utils'

export function ModuleTopNav() {
  const pathname = usePathname()
  const { label } = useLocale()
  const active = resolveOpsModule(pathname)

  return (
    <nav
      aria-label="Modules"
      className="border-t border-white/10 bg-[#0a0f0d]"
    >
      <div className="flex gap-1 overflow-x-auto px-3 py-1.5 sm:px-4 lg:px-6 [scrollbar-width:thin]">
        {opsModules.map((mod) => {
          const isActive = mod.id === active.id
          return (
            <Link
              key={mod.id}
              href={mod.href}
              className={cn(
                'inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition-colors sm:text-[12px]',
                isActive
                  ? 'bg-white/15 text-white shadow-[inset_0_-2px_0_0_#d64545]'
                  : 'text-white/65 hover:bg-white/10 hover:text-white',
              )}
            >
              <mod.icon className="size-3.5 shrink-0 opacity-80" />
              <span className="whitespace-nowrap">{label(mod.label)}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
