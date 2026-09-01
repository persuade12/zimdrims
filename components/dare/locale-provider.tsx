'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  dictionaries,
  formatMessage,
  localeLabels,
  type Dictionary,
  type Locale,
} from '@/lib/i18n/dictionaries'

const STORAGE_KEY = 'dare-inkundla-locale'

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dictionary
  format: (template: string, vars: Record<string, string | number>) => string
  label: (key: string, group?: 'nav' | 'navGroups' | 'journey') => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null
    if (saved && saved in dictionaries) setLocaleState(saved)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    window.localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale === 'en' ? 'en' : locale
  }, [locale, ready])

  const value = useMemo<LocaleContextValue>(() => {
    const t = dictionaries[locale]
    return {
      locale,
      setLocale: setLocaleState,
      t,
      format: formatMessage,
      label: (key, group = 'nav') => {
        if (group === 'navGroups') return t.navGroups[key] ?? key
        if (group === 'journey') return t.journey[key] ?? key
        return t.nav[key] ?? key
      },
    }
  }, [locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}

export { localeLabels }
