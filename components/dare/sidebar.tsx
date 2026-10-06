'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { resolveOpsModule } from '@/lib/zimdrims-data'
import { useLocale } from '@/components/dare/locale-provider'
import { ChaAccreditation } from '@/components/dare/cha-accreditation'
import { cn } from '@/lib/utils'

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  if (href === '/ops') return pathname === '/ops' || pathname === '/ops/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Sidebar({
  onNavigate,
  className,
}: {
  onNavigate?: () => void
  className?: string
}) {
  const pathname = usePathname()
  const { label, t } = useLocale()
  const activeModule = resolveOpsModule(pathname)

  return (
    <aside
      className={cn(
        'flex h-screen w-64 shrink-0 flex-col overflow-y-auto bg-sidebar text-sidebar-foreground lg:sticky lg:top-0',
        className,
      )}
    >
      <div className="relative overflow-hidden border-b border-sidebar-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(31,157,95,0.22),transparent_55%)]"
        />
        <div className="relative flex items-center gap-3 px-4 py-3.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary/20 text-sidebar-primary ring-1 ring-sidebar-primary/30">
            <activeModule.icon className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/45">
              {label('Module')}
            </p>
            <p className="truncate text-[13px] font-semibold leading-tight text-sidebar-accent-foreground">
              {label(activeModule.label)}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-0.5">
          {activeModule.children.map((item) => {
            const parentActive = isActive(pathname, item.href)
            const childActive = item.children?.some((c) => isActive(pathname, c.href))
            const expanded = parentActive || childActive
            return (
              <li key={`${item.href}-${item.label}`}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-150',
                    parentActive && !childActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-[0_8px_18px_-12px_rgba(31,157,95,0.9)]'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  )}
                >
                  <item.icon className="size-[18px] shrink-0" />
                  <span className="flex-1 truncate">{label(item.label)}</span>
                  {item.children ? (
                    <ChevronDown
                      className={cn('size-4 opacity-70 transition-transform', expanded && 'rotate-180')}
                    />
                  ) : null}
                </Link>
                {item.children && expanded ? (
                  <ul className="ml-4 mt-0.5 space-y-0.5 border-l border-sidebar-border pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={onNavigate}
                          className={cn(
                            'flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-[12px] transition-colors',
                            isActive(pathname, child.href)
                              ? 'bg-sidebar-primary/90 text-sidebar-primary-foreground'
                              : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                          )}
                        >
                          <child.icon className="size-4 shrink-0" />
                          <span className="truncate">{label(child.label)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="mt-auto border-t border-sidebar-border p-4">
        <p className="text-[10px] font-bold text-sidebar-accent-foreground">ZIM-DRIMS</p>
        <p className="text-[9px] text-sidebar-foreground/60">{t.shell.version}</p>
        <div className="mt-3 border-t border-sidebar-border/80 pt-3">
          <ChaAccreditation variant="compact" onDark className="scale-95 origin-left" />
        </div>
      </div>
    </aside>
  )
}
