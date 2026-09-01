import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  Leaf,
  Wheat,
  Landmark,
  BarChart3,
  Users,
  Map,
} from 'lucide-react'
import type { FilterField, KpiItem, TableCell, TableColumn } from '@/components/dare/page-primitives'
import { provinces } from '@/lib/dare-data'

export type IksCategorySlug = 'environment-climate-change' | 'agriculture' | 'cultural-heritage'

export type IksCategoryConfig = {
  slug: IksCategorySlug
  label: string
  title: string
  subtitle: string
  icon: LucideIcon
  color: string
  kpis: KpiItem[]
  filters: FilterField[]
  columns: TableColumn[]
  rows: Record<string, TableCell>[]
  notes?: string[]
}

const geoFilters: FilterField[] = [
  { id: 'province', label: 'Province', type: 'select', options: provinces },
  { id: 'district', label: 'District', type: 'select', options: ['Makoni', 'Mutare', 'Gutu', 'Hwange', 'Shurugwi'] },
  { id: 'status', label: 'Status', type: 'select', options: ['Verified', 'Published', 'Review'] },
]

function kpi(value: string, label: string, sub: string, icon: LucideIcon, color: string): KpiItem {
  return { value, label, sub, icon, color }
}

const sharedColumns: TableColumn[] = [
  { key: 'title', label: 'Practice / knowledge' },
  { key: 'theme', label: 'Theme' },
  { key: 'custodian', label: 'Knowledge custodian' },
  { key: 'location', label: 'Location' },
  { key: 'status', label: 'Status' },
]

export const iksOverviewKpis: KpiItem[] = [
  kpi('1,286', 'IKS records', 'All categories', BookOpen, '#7c3aed'),
  kpi('412', 'Environment & Climate', 'Validated entries', Leaf, '#16a34a'),
  kpi('468', 'Agriculture', 'Validated entries', Wheat, '#e6a70a'),
  kpi('406', 'Cultural Heritage', 'Validated entries', Landmark, '#2563eb'),
  kpi('73', 'Communities', 'Across provinces', Map, '#0f766e'),
]

