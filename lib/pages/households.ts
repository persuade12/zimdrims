import { Users, Home, UserRound, Baby, HeartPulse, AlertTriangle } from 'lucide-react'
import type { KpiItem, TableCell, TableColumn } from '@/components/dare/page-primitives'

export const householdKpis: KpiItem[] = [
  { value: '856', label: 'Total Households', sub: '+2.8% vs 2024', icon: Home, color: '#16794a' },
  { value: '4,832', label: 'Total Population', sub: '+3.2% vs 2024', icon: Users, color: '#2563eb' },
  { value: '132', label: 'Female Headed', sub: '15.4%', icon: UserRound, color: '#7c3aed' },
  { value: '18', label: 'Child Headed', sub: '2.1%', icon: Baby, color: '#d64545' },
  { value: '37', label: 'Elderly Headed', sub: '4.3%', icon: Users, color: '#e6a70a' },
  { value: '146', label: 'PWD Households', sub: '17.1%', icon: HeartPulse, color: '#0f766e' },
  { value: '5.6', label: 'Avg. Household Size', sub: 'persons', icon: Home, color: '#2563eb' },
  { value: '214', label: 'Vulnerable HHs', sub: '25.0%', icon: AlertTriangle, color: '#ea580c' },
]

export const vulnerabilityBars = [
  { label: 'Low', count: 366, pct: 42.8, color: '#16794a' },
  { label: 'Medium', count: 276, pct: 32.2, color: '#e6a70a' },
  { label: 'High', count: 214, pct: 25.0, color: '#d64545' },
]

export const householdColumns: TableColumn[] = [
  { key: 'id', label: 'Household ID' },
  { key: 'head', label: 'Household Head' },
  { key: 'gender', label: 'Gender' },
  { key: 'members', label: 'Members' },
  { key: 'livelihood', label: 'Livelihood' },
  { key: 'vulnerability', label: 'Vulnerability' },
  { key: 'zimvac', label: 'ZimVAC' },
  { key: 'protection', label: 'Social Protection' },
]

export const householdRows: Record<string, TableCell>[] = [
  {
    id: 'CHT-001-2025',
    head: 'Tafadzwa Mutasa',
    gender: 'Male',
    members: 6,
    livelihood: 'Crop Farming',
    vulnerability: { type: 'badge', label: 'Low', tone: 'green' },
    zimvac: '68 · Acceptable',
    protection: 'None',
  },
  {
    id: 'CHT-002-2025',
    head: 'Maureen Moyo',
    gender: 'Female',
    members: 4,
    livelihood: 'Livestock Rearing',
    vulnerability: { type: 'badge', label: 'High', tone: 'danger' },
    zimvac: '42 · Poor',
    protection: 'BEAM, HCT',
  },
  {
    id: 'CHT-003-2025',
    head: 'Blessing Chikomba',
    gender: 'Male',
    members: 7,
    livelihood: 'Crop Farming',
    vulnerability: { type: 'badge', label: 'Medium', tone: 'gold' },
    zimvac: '54 · Moderate',
    protection: 'Food Aid',
  },
  {
    id: 'CHT-004-2025',
    head: 'Rutendo Nyoni',
    gender: 'Female',
    members: 3,
    livelihood: 'Informal Business',
    vulnerability: { type: 'badge', label: 'Medium', tone: 'gold' },
    zimvac: '61 · Acceptable',
    protection: 'HCT',
  },
  {
    id: 'CHT-005-2025',
    head: 'Farai Ncube',
    gender: 'Male',
    members: 8,
    livelihood: 'Crop Farming',
    vulnerability: { type: 'badge', label: 'Low', tone: 'green' },
    zimvac: '72 · Acceptable',
    protection: 'None',
  },
  {
    id: 'CHT-006-2025',
    head: 'Chipo Dube',
    gender: 'Female',
    members: 5,
    livelihood: 'Remittances',
    vulnerability: { type: 'badge', label: 'High', tone: 'danger' },
    zimvac: '38 · Poor',
    protection: 'BEAM, Food Aid',
  },
]

export const selectedHousehold = {
  id: 'CHT-002-2025',
  name: 'Maureen Moyo',
  age: 34,
  gender: 'Female',
  phone: '+263 77 412 8891',
  gps: '-18.15345, 32.10876',
  vulnerability: 'High',
  zimvac: '42 · Poor',
  members: [
    { label: '0–5', value: 1, color: '#2563eb' },
    { label: '6–17', value: 2, color: '#7c3aed' },
    { label: '18–59', value: 1, color: '#16794a' },
    { label: '60+', value: 0, color: '#e6a70a' },
  ],
  livelihoods: [
    { label: 'Livestock', value: 60, color: '#2563eb' },
    { label: 'Crop Farming', value: 20, color: '#16794a' },
    { label: 'Informal Business', value: 10, color: '#e6a70a' },
    { label: 'Remittances', value: 10, color: '#7c3aed' },
  ],
  protection: [
    { label: 'BEAM', on: true },
    { label: 'HCT', on: true },
    { label: 'Food Aid', on: false },
    { label: 'Disability Grant', on: false },
  ],
  assets: ['Traditional house', '2 cattle', '3 goats', 'Mobile phone', 'No borehole access'],
  zimvacIndicators: [
    { code: 'FCS', value: '32', status: 'Poor' },
    { code: 'HHS', value: '3.8', status: 'Moderate' },
    { code: 'rCSI', value: '18', status: 'High' },
    { code: 'HDDS', value: '3.2', status: 'Low' },
  ],
}
