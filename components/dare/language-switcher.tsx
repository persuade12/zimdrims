'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Languages } from 'lucide-react'
import { locales, type Locale } from '@/lib/i18n/dictionaries'
import { localeLabels, useLocale } from '@/components/dare/locale-provider'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  function choose(next: Locale) {
    setLocale(next)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={t.shell.language}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2 py-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground sm:px-2.5"
        onClick={() => setOpen((v) => !v)}
      >
        <Languages className="size-4" />
        <span className="hidden text-[11px] font-bold uppercase tracking-wide sm:inline">
          {localeLabels[locale]}
        </span>
        <span className="text-[11px] font-bold uppercase sm:hidden">{locale.toUpperCase()}</span>
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label={t.shell.language}
          className="absolute right-0 z-40 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-popover shadow-lg"
        >
          <p className="border-b border-border px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
            {t.shell.language}
          </p>
          <ul className="p-1.5">
            {locales.map((code) => (
              <li key={code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={locale === code}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm transition-colors',
                    locale === code
                      ? 'bg-secondary font-semibold text-foreground'
                      : 'text-foreground hover:bg-secondary',
                  )}
                  onClick={() => choose(code)}
                >
                  <span>{localeLabels[code]}</span>
                  {locale === code ? <Check className="size-4 text-primary" /> : null}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
