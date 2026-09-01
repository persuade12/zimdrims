import { Gavel, CheckCircle2, Clock, Scale, Percent, Timer } from 'lucide-react'
import type { KpiItem, TableCell, TableColumn } from '@/components/dare/page-primitives'

export const courtKpis: KpiItem[] = [
  { value: '318,445', label: 'Cases Received', sub: '+4,532 this month', icon: Gavel, color: '#2563eb' },
  { value: '297,810', label: 'Cases Closed', sub: '+4,128 this month', icon: CheckCircle2, color: '#16794a' },
  { value: '20,635', label: 'Pending Cases', icon: Clock, color: '#e6a70a' },
  { value: '4,126', label: 'Appeals Filed', icon: Scale, color: '#7c3aed' },
  { value: '93.5%', label: 'Clearance Rate', icon: Percent, color: '#16794a' },
  { value: '18 days', label: 'Avg. Resolution Time', icon: Timer, color: '#2563eb' },
]

export const caseCategories = [
  { label: 'Land Disputes', value: 44, color: '#2563eb' },
  { label: 'Family Matters', value: 20, color: '#1e3a8a' },
  { label: 'Inheritance', value: 15, color: '#d64545' },
  { label: 'Boundary', value: 10, color: '#0f766e' },
  { label: 'Livestock', value: 6, color: '#ea580c' },
  { label: 'Other', value: 5, color: '#e6a70a' },
]

export const casesByProvince = [
  { province: 'Mashonaland Central', cases: 48220 },
  { province: 'Mashonaland East', cases: 43337 },
  { province: 'Mashonaland West', cases: 37441 },
  { province: 'Harare', cases: 32681 },
  { province: 'Midlands', cases: 31342 },
  { province: 'Manicaland', cases: 29991 },
  { province: 'Masvingo', cases: 27334 },
  { province: 'Bulawayo', cases: 24301 },
  { province: 'Matabeleland North', cases: 21123 },
  { province: 'Matabeleland South', cases: 19657 },
]

export const appealOutcomes = [
  { label: 'Upheld', value: 61, color: '#2563eb' },
  { label: 'Overturned', value: 23, color: '#d64545' },
  { label: 'Partially Upheld', value: 9, color: '#0f766e' },
  { label: 'Pending', value: 7, color: '#7c3aed' },
]

export const mediation = {
  cases: '152,884',
  successful: '138,442',
  successfulPct: '90.6%',
  unsuccessful: '14,442',
  unsuccessfulPct: '9.4%',
}

export const courtCaseColumns: TableColumn[] = [
  { key: 'id', label: 'Case ID' },
  { key: 'category', label: 'Category' },
  { key: 'village', label: 'Village' },
  { key: 'province', label: 'Province' },
  { key: 'status', label: 'Status' },
  { key: 'days', label: 'Days Open' },
]

export const courtCases: Record<string, TableCell>[] = [
  {
    id: 'TC-2025-4412',
    category: 'Land Disputes',
    village: 'Chitora',
    province: 'Manicaland',
    status: { type: 'badge', label: 'In Mediation', tone: 'info' },
    days: 11,
  },
  {
    id: 'TC-2025-4398',
    category: 'Inheritance',
    village: 'Mabhena',
    province: 'Masvingo',
    status: { type: 'badge', label: 'Pending', tone: 'gold' },
    days: 18,
  },
  {
    id: 'TC-2025-4371',
    category: 'Boundary',
    village: 'Mandiya',
    province: 'Matabeleland North',
    status: { type: 'badge', label: 'Closed', tone: 'green' },
    days: 9,
  },
  {
    id: 'TC-2025-4355',
    category: 'Livestock',
    village: 'Nyanga',
    province: 'Manicaland',
    status: { type: 'badge', label: 'Appeal', tone: 'danger' },
    days: 32,
  },
  {
    id: 'TC-2025-4320',
    category: 'Family Matters',
    village: 'Gokwe',
    province: 'Midlands',
    status: { type: 'badge', label: 'Closed', tone: 'green' },
    days: 14,
  },
]
