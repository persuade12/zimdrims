'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  function apply(next: boolean) {
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <div className="flex items-center rounded-full border border-border bg-card p-0.5">
      <button
        type="button"
        onClick={() => apply(false)}
        aria-label="Light mode"
        aria-pressed={!dark}
        className={cn(
          'flex size-8 items-center justify-center rounded-full transition-colors',
          !dark ? 'bg-secondary text-primary' : 'text-muted-foreground hover:text-foreground',
        )}
      >
        <Sun className="size-4" />
      </button>
      <button
        type="button"
        onClick={() => apply(true)}
        aria-label="Dark mode"
        aria-pressed={dark}
        className={cn(
          'flex size-8 items-center justify-center rounded-full transition-colors',
          dark ? 'bg-secondary text-primary' : 'text-muted-foreground hover:text-foreground',
        )}
      >
        <Moon className="size-4" />
      </button>
    </div>
  )
}
