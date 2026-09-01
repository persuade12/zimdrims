'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  X,
  UserRound,
  Settings,
  HelpCircle,
  LogOut,
  ShieldCheck,
} from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { LanguageSwitcher } from './language-switcher'
import { useLocale } from '@/components/dare/locale-provider'
import { cn } from '@/lib/utils'

const notifications = [
  { title: 'Flood Warning — Save River at Chinhoyi', time: '2h ago', tone: 'danger' as const },
  { title: 'Severe thunderstorm watch — Mutare District', time: '4h ago', tone: 'gold' as const },
  { title: 'Drought watch — Matabeleland North', time: 'Today', tone: 'gold' as const },
  { title: 'River levels rising — Masvingo', time: 'Today', tone: 'green' as const },
]

export function TopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { t, format } = useLocale()
  const [searchOpen, setSearchOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [alertsOpen, setAlertsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const alertsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      const target = e.target as Node
      if (searchRef.current && !searchRef.current.contains(target)) setSearchOpen(false)
      if (profileRef.current && !profileRef.current.contains(target)) setProfileOpen(false)
      if (alertsRef.current && !alertsRef.current.contains(target)) setAlertsOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      setSearchOpen(false)
      setProfileOpen(false)
      setAlertsOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-[#0a0f0d] text-white">
      <div className="flex items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 lg:px-6">
        <button
          type="button"
          className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
          aria-label={t.shell.openNav}
          onClick={onMenuClick}
        >
          <Menu className="size-5" />
        </button>

        <div className={cn('flex min-w-0 items-center gap-2 sm:gap-3', searchOpen && 'hidden sm:flex')}>
          <Image
            src="/logo.svg"
            alt="Republic of Zimbabwe emblem"
            width={44}
            height={44}
            className="size-8 shrink-0 object-contain sm:size-11"
          />
          <div className="min-w-0 leading-tight">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-white/70 sm:text-[10px]">
              {t.brand.government}
            </p>
            <p className="text-[10px] font-medium text-white/85 sm:text-[11px]">{t.brand.department}</p>
          </div>
        </div>

        <div className={cn('hidden min-w-0 flex-1 items-center justify-center md:flex', searchOpen && 'md:hidden')}>
          <div className="font-display text-xl font-black tracking-tight sm:text-2xl">
            <span className="text-white">ZIM-</span>
            <span className="text-[#d64545]">D</span>
            <span className="text-[#e6a70a]">R</span>
            <span className="text-white">I</span>
            <span className="text-[#16794a]">M</span>
            <span className="text-[#16794a]">S</span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
          <div className="mr-1 hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 lg:flex">
            <span className="size-2 animate-pulse rounded-full bg-primary" />
            <span className="text-[11px] font-semibold">{t.shell.eocStatus}</span>
            <span className="text-[10px] font-bold text-primary">{t.shell.operational}</span>
          </div>

          <div ref={searchRef} className="relative flex items-center">
            <div
              className={cn(
                'flex items-center overflow-hidden rounded-full border transition-all duration-200',
                searchOpen
                  ? 'w-[min(calc(100vw-7rem),22rem)] border-white/20 bg-white/10 sm:w-72 md:w-80'
                  : 'w-9 border-transparent bg-transparent',
              )}
            >
              <button
                type="button"
                aria-label={searchOpen ? t.shell.search : t.shell.openSearch}
                aria-expanded={searchOpen}
                className="flex size-9 shrink-0 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
                onClick={() => {
                  setSearchOpen((open) => !open)
                  setProfileOpen(false)
                  setAlertsOpen(false)
                }}
              >
                <Search className="size-[18px]" />
              </button>
              <input
                ref={searchInputRef}
                className={cn(
                  'h-9 min-w-0 flex-1 bg-transparent pr-2 text-sm text-white placeholder:text-white/50 focus:outline-none',
                  searchOpen ? 'opacity-100' : 'pointer-events-none w-0 opacity-0',
                )}
                placeholder={t.shell.searchPlaceholder}
              />
              {searchOpen ? (
                <button
                  type="button"
                  aria-label={t.shell.closeSearch}
                  className="mr-1 flex size-7 shrink-0 items-center justify-center rounded-full text-white/70 hover:bg-white/10"
                  onClick={() => setSearchOpen(false)}
                >
                  <X className="size-3.5" />
                </button>
              ) : null}
            </div>
          </div>

          <LanguageSwitcher />
          <ThemeToggle />

          <div ref={alertsRef} className="relative">
            <button
              type="button"
              aria-label={t.shell.notifications}
              aria-expanded={alertsOpen}
              className="relative rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white"
              onClick={() => {
                setAlertsOpen((open) => !open)
                setProfileOpen(false)
                setSearchOpen(false)
              }}
            >
              <Bell className="size-[18px]" />
              <span
                className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
                style={{ backgroundColor: 'var(--danger)' }}
              >
                {notifications.length}
              </span>
            </button>
            {alertsOpen ? (
              <div className="absolute right-0 z-40 mt-2 w-[min(calc(100vw-1.5rem),20rem)] overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg">
                <div className="flex items-center justify-between border-b border-border px-3 py-2">
                  <p className="text-[11px] font-bold uppercase tracking-wide">{t.shell.notifications}</p>
                  <span className="text-[10px] text-muted-foreground">
                    {format(t.shell.newCount, { count: notifications.length })}
                  </span>
                </div>
                <ul className="max-h-72 overflow-y-auto p-1.5">
                  {notifications.map((n) => (
                    <li key={n.title}>
                      <button
                        type="button"
                        className="flex w-full items-start gap-2 rounded-lg px-2.5 py-2 text-left hover:bg-secondary"
                      >
                        <span
                          className="mt-1 size-2 shrink-0 rounded-full"
                          style={{
                            backgroundColor:
                              n.tone === 'danger'
                                ? 'var(--danger)'
                                : n.tone === 'gold'
                                  ? 'var(--gold)'
                                  : 'var(--primary)',
                          }}
                        />
                        <span>
                          <span className="block text-[13px] leading-snug">{n.title}</span>
                          <span className="text-[10px] text-muted-foreground">{n.time}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/early-warning/all-hazards"
                  className="block border-t border-border px-3 py-2 text-center text-[12px] font-semibold text-primary hover:bg-secondary"
                  onClick={() => setAlertsOpen(false)}
                >
                  {t.shell.viewAllAlerts}
                </Link>
              </div>
            ) : null}
          </div>

          <div ref={profileRef} className="relative">
            <button
              type="button"
              aria-expanded={profileOpen}
              aria-label={t.shell.openProfile}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1 pl-1 pr-1.5 hover:bg-white/10 sm:pr-2"
              onClick={() => {
                setProfileOpen((open) => !open)
                setAlertsOpen(false)
                setSearchOpen(false)
              }}
            >
              <Image
                src="/images/administrator.png"
                alt={t.shell.administrator}
                width={36}
                height={36}
                className="size-8 rounded-full object-cover sm:size-9"
              />
              <div className="hidden min-w-0 text-left leading-tight sm:block">
                <p className="truncate text-[12px] font-semibold">Wonder Mufunda</p>
                <p className="truncate text-[10px] text-white/70">{t.shell.administrator}</p>
              </div>
              <ChevronDown
                className={cn('size-4 text-white/70 transition-transform', profileOpen && 'rotate-180')}
              />
            </button>
            {profileOpen ? (
              <div className="absolute right-0 z-40 mt-2 w-[min(calc(100vw-1.5rem),18rem)] overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg">
                <div className="border-b border-border p-3">
                  <div className="flex items-start gap-3">
                    <Image
                      src="/images/administrator.png"
                      alt=""
                      width={48}
                      height={48}
                      className="size-12 rounded-full object-cover"
                    />
                    <div className="min-w-0 leading-tight">
                      <p className="truncate text-sm font-semibold">Wonder Mufunda</p>
                      <p className="mt-0.5 text-[12px] text-muted-foreground">{t.shell.administrator}</p>
                      <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-primary">
                        <span className="size-1.5 rounded-full bg-primary" />
                        {t.shell.online}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 flex items-center gap-1.5 rounded-lg bg-secondary px-2 py-1.5 text-[11px] text-secondary-foreground">
                    <ShieldCheck className="size-3.5" />
                    {t.shell.verifiedOfficial}
                  </p>
                </div>
                <nav className="p-1.5">
                  <ProfileItem href="/system-administration" icon={UserRound} onClick={() => setProfileOpen(false)}>
                    {t.shell.viewProfile}
                  </ProfileItem>
                  <ProfileItem href="/system-administration" icon={Settings} onClick={() => setProfileOpen(false)}>
                    {t.shell.accountSettings}
                  </ProfileItem>
                  <ProfileItem href="/reports" icon={HelpCircle} onClick={() => setProfileOpen(false)}>
                    {t.shell.helpSupport}
                  </ProfileItem>
                </nav>
                <div className="border-t border-border p-1.5">
                  <button
                    type="button"
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-danger hover:bg-secondary"
                  >
                    <LogOut className="size-4" />
                    {t.shell.signOut}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-3 py-1.5 md:hidden">
        <div className="font-display text-lg font-black tracking-tight">
          <span className="text-white">ZIM-</span>
          <span className="text-[#d64545]">D</span>
          <span className="text-[#e6a70a]">R</span>
          <span className="text-white">I</span>
          <span className="text-[#16794a]">M</span>
          <span className="text-[#16794a]">S</span>
        </div>
      </div>
    </header>
  )
}

function ProfileItem({
  href,
  icon: Icon,
  children,
  onClick,
}: {
  href: string
  icon: typeof UserRound
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm hover:bg-secondary"
    >
      <Icon className="size-4 text-muted-foreground" />
      {children}
    </Link>
  )
}
