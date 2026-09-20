'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Maximize2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { provinceData, provinceRiskLevels } from '@/lib/zimdrims-data'

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
  /** Enable province click / hover (default true). */
  interactive?: boolean
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
  interactive = true,
}: SituationMapProps) {
  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  function selectProvince(name: string) {
    setSelected((current) => (current === name ? null : name))
    setHovered(null)
  }

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

  const focusProvince = selected ?? hovered
  const focusInfo = focusProvince ? provinceData[focusProvince] : null
  const focusRisk = focusProvince ? provinceRiskLevels[focusProvince] : null

  const mapHeight = selected
    ? 'min-h-[20rem] h-[min(52vh,32rem)] sm:min-h-[22rem] sm:h-[min(56vh,34rem)]'
    : heightClassName

  const frame = (compact: boolean, resizeKey: string) => (
    <div className="space-y-3">
      <div
        className={cn(
          'relative overflow-hidden rounded-xl border border-border/70 shadow-inner',
          compact ? mapHeight : 'h-[min(70vh,40rem)] w-full',
        )}
        style={{
          background:
            'linear-gradient(145deg, var(--map-bg-from) 0%, var(--map-bg-via) 45%, var(--map-bg-to) 100%)',
        }}
      >
        <SituationMapCanvasDynamic
          provinceColors={provinceColors}
          markers={markers}
          resizeKey={`${resizeKey}-${selected ?? 'all'}`}
          selected={selected}
          hovered={hovered}
          onSelect={interactive ? selectProvince : undefined}
          onHover={interactive ? setHovered : undefined}
          interactive={interactive}
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
        {interactive && !selected ? (
          <p className="pointer-events-none absolute right-3 top-3 z-[1000] rounded-md bg-card/90 px-2 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur-sm">
            Tap a province
          </p>
        ) : null}
      </div>

      {interactive && focusProvince && focusInfo ? (
        <div className="rounded-xl border border-border bg-secondary/40 p-3 sm:p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-display text-base font-bold text-foreground sm:text-lg">{focusProvince}</p>
              {focusRisk ? (
                <p className="mt-0.5 text-[12px] font-semibold text-[#16794a]">
                  Risk level: {focusRisk.level}
                </p>
              ) : null}
            </div>
            {selected ? (
              <button
                type="button"
                className="rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-semibold text-foreground hover:bg-secondary"
                onClick={() => setSelected(null)}
              >
                Show all provinces
              </button>
            ) : null}
          </div>
          <dl className="mt-3 grid grid-cols-3 gap-2 text-center sm:gap-3">
            <div className="rounded-lg border border-border bg-card px-2 py-2">
              <dt className="text-[10px] text-muted-foreground">Population</dt>
              <dd className="font-display text-sm font-extrabold tabular-nums">{focusInfo.population}</dd>
            </div>
            <div className="rounded-lg border border-border bg-card px-2 py-2">
              <dt className="text-[10px] text-muted-foreground">Districts</dt>
              <dd className="font-display text-sm font-extrabold tabular-nums">{focusInfo.districts}</dd>
            </div>
            <div className="rounded-lg border border-border bg-card px-2 py-2">
              <dt className="text-[10px] text-muted-foreground">Villages</dt>
              <dd className="font-display text-sm font-extrabold tabular-nums">
                {focusInfo.villages.toLocaleString()}
              </dd>
            </div>
          </dl>
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
            className="max-h-[95dvh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-border bg-card p-4 shadow-2xl"
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
