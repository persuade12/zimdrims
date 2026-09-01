'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { navGroups } from '@/lib/zimdrims-data'
import { useLocale } from '@/components/dare/locale-provider'
import { cn } from '@/lib/utils'

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
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

  return (
    <aside
      className={cn(
        'flex h-screen w-64 shrink-0 flex-col overflow-y-auto bg-sidebar text-sidebar-foreground lg:sticky lg:top-0',
        className,
      )}
    >
      <nav className="flex-1 px-3 py-4">
        {navGroups.map((group, gi) => (
          <div key={gi} className="mb-4">
            {group.title ? (
              <p className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-wider text-sidebar-foreground/50">
                {label(group.title, 'navGroups')}
              </p>
            ) : null}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const parentActive = isActive(pathname, item.href)
                const childActive = item.children?.some((c) => isActive(pathname, c.href))
                const expanded = parentActive || childActive
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        'flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors',
                        parentActive && !childActive
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                      )}
                    >
                      <item.icon className="size-[18px] shrink-0" />
                      <span className="flex-1 truncate">{label(item.label)}</span>
                      {item.children ? (
                        <ChevronDown className={cn('size-4 opacity-70 transition-transform', expanded && 'rotate-180')} />
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
                                'flex items-center gap-2.5 rounded-md px-3 py-1.5 text-[12px] transition-colors',
                                isActive(pathname, child.href)
                                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
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
          </div>
        ))}
      </nav>

      <div className="mt-auto border-t border-sidebar-border p-4">
        <div className="mb-3 flex h-2 overflow-hidden rounded-full">
          <span className="flex-1 bg-[#16794a]" />
          <span className="flex-1 bg-[#e6a70a]" />
          <span className="flex-1 bg-[#d64545]" />
          <span className="flex-1 bg-black" />
          <span className="w-3 bg-white" />
        </div>
        <p className="text-[10px] font-bold text-sidebar-accent-foreground">ZIM-DRIMS</p>
        <p className="text-[9px] text-sidebar-foreground/60">{t.shell.version}</p>
      </div>
    </aside>
  )
}
