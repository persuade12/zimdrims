'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Bell, Home, Map, BarChart3, Shield, FileText, AlertTriangle, BookOpen, LifeBuoy, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/dare/theme-toggle'

const publicNav = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Active Alerts', href: '/alerts', icon: Bell },
  { label: 'Risk Map', href: '/risk-map', icon: Map },
  { label: 'Current Situation', href: '/situation', icon: AlertTriangle },
  { label: 'Statistics', href: '/statistics', icon: BarChart3 },
  { label: 'Recovery & Resilience', href: '/recovery', icon: Shield },
  { label: 'Preparedness & Safety', href: '/preparedness', icon: LifeBuoy },
  { label: 'Public Reports', href: '/reports', icon: FileText },
  { label: 'Report an Incident', href: '/report-incident', icon: AlertTriangle },
  { label: 'Resources', href: '/resources', icon: BookOpen },
]

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-[#eef2f0] text-foreground dark:bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-[#0c2f1e] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="size-5" />
            </button>
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <Image src="/logo.svg" alt="Republic of Zimbabwe" width={36} height={36} className="size-9 shrink-0" />
              <div className="min-w-0 leading-tight">
                <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-white/70">
                  Department of Civil Protection
                </p>
                <p className="truncate font-display text-sm font-extrabold tracking-wide sm:text-base">
                  ZIM-DRIMS Public
                </p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/ops/login"
              className="hidden rounded-lg border border-white/20 px-3 py-1.5 text-[11px] font-semibold hover:bg-white/10 sm:inline-flex"
            >
              Staff Login
            </Link>
            <Link
              href="/report-incident"
              className="rounded-lg bg-[#16794a] px-3 py-1.5 text-[11px] font-bold text-white hover:opacity-90"
            >
              Report Incident
            </Link>
          </div>
        </div>
        <nav className="hidden border-t border-white/10 lg:block">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-1 gap-y-1 px-4 py-2 sm:px-6">
            {publicNav.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold',
                    active ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white',
                  )}
                >
                  <item.icon className="size-3.5 shrink-0" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/50" aria-label="Close menu" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-[min(20rem,88vw)] flex-col bg-[#0c2f1e] text-white shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="font-display text-sm font-bold">Public Menu</p>
              <button type="button" className="rounded-lg p-2 hover:bg-white/10" onClick={() => setOpen(false)}>
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-3">
              {publicNav.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium',
                      active ? 'bg-white/15' : 'hover:bg-white/10',
                    )}
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </Link>
                )
              })}
              <Link
                href="/ops/login"
                onClick={() => setOpen(false)}
                className="mt-3 block rounded-lg border border-white/20 px-3 py-2.5 text-sm"
              >
                Staff Login
              </Link>
            </nav>
          </aside>
        </div>
      ) : null}

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>

      <footer className="border-t border-border bg-[#0c2f1e] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-[11px] text-white/80 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>ZIM-DRIMS Public · Department of Civil Protection · Government of Zimbabwe</p>
          <p>Together for a Safer, More Resilient Zimbabwe · helpdesk@dcp.gov.zw · +263 242 700 000</p>
        </div>
      </footer>
    </div>
  )
}
