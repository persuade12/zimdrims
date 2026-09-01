'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { navGroups } from '@/lib/dare-data'
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

        <div className="mt-4 rounded-xl bg-sidebar-accent p-4">
          <div className="mb-3 flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt=""
              width={40}
              height={40}
              className="size-10 rounded-lg bg-white/10 object-contain p-1"
            />
            <div className="leading-tight">
              <p className="text-sm font-bold text-sidebar-accent-foreground">{t.shell.mobileApp}</p>
              <p className="text-[10px] text-sidebar-foreground/70">{t.shell.mobileTagline}</p>
            </div>
          </div>
          <div className="space-y-2">
            <StoreBadge store="Google Play" sub={t.shell.getItOn} />
            <StoreBadge store="App Store" sub={t.shell.downloadOn} />
          </div>
        </div>
      </nav>
    </aside>
  )
}

function StoreBadge({ store, sub }: { store: string; sub: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-black/30 px-3 py-2">
      <div className="size-5 rounded bg-white/80" />
      <div className="leading-none">
        <p className="text-[8px] uppercase text-sidebar-foreground/60">{sub}</p>
        <p className="text-xs font-semibold text-sidebar-accent-foreground">{store}</p>
      </div>
    </div>
  )
}
