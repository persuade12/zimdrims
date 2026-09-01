'use client'

import { useState } from 'react'
import { AppShell } from '@/components/dare/app-shell'
import { LocaleProvider } from '@/components/dare/locale-provider'

export function ZimdrimsShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  return (
    <LocaleProvider>
      <AppShell mobileNavOpen={mobileNavOpen} onMobileNavOpenChange={setMobileNavOpen}>
        {children}
      </AppShell>
    </LocaleProvider>
  )
}
