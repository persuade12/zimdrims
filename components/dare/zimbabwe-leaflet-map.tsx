'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  GeoJSON,
  MapContainer,
  Marker,
  TileLayer,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import type { Feature, FeatureCollection, Geometry } from 'geojson'
import { provinceData, majorCities } from '@/lib/zimdrims-data'
import {
  CARTO_ATTRIBUTION,
  CARTO_DARK,
  CARTO_LIGHT,
  ZIMBABWE_BOUNDS,
  ZIMBABWE_CENTER,
  ZIMBABWE_DEFAULT_ZOOM,
  ZIMBABWE_MAX_ZOOM,
  ZIMBABWE_MIN_ZOOM,
} from '@/lib/zimbabwe-map'

import 'leaflet/dist/leaflet.css'

const GEO_URL = '/data/zimbabwe-provinces.json'

type ProvinceProperties = {
  shapeName: string
}

type ProvinceFeature = Feature<Geometry, ProvinceProperties>

type ZimbabweLeafletMapProps = {
  selected: string | null
  hovered: string | null
  onHover: (name: string | null) => void
  onSelect: (name: string) => void
  showTooltip?: boolean
  /** Bumps when the map frame is shown/resized (e.g. expand modal). */
  resizeKey?: string | number
  className?: string
}

function useIsDark() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const sync = () => setDark(root.classList.contains('dark'))
    sync()
    const obs = new MutationObserver(sync)
    obs.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  return dark
}

