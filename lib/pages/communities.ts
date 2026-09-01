import { Users, Home, HeartPulse, GraduationCap, Droplets, HardHat } from 'lucide-react'
import type { KpiItem, TableCell, TableColumn } from '@/components/dare/page-primitives'

export const villageMeta = {
  name: 'Chitora Village',
  breadcrumb: 'Manicaland · Makoni District · Chief Makoni · Headmanship Chimwewe',
  gps: '-18.15345, 32.10876',
  area: '3,245 Ha',
  density: '149 / km²',
}

export const communityKpis: KpiItem[] = [
  { value: '4,832', label: 'Population', sub: '+3.2% vs 2024', icon: Users, color: '#2563eb' },
  { value: '856', label: 'Households', sub: '+2.8% vs 2024', icon: Home, color: '#16794a' },
  { value: '2,412', label: 'Women 18+', sub: '49.9%', icon: Users, color: '#7c3aed' },
  { value: '1,836', label: 'Youth 15–35', sub: '38.0%', icon: Users, color: '#e6a70a' },
  { value: '146', label: 'Persons with Disabilities', sub: '3.0%', icon: HeartPulse, color: '#d64545' },
  { value: '4', label: 'Schools', sub: 'All operational', icon: GraduationCap, color: '#2563eb' },
  { value: '1', label: 'Clinics', sub: 'Operational', icon: HeartPulse, color: '#16794a' },
  { value: '23', label: 'Boreholes', sub: '20 functional', icon: Droplets, color: '#0f766e' },
  { value: '9', label: 'Active Projects', sub: 'In progress', icon: HardHat, color: '#7c3aed' },
]

export const householdCategories = [
  { label: 'Female Headed', value: 15.4, color: '#7c3aed' },
  { label: 'Child Headed', value: 2.1, color: '#d64545' },
  { label: 'Elderly Headed', value: 4.3, color: '#e6a70a' },
  { label: 'PWD Households', value: 3.0, color: '#2563eb' },
  { label: 'OVC Households', value: 4.4, color: '#0f766e' },
  { label: 'Other', value: 70.8, color: '#16794a' },
]

export const resilience = [
  { label: 'Food Security', pct: 82 },
  { label: 'Climate', pct: 74 },
  { label: 'Social Protection', pct: 49 },
  { label: 'Infrastructure', pct: 78 },
  { label: 'Education', pct: 81 },
  { label: 'Health', pct: 76 },
  { label: 'Governance', pct: 92 },
]

export const hazards = [
  { label: 'Drought', level: 'Moderate', tone: 'gold' as const },
  { label: 'Flood', level: 'Low', tone: 'green' as const },
  { label: 'Wild Fire', level: 'High', tone: 'danger' as const },
  { label: 'Storm', level: 'Low', tone: 'green' as const },
  { label: 'Heat Stress', level: 'Moderate', tone: 'gold' as const },
  { label: 'Water Scarcity', level: 'Moderate', tone: 'gold' as const },
]

export const livelihoods = [
  { label: 'Crop Farming', value: 62, color: '#16794a' },
  { label: 'Livestock', value: 18, color: '#2563eb' },
  { label: 'Formal Employment', value: 6, color: '#7c3aed' },
  { label: 'Informal Business', value: 5, color: '#e6a70a' },
  { label: 'Remittances', value: 4, color: '#0f766e' },
  { label: 'Artisanal Mining', value: 3, color: '#d64545' },
  { label: 'Other', value: 2, color: '#94a3b8' },
]

export const zimvacVillage = [
  { label: 'Food Consumption Score', value: '68', status: 'Acceptable' },
  { label: 'Dietary Diversity', value: '6.1', status: 'Good' },
  { label: 'Hunger Scale', value: '1.4', status: 'Low' },
  { label: 'Coping Strategy Index', value: '8.2', status: 'Moderate' },
]

export const zimlacVillage = [
  { label: 'Service Delivery', pct: 78 },
  { label: 'Citizen Satisfaction', pct: 74 },
  { label: 'Budget Execution', pct: 82 },
  { label: 'Participation', pct: 69 },
]

export const projectColumns: TableColumn[] = [
  { key: 'name', label: 'Project' },
  { key: 'sector', label: 'Sector' },
  { key: 'status', label: 'Status' },
  { key: 'progress', label: 'Progress' },
]

export const villageProjects: Record<string, TableCell>[] = [
  {
    name: 'Borehole Rehabilitation',
    sector: 'WASH',
    status: { type: 'badge', label: 'In Progress', tone: 'info' },
    progress: { type: 'progress', pct: 70 },
  },
  {
    name: 'Clinic Solar Backup',
    sector: 'Health',
    status: { type: 'badge', label: 'Completed', tone: 'green' },
    progress: { type: 'progress', pct: 100 },
  },
  {
    name: 'Feeder Road Gravelling',
    sector: 'Infrastructure',
    status: { type: 'badge', label: 'In Progress', tone: 'info' },
    progress: { type: 'progress', pct: 45 },
  },
  {
    name: 'School Garden Expansion',
    sector: 'Education',
    status: { type: 'badge', label: 'Not Started', tone: 'muted' },
    progress: { type: 'progress', pct: 10 },
  },
]

export const villageInsights = [
  '87 vulnerable households are clustered in the northern section of Chitora.',
  'Borehole coverage (88%) is below the Makoni District average.',
  'Wild fire risk is High for Jun–Aug 2025; community firebreaks are overdue.',
  'Investment readiness is 74/100, led by agriculture potential and market access.',
]
