'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Maximize2, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type MapMarker = {
  id: string
  /** [lat, lng] */
  position: [number, number]
  label?: string
  value?: string | number
  color?: string
}

export type SituationMapProps = {
  title?: string
  provinceColors: Record<string, string>
  markers?: MapMarker[]
  legend?: { color: string; label: string }[]
  className?: string
  heightClassName?: string
}

const SituationMapCanvasDynamic = dynamic(
  () => import('@/components/dare/dashboard/situation-map-canvas'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Loading map…
      </div>
    ),
  },
)

export function SituationMap({
  title = 'Situation Map',
  provinceColors,
  markers,
  legend,
  className,
  heightClassName = 'min-h-[18rem] h-[min(42vh,26rem)]',
}: SituationMapProps) {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!expanded) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [expanded])

  const frame = (compact: boolean, resizeKey: string) => (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-border/70 shadow-inner',
        compact ? heightClassName : 'h-[min(70vh,40rem)] w-full',
      )}
      style={{
        background:
          'linear-gradient(145deg, var(--map-bg-from) 0%, var(--map-bg-via) 45%, var(--map-bg-to) 100%)',
      }}
    >
      <SituationMapCanvasDynamic
        provinceColors={provinceColors}
        markers={markers}
        resizeKey={resizeKey}
      />
      {legend?.length ? (
        <div className="pointer-events-none absolute bottom-3 left-3 z-[1000] rounded-lg border border-border/70 bg-card/90 p-2 backdrop-blur-sm">
          <p className="mb-1 text-[9px] font-bold uppercase tracking-wide text-muted-foreground">Legend</p>
          <ul className="space-y-1">
            {legend.map((item) => (
              <li key={item.label} className="flex items-center gap-1.5 text-[10px] text-foreground">
                <span className="size-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )

  return (
    <>
      <section className={cn('rounded-xl border border-border bg-card', className)}>
        <header className="flex items-center justify-between gap-2 border-b border-border px-4 py-2.5">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-foreground">{title}</h3>
          <button
            type="button"
            className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Expand map"
            onClick={() => setExpanded(true)}
          >
            <Maximize2 className="size-3.5" />
          </button>
        </header>
        <div className="p-3 sm:p-4">{frame(true, 'card')}</div>
      </section>

      {expanded ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setExpanded(false)}
        >
          <div
            className="w-full max-w-5xl rounded-2xl border border-border bg-card p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="font-display text-lg font-bold">{title}</h3>
              <button
                type="button"
                className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-secondary"
                onClick={() => setExpanded(false)}
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>
            {frame(false, 'expanded')}
          </div>
        </div>
      ) : null}
    </>
  )
}