function MapEffects({
  selected,
  geoData,
  resizeKey,
}: {
  selected: string | null
  geoData: FeatureCollection
  resizeKey?: string | number
}) {
  const map = useMap()
  const prevSelected = useRef<string | null>(null)

  useEffect(() => {
    const scale = L.control.scale({ imperial: false, metric: true, position: 'bottomleft' })
    scale.addTo(map)
    map.fitBounds(ZIMBABWE_BOUNDS, { padding: [20, 20] })
    return () => {
      scale.remove()
    }
  }, [map])

  useEffect(() => {
    const id = window.setTimeout(() => map.invalidateSize(), 80)
    return () => window.clearTimeout(id)
  }, [map, resizeKey])

  useEffect(() => {
    const container = map.getContainer()
    const observer = new ResizeObserver(() => {
      map.invalidateSize({ animate: false })
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [map])

  useEffect(() => {
    if (selected === prevSelected.current) return
    prevSelected.current = selected

    if (!selected) {
      map.flyToBounds(ZIMBABWE_BOUNDS, { padding: [28, 28], duration: 0.6 })
      return
    }

    const feature = geoData.features.find(
      (f) => (f.properties as ProvinceProperties | null)?.shapeName === selected,
    )
    if (!feature) return

    const bounds = L.geoJSON(feature).getBounds()
    if (bounds.isValid()) {
      map.flyToBounds(bounds, { padding: [48, 48], maxZoom: 8, duration: 0.65 })
    }
  }, [selected, geoData, map])

  return null
}

function cityIcon(name: string, capital: boolean) {
  return L.divIcon({
    className: 'zimbabwe-city-marker',
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    html: `<div class="zimbabwe-city-pin${capital ? ' is-capital' : ''}">
      <span class="zimbabwe-city-name">${name}</span>
      <span class="zimbabwe-city-dot" aria-hidden="true"></span>
    </div>`,
  })
}

export function ZimbabweLeafletMap({
  selected,
  hovered,
  onHover,
  onSelect,
  showTooltip = true,
  resizeKey,
  className,
}: ZimbabweLeafletMapProps) {
  const dark = useIsDark()
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null)
  const geoJsonRef = useRef<L.GeoJSON | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(GEO_URL)
      .then((res) => res.json())
      .then((data: FeatureCollection) => {
        if (!cancelled) setGeoData(data)
      })
      .catch(() => {
        if (!cancelled) setGeoData(null)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const styleFor = useCallback(
    (name: string): L.PathOptions => {
      const info = provinceData[name]
      const isSelected = selected === name
      const isHovered = hovered === name
      const isDimmed = Boolean(selected && selected !== name)
      const baseFill = info?.fill ?? '#cbd5e1'
      const highlightFill = info?.hover ?? baseFill

      return {
        fillColor: isSelected || isHovered ? highlightFill : baseFill,
        fillOpacity: isDimmed ? 0.4 : 0.7,
        color: isSelected ? '#16794a' : isHovered ? '#1f9d5f' : '#ffffff',
        weight: isSelected ? 2.5 : isHovered ? 2 : 1.1,
        opacity: 1,
      }
    },
    [selected, hovered],
  )

  const applyStyles = useCallback(() => {
    const layer = geoJsonRef.current
    if (!layer) return
    layer.eachLayer((raw) => {
      const path = raw as L.Path & { feature?: ProvinceFeature }
      const name = path.feature?.properties?.shapeName
      if (name) path.setStyle(styleFor(name))
    })
  }, [styleFor])

  useEffect(() => {
    applyStyles()
  }, [applyStyles])

  const onEachFeature = useCallback(
    (feature: Feature, layer: L.Layer) => {
      const name = (feature.properties as ProvinceProperties | null)?.shapeName
      if (!name) return

      layer.on({
        mouseover: () => onHover(name),
        mouseout: () => onHover(null),
        click: (event) => {
          L.DomEvent.stopPropagation(event)
          onSelect(name)
        },
      })
    },
    [onHover, onSelect],
  )

  const cityMarkers = useMemo(
    () =>
      majorCities.map((city) => ({
        name: city.name,
        capital: Boolean(city.capital),
        position: [city.coordinates[1], city.coordinates[0]] as [number, number],
        icon: cityIcon(city.name, Boolean(city.capital)),
      })),
    [],
  )

  const tooltipProvince = selected ?? hovered
  const tooltipInfo = tooltipProvince ? provinceData[tooltipProvince] : null

  return (
    <div className={`zimbabwe-map relative h-full w-full min-h-[16rem] ${className ?? ''}`}>
      {!geoData ? (
        <div className="flex h-full min-h-[16rem] items-center justify-center text-sm text-muted-foreground">
          Loading Zimbabwe map…
        </div>
      ) : (
        <MapContainer
          center={ZIMBABWE_CENTER}
          zoom={ZIMBABWE_DEFAULT_ZOOM}
          minZoom={ZIMBABWE_MIN_ZOOM}
          maxZoom={ZIMBABWE_MAX_ZOOM}
          maxBounds={ZIMBABWE_BOUNDS}
          maxBoundsViscosity={0.85}
          scrollWheelZoom
          className="relative z-0 h-full w-full rounded-[inherit]"
          style={{ background: 'transparent' }}
        >
          <TileLayer
            key={dark ? 'dark' : 'light'}
            attribution={CARTO_ATTRIBUTION}
            url={dark ? CARTO_DARK : CARTO_LIGHT}
            subdomains="abcd"
          />

          <GeoJSON
            ref={(ref) => {
              geoJsonRef.current = ref
              if (ref) applyStyles()
            }}
            data={geoData}
            style={(feature) => {
              const name = (feature?.properties as ProvinceProperties | undefined)?.shapeName
              return name ? styleFor(name) : {}
            }}
            onEachFeature={onEachFeature}
          />

          {cityMarkers.map((city) => (
            <Marker
              key={city.name}
              position={city.position}
              icon={city.icon}
              interactive={false}
            />
          ))}

          <MapEffects selected={selected} geoData={geoData} resizeKey={resizeKey} />
        </MapContainer>
      )}

      {showTooltip && tooltipProvince && tooltipInfo ? (
        <div className="pointer-events-none absolute left-3 top-3 z-[1000] max-w-[11rem] rounded-xl border border-border/80 bg-card/95 p-3 shadow-lg backdrop-blur-sm">
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

      <div className="pointer-events-none absolute bottom-10 right-3 z-[1000] flex size-10 flex-col items-center justify-center rounded-full border border-border/60 bg-card/80 text-primary shadow-sm backdrop-blur-sm sm:bottom-3">
        <span className="text-[9px] font-bold leading-none">N</span>
        <span className="mt-0.5 text-sm leading-none">▲</span>
      </div>
    </div>
  )
}
