'use client'

import { useEffect } from 'react'
import { Sidebar } from '@/components/dare/sidebar'
import { TopBar } from '@/components/dare/top-bar'
import { SiteFooter } from '@/components/dare/site-footer'
import { useLocale } from '@/components/dare/locale-provider'
import { cn } from '@/lib/utils'

export function AppShell({
  children,
  mobileNavOpen,
  onMobileNavOpenChange,
}: {
  children: React.ReactNode
  mobileNavOpen: boolean
  onMobileNavOpenChange: (open: boolean) => void
}) {
  const { t } = useLocale()

  useEffect(() => {
    if (!mobileNavOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onMobileNavOpenChange(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [mobileNavOpen, onMobileNavOpenChange])

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden',
          mobileNavOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!mobileNavOpen}
      >
        <button
          type="button"
          className={cn(
            'absolute inset-0 bg-black/50 transition-opacity',
            mobileNavOpen ? 'opacity-100' : 'opacity-0',
          )}
          aria-label={t.shell.closeNav}
          onClick={() => onMobileNavOpenChange(false)}
        />
        <div
          className={cn(
            'absolute inset-y-0 left-0 flex w-[min(20rem,88vw)] transform transition-transform duration-200',
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <Sidebar onNavigate={() => onMobileNavOpenChange(false)} className="flex h-full w-full" />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar onMenuClick={() => onMobileNavOpenChange(true)} />
        <main className="flex-1 space-y-5 p-3 sm:p-4 lg:p-6">{children}</main>
        <div className="px-3 pb-2 sm:px-4 sm:pb-3 lg:px-6 lg:pb-4">
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
