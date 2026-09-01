'use client'

import { useEffect, useMemo, useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { MapPin, Maximize2, Minimize2, X } from 'lucide-react'
import { provinceData, majorCities, provinces } from '@/lib/dare-data'
import {
  BASE_MAP_HEIGHT,
  BASE_MAP_WIDTH,
  ZIMBABWE_ASPECT,
  projectionConfigForSize,
} from '@/lib/zimbabwe-map'
import { cn } from '@/lib/utils'

const GEO_URL = '/data/zimbabwe-provinces.json'

function shortName(name: string) {
  return name
    .replace('Mashonaland ', 'Mash. ')
    .replace('Matabeleland ', 'Mat. ')
}

type MapCanvasProps = {
  width: number
  height: number
  selected: string | null
  hovered: string | null
  onHover: (name: string | null) => void
  onSelect: (name: string) => void
  showTooltip?: boolean
}

function ZimbabweMapCanvas({
  width,
  height,
  selected,
  hovered,
  onHover,
  onSelect,
  showTooltip = true,
}: MapCanvasProps) {
  const projectionConfig = useMemo(() => projectionConfigForSize(width), [width])
  const tooltipProvince = selected ?? hovered
  const tooltipInfo = tooltipProvince ? provinceData[tooltipProvince] : null
  const scale = width / BASE_MAP_WIDTH

  return (
    <div className="relative h-full w-full">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,rgba(22,121,74,0.14)_1px,transparent_0)] [background-size:20px_20px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.03] via-transparent to-white/20 dark:from-black/20 dark:to-white/5" />

      <ComposableMap
        projection="geoMercator"
        projectionConfig={projectionConfig}
        width={width}
        height={height}
        className="relative z-[1] h-full w-full touch-none"
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = geo.properties.shapeName as string
              const info = provinceData[name]
              const baseFill = info?.fill ?? '#cbd5e1'
              const highlightFill = info?.hover ?? baseFill
              const isSelected = selected === name
              const isHovered = hovered === name
              const isDimmed = Boolean(selected && selected !== name)

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => onHover(name)}
                  onMouseLeave={() => onHover(null)}
                  onClick={(event) => {
                    event.stopPropagation()
                    onSelect(name)
                  }}
                  style={{
                    default: {
                      fill: isSelected || isHovered ? highlightFill : baseFill,
                      stroke: isSelected ? '#16794a' : isHovered ? '#1f9d5f' : 'var(--map-stroke)',
                      strokeWidth: (isSelected ? 2.25 : isHovered ? 1.75 : 0.85) * scale,
                      opacity: isDimmed ? 0.5 : 1,
                      outline: 'none',
                      transition: 'fill 180ms ease, stroke 180ms ease, opacity 180ms ease',
                    },
                    hover: {
                      fill: highlightFill,
                      stroke: '#16794a',
                      strokeWidth: 2 * scale,
                      opacity: 1,
                      cursor: 'pointer',
                      outline: 'none',
                    },
                    pressed: {
                      fill: highlightFill,
                      stroke: '#0c2f1e',
                      strokeWidth: 2.25 * scale,
                      opacity: 1,
                      outline: 'none',
                    },
                  }}
                />
              )
            })
          }
        </Geographies>

        {majorCities.map((city) => (
          <Marker key={city.name} coordinates={city.coordinates}>
            <g style={{ pointerEvents: 'none' }}>
              <circle r={(city.capital ? 10 : 8) * scale} fill="var(--primary)" opacity={0.18} />
              <circle
                r={(city.capital ? 4.5 : 3.5) * scale}
                fill="var(--primary)"
                stroke="#fff"
                strokeWidth={1.5 * scale}
              />
              <text
                textAnchor="middle"
                y={-12 * scale}
                style={{
                  fontFamily: 'var(--font-display), sans-serif',
                  fontSize: (city.capital ? 11 : 10) * scale,
                  fontWeight: 800,
                  fill: 'var(--foreground)',
                  paintOrder: 'stroke',
                  stroke: 'var(--card)',
                  strokeWidth: 3 * scale,
                }}
              >
                {city.name}
              </text>
            </g>
          </Marker>
        ))}
      </ComposableMap>

      {showTooltip && tooltipProvince && tooltipInfo ? (
        <div className="pointer-events-none absolute left-3 top-3 z-10 max-w-[11rem] rounded-xl border border-border/80 bg-card/95 p-3 shadow-lg backdrop-blur-sm">
          <p className="font-display text-sm font-bold text-foreground">{tooltipProvince}</p>
          {selected === tooltipProvince ? (
            <p className="mt-0.5 text-[10px] font-semibold text-primary">Selected</p>
          ) : null}
          <dl className="mt-2 space-y-1 text-[11px]">
            <div className="flex justify-between gap-2">
              <dt className="text-muted-foreground">Population</dt>
              <dd className="font-semibold tabular-nums text-foreground">{tooltipInfo.population}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-muted-foreground">Districts</dt>
              <dd className="font-semibold tabular-nums text-foreground">{tooltipInfo.districts}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-muted-foreground">Villages</dt>
              <dd className="font-semibold tabular-nums text-foreground">
                {tooltipInfo.villages.toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>
      ) : null}

      <div className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-lg border border-border/60 bg-card/80 px-2.5 py-2 backdrop-blur-sm">
        <div className="flex h-2 w-28 overflow-hidden rounded-sm border border-foreground/25">
          {[1, 0, 1, 0, 1].map((on, i) => (
            <span key={i} className={cn('flex-1', on ? 'bg-foreground/60' : 'bg-transparent')} />
          ))}
        </div>
        <p className="mt-1 text-[9px] font-medium tabular-nums text-muted-foreground">
          0 &nbsp; 75 &nbsp; 150 &nbsp; 225 &nbsp; 300 km
        </p>
      </div>

      <div className="pointer-events-none absolute bottom-3 right-3 z-10 flex size-10 flex-col items-center justify-center rounded-full border border-border/60 bg-card/80 text-primary shadow-sm backdrop-blur-sm">
        <span className="text-[9px] font-bold leading-none">N</span>
        <span className="mt-0.5 text-sm leading-none">▲</span>
      </div>
    </div>
  )
}