export const iksCategories: Record<IksCategorySlug, IksCategoryConfig> = {
  'environment-climate-change': {
    slug: 'environment-climate-change',
    label: 'Environment & Climate Change',
    title: 'IKS · Environment & Climate Change',
    subtitle: 'Local climate observation, conservation and resilience practices.',
    icon: Leaf,
    color: '#16a34a',
    kpis: [
      kpi('412', 'Records', 'Environment & climate', Leaf, '#16a34a'),
      kpi('86', 'Communities', 'Contributing', Users, '#2563eb'),
      kpi('94%', 'Consent complete', 'Metadata quality', BarChart3, '#0f766e'),
      kpi('28', 'Pending review', 'District validation', BookOpen, '#e6a70a'),
    ],
    filters: [
      ...geoFilters,
      {
        id: 'theme',
        label: 'Theme',
        type: 'select',
        options: ['Drought coping', 'Forest conservation', 'Water stewardship', 'Seasonal forecasting', 'Fire management'],
      },
    ],
    columns: sharedColumns,
    rows: [
      {
        title: 'Traditional spring recharge conservation',
        theme: 'Water stewardship',
        custodian: 'Ward 12 Cultural Trust',
        location: 'Makoni',
        status: { type: 'badge', label: 'Published', tone: 'green' },
      },
      {
        title: 'Community firebreak timing calendars',
        theme: 'Fire management',
        custodian: 'VH Chitora Council',
        location: 'Chitora',
        status: { type: 'badge', label: 'Verified', tone: 'green' },
      },
      {
        title: 'Indigenous rainfall onset indicators',
        theme: 'Seasonal forecasting',
        custodian: 'Headman Mabhena Elders',
        location: 'Gutu',
        status: { type: 'badge', label: 'Review', tone: 'gold' },
      },
      {
        title: 'Sacred grove protection protocols',
        theme: 'Forest conservation',
        custodian: 'Chief Nyashanu Court',
        location: 'Buhera',
        status: { type: 'badge', label: 'Published', tone: 'green' },
      },
    ],
    notes: [
      'Entries are co-validated with traditional authorities and environmental extension officers.',
      'Sensitive sacred-site records remain role-restricted.',
    ],
  },
  agriculture: {
    slug: 'agriculture',
    label: 'Agriculture',
    title: 'IKS · Agriculture',
    subtitle: 'Seed systems, soils, livestock and food production knowledge.',
    icon: Wheat,
    color: '#e6a70a',
    kpis: [
      kpi('468', 'Records', 'Agriculture', Wheat, '#e6a70a'),
      kpi('112', 'Seed practices', 'Documented', Leaf, '#16a34a'),
      kpi('91%', 'Consent complete', 'Metadata quality', BarChart3, '#0f766e'),
      kpi('34', 'Pending review', 'Agronomy validation', BookOpen, '#ea580c'),
    ],
    filters: [
      ...geoFilters,
      {
        id: 'theme',
        label: 'Theme',
        type: 'select',
        options: ['Seed selection', 'Soil fertility', 'Pest management', 'Livestock', 'Post-harvest storage'],
      },
    ],
    columns: sharedColumns,
    rows: [
      {
        title: 'Drought-resistant seed selection methods',
        theme: 'Seed selection',
        custodian: 'Headman Chisvo Council',
        location: 'Gutu',
        status: { type: 'badge', label: 'Verified', tone: 'green' },
      },
      {
        title: 'Ash and manure composting cycles',
        theme: 'Soil fertility',
        custodian: 'Women Farmers Circle',
        location: 'Mutare',
        status: { type: 'badge', label: 'Published', tone: 'green' },
      },
      {
        title: 'Intercropping for fall armyworm suppression',
        theme: 'Pest management',
        custodian: 'Ward Extension & Elders Forum',
        location: 'Shurugwi',
        status: { type: 'badge', label: 'Review', tone: 'gold' },
      },
      {
        title: 'Grain basket smoke curing practice',
        theme: 'Post-harvest storage',
        custodian: 'VH Mabhena Households',
        location: 'Hwange',
        status: { type: 'badge', label: 'Published', tone: 'green' },
      },
    ],
    notes: [
      'Agriculture IKS links to ZimVAC livelihood indicators where communities consent to sharing.',
    ],
  },
  'cultural-heritage': {
    slug: 'cultural-heritage',
    label: 'Cultural Heritage',
    title: 'IKS · Cultural Heritage',
    subtitle: 'Oral histories, rites, language and customary governance knowledge.',
    icon: Landmark,
    color: '#2563eb',
    kpis: [
      kpi('406', 'Records', 'Cultural heritage', Landmark, '#2563eb'),
      kpi('148', 'Oral histories', 'Digitized transcripts', BookOpen, '#7c3aed'),
      kpi('96%', 'Consent complete', 'Metadata quality', BarChart3, '#0f766e'),
      kpi('19', 'Pending review', 'Custodian approval', Users, '#e6a70a'),
    ],
    filters: [
      ...geoFilters,
      {
        id: 'theme',
        label: 'Theme',
        type: 'select',
        options: ['Oral history', 'Customary rites', 'Language & naming', 'Dispute mediation', 'Sacred sites'],
      },
    ],
    columns: sharedColumns,
    rows: [
      {
        title: 'Restorative mediation for family disputes',
        theme: 'Dispute mediation',
        custodian: 'Chief Nyashanu Court',
        location: 'Buhera',
        status: { type: 'badge', label: 'Published', tone: 'green' },
      },
      {
        title: 'Chieftainship praise poetry archive',
        theme: 'Oral history',
        custodian: 'Masvingo Cultural Trust',
        location: 'Masvingo',
        status: { type: 'badge', label: 'Verified', tone: 'green' },
      },
      {
        title: 'Rain-making ceremony protocols (restricted)',
        theme: 'Customary rites',
        custodian: 'Chiefdom Elders Council',
        location: 'Makoni',
        status: { type: 'badge', label: 'Review', tone: 'gold' },
      },
      {
        title: 'Totem and naming lineage register notes',
        theme: 'Language & naming',
        custodian: 'Village Heads Forum',
        location: 'Mutare',
        status: { type: 'badge', label: 'Published', tone: 'green' },
      },
    ],
    notes: [
      'Ceremonial and sacred content is access-controlled and never exported without custodian approval.',
    ],
  },
}

export const iksCategoryList = Object.values(iksCategories)
