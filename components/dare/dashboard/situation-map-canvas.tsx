'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { GeoJSON, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Feature, FeatureCollection } from 'geojson'
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
import type { MapMarker } from '@/components/dare/dashboard/situation-map'

import 'leaflet/dist/leaflet.css'

const GEO_URL = '/data/zimbabwe-provinces.json'

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

function MapEffects({ resizeKey }: { resizeKey: string }) {
  const map = useMap()
  useEffect(() => {
    map.fitBounds(ZIMBABWE_BOUNDS, { padding: [18, 18] })
  }, [map])

  useEffect(() => {
    const id = window.setTimeout(() => map.invalidateSize(), 60)
    return () => window.clearTimeout(id)
  }, [map, resizeKey])

  useEffect(() => {
    const observer = new ResizeObserver(() => map.invalidateSize({ animate: false }))
    observer.observe(map.getContainer())
    return () => observer.disconnect()
  }, [map])

  return null
}

function markerIcon(marker: MapMarker) {
  const color = marker.color ?? '#d64545'
  const text = marker.value !== undefined ? String(marker.value) : ''
  return L.divIcon({
    className: 'situation-marker',
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    html: `<div class="situation-marker-pin" style="--pin:${color}">
      <span class="situation-marker-dot">${text}</span>
      ${marker.label ? `<span class="situation-marker-label">${marker.label}</span>` : ''}
    </div>`,
  })
}

export default function SituationMapCanvas({
  provinceColors,
  markers = [],
  resizeKey,
}: {
  provinceColors: Record<string, string>
  markers?: MapMarker[]
  resizeKey: string
}) {
  const dark = useIsDark()
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null)
  const geoJsonRef = useRef<L.GeoJSON | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(GEO_URL)
      .then((r) => r.json())
      .then((data: FeatureCollection) => {
        if (!cancelled) setGeoData(data)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const styleFor = useCallback(
    (name: string): L.PathOptions => ({
      fillColor: provinceColors[name] ?? '#cbd5e1',
      fillOpacity: 0.72,
      color: '#ffffff',
      weight: 1.1,
      opacity: 1,
    }),
    [provinceColors],
  )

  useEffect(() => {
    const layer = geoJsonRef.current
    if (!layer) return
    layer.eachLayer((raw) => {
      const path = raw as L.Path & { feature?: Feature }
      const name = (path.feature?.properties as { shapeName?: string } | undefined)?.shapeName
      if (name) path.setStyle(styleFor(name))
    })
  }, [styleFor])

  if (!geoData) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Loading map…
      </div>
    )
  }

  return (
    <MapContainer
      center={ZIMBABWE_CENTER}
      zoom={ZIMBABWE_DEFAULT_ZOOM}
      minZoom={ZIMBABWE_MIN_ZOOM}
      maxZoom={ZIMBABWE_MAX_ZOOM}
      maxBounds={ZIMBABWE_BOUNDS}
      maxBoundsViscosity={0.85}
      scrollWheelZoom
      className="zimbabwe-map relative z-0 h-full w-full rounded-[inherit]"
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
        }}
        data={geoData}
        style={(feature) => {
          const name = (feature?.properties as { shapeName?: string } | undefined)?.shapeName
          return name ? styleFor(name) : {}
        }}
      />
      {markers.map((m) => (
        <Marker key={m.id} position={m.position} icon={markerIcon(m)} interactive={false} />
      ))}
      <MapEffects resizeKey={resizeKey} />
    </MapContainer>
  )
}