function ProvinceLegend({
  selected,
  hovered,
  onHover,
  onSelect,
  className,
}: {
  selected: string | null
  hovered: string | null
  onHover: (name: string | null) => void
  onSelect: (name: string) => void
  className?: string
}) {
  return (
    <aside className={cn('flex flex-col gap-3', className)}>
      <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Provinces</p>
      <ul className="grid max-h-[22rem] grid-cols-2 gap-1.5 overflow-y-auto pr-0.5 lg:grid-cols-1">
        {provinces.map((name) => {
          const info = provinceData[name]
          const isSelected = selected === name
          const isHovered = hovered === name
          return (
            <li key={name}>
              <button
                type="button"
                className={cn(
                  'flex w-full items-center gap-2 rounded-lg border px-2 py-1.5 text-left transition-colors',
                  isSelected
                    ? 'border-primary bg-accent shadow-sm'
                    : isHovered
                      ? 'border-primary/30 bg-secondary/80'
                      : 'border-transparent hover:border-border hover:bg-secondary/80',
                )}
                onMouseEnter={() => onHover(name)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onSelect(name)}
              >
                <span
                  className={cn(
                    'size-3 shrink-0 rounded-sm shadow-sm ring-1 ring-black/5 transition-transform',
                    isSelected && 'scale-110 ring-2 ring-primary/40',
                  )}
                  style={{ backgroundColor: info?.fill ?? '#cbd5e1' }}
                />
                <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-foreground">
                  {shortName(name)}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="mt-auto space-y-2 border-t border-border pt-3">
        <LegendRow icon={<span className="size-2 rounded-full bg-primary ring-2 ring-primary/20" />} label="Major cities" />
        <LegendRow icon={<MapPin className="size-3 text-primary" />} label="Capital · Harare" />
        <LegendRow
          icon={<span className="h-0 w-4 border-t-2 border-dashed border-muted-foreground/50" />}
          label="Province boundary"
        />
      </div>
    </aside>
  )
}

function computeExpandedSize() {
  const maxW = Math.min(window.innerWidth - 48, 1100)
  const maxH = window.innerHeight - 180
  let width = maxW
  let height = width / ZIMBABWE_ASPECT
  if (height > maxH) {
    height = maxH
    width = height * ZIMBABWE_ASPECT
  }
  return { width: Math.round(width), height: Math.round(height) }
}

export function ProvincesMap() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [expandedSize, setExpandedSize] = useState({
    width: 960,
    height: Math.round(960 / ZIMBABWE_ASPECT),
  })

  useEffect(() => {
    if (!expanded) return
    const update = () => setExpandedSize(computeExpandedSize())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [expanded])

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

  return (
    <>
      <section className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Zimbabwe &ndash; Provinces Overview
            </h2>
            <p className="mt-0.5 text-[11px] text-muted-foreground">10 provinces · click to select</p>
          </div>
          <button
            type="button"
            className="rounded-lg border border-border p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Expand map"
            onClick={() => setExpanded(true)}
          >
            <Maximize2 className="size-4" />
          </button>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_12.5rem]">
          <div
            className="relative w-full overflow-hidden rounded-xl border border-border/70 shadow-inner"
            style={{
              background:
                'linear-gradient(145deg, var(--map-bg-from) 0%, var(--map-bg-via) 45%, var(--map-bg-to) 100%)',
            }}
          >
            <ZimbabweMapCanvas
              width={BASE_MAP_WIDTH}
              height={BASE_MAP_HEIGHT}
              selected={selected}
              hovered={hovered}
              onHover={setHovered}
              onSelect={selectProvince}
            />
          </div>

          <ProvinceLegend
            selected={selected}
            hovered={hovered}
            onHover={setHovered}
            onSelect={selectProvince}
          />
        </div>
      </section>

      {expanded ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded Zimbabwe provinces map"
          onClick={() => setExpanded(false)}
        >
          <div
            className="flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">Zimbabwe Provinces</h2>
                <p className="text-[11px] text-muted-foreground">Click a province for details · Esc to close</p>
              </div>
              <button
                type="button"
                className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                aria-label="Close expanded map"
                onClick={() => setExpanded(false)}
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="grid flex-1 gap-4 overflow-auto p-4 sm:p-5 lg:grid-cols-[1fr_12.5rem]">
              <div
                className="relative mx-auto w-full max-w-full overflow-hidden rounded-xl border border-border/70 shadow-inner"
                style={{
                  background:
                    'linear-gradient(145deg, var(--map-bg-from) 0%, var(--map-bg-via) 45%, var(--map-bg-to) 100%)',
                }}
              >
                <ZimbabweMapCanvas
                  width={expandedSize.width}
                  height={expandedSize.height}
                  selected={selected}
                  hovered={hovered}
                  onHover={setHovered}
                  onSelect={selectProvince}
                />
              </div>

              <ProvinceLegend
                selected={selected}
                hovered={hovered}
                onHover={setHovered}
                onSelect={selectProvince}
                className="lg:max-h-[70vh]"
              />
            </div>

            <div className="flex justify-end border-t border-border px-4 py-3 sm:px-5">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm font-semibold text-foreground hover:bg-accent"
                onClick={() => setExpanded(false)}
              >
                <Minimize2 className="size-4" />
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

function LegendRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
      <span className="flex w-5 shrink-0 items-center justify-center">{icon}</span>
      <span>{label}</span>
    </div>
  )
}
