import type { ReactNode } from 'react'
import type { FilterField, KpiItem } from '@/components/dare/page-primitives'
import type { MapStory } from '@/lib/concept/map-stories'

export type RichModuleConfig = {
  title: string
  subtitle: string
  breadcrumbs: { label: string; href?: string }[]
  kpis: KpiItem[]
  primaryAction?: string
  filters?: FilterField[]
  map?: {
    title: string
    provinceColors: Record<string, string>
    markers?: { id: string; position: [number, number]; value: number; color: string; label: string }[]
    legend?: { color: string; label: string }[]
    story?: MapStory
    provinceStories?: Record<string, string>
  }
  donut?: {
    title: string
    centerValue: string
    centerLabel: string
    segments: { label: string; value: number; color: string }[]
  }
  statusCards?: { label: string; value: string }[]
  progress?: { title: string; items: { label: string; pct: number }[] }
  bars?: { title: string; items: { label: string; value: number; color?: string; suffix?: string }[] }
  table?: { title: string; columns: string[]; rows: (string | ReactNode)[][] }
  feed?: { title: string; items: { title: string; meta: string; tone?: 'new' | 'info' | 'alert' }[] }
  pipeline?: { title: string; steps: { label: string; count?: string | number; active?: boolean }[] }
  list?: { title: string; items: { label: string; badge?: string }[] }
  actions?: { label: string; href?: string }[]
  notes?: string[]
}
