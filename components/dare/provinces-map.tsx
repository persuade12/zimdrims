'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { MapPin, Maximize2, Minimize2, X } from 'lucide-react'
import { provinceData, provinces } from '@/lib/zimdrims-data'
import { useLocale } from '@/components/dare/locale-provider'
import { ZIMBABWE_ASPECT } from '@/lib/zimbabwe-map'
import { cn } from '@/lib/utils'

const ZimbabweLeafletMap = dynamic(
  () =>
    import('@/components/dare/zimbabwe-leaflet-map').then((mod) => mod.ZimbabweLeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[16rem] items-center justify-center text-sm text-muted-foreground">
        Loading Zimbabwe map…
      </div>
    ),
  },
)

function shortName(name: string) {
  return name
    .replace('Mashonaland ', 'Mash. ')
    .replace('Matabeleland ', 'Mat. ')
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
      <ul className="grid max-h-[min(36rem,58vh)] grid-cols-2 gap-1.5 overflow-y-auto pr-0.5 lg:grid-cols-1">
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

export function ProvincesMap() {
  const { t } = useLocale()
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)

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
              {t.home.hazardMap}
            </h2>
            <p className="mt-0.5 text-[11px] text-muted-foreground">10 provinces · hazard risk overlay</p>
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

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_13rem]">
          <div
            className="relative min-h-[22rem] w-full overflow-hidden rounded-xl border border-border/70 shadow-inner sm:min-h-[26rem] lg:min-h-[32rem] xl:min-h-[36rem]"
            style={{
              height: 'min(58vh, 40rem)',
              background:
                'linear-gradient(145deg, var(--map-bg-from) 0%, var(--map-bg-via) 45%, var(--map-bg-to) 100%)',
            }}
          >
            <ZimbabweLeafletMap
              selected={selected}
              hovered={hovered}
              onHover={setHovered}
              onSelect={selectProvince}
              resizeKey="card"
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
                  aspectRatio: String(ZIMBABWE_ASPECT),
                  maxHeight: '70vh',
                  background:
                    'linear-gradient(145deg, var(--map-bg-from) 0%, var(--map-bg-via) 45%, var(--map-bg-to) 100%)',
                }}
              >
                <ZimbabweLeafletMap
                  selected={selected}
                  hovered={hovered}
                  onHover={setHovered}
                  onSelect={selectProvince}
                  resizeKey={`expanded-${expanded}`}
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
