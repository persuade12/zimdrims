import {
  Activity,
  AlertTriangle,
  Building2,
  CheckCircle2,
  Clock,
  DollarSign,
  Droplets,
  Handshake,
  HeartPulse,
  MapPin,
  Package,
  Phone,
  Shield,
  Siren,
  Tent,
  Truck,
  Users,
  Waves,
  Zap,
} from 'lucide-react'
import type { KpiItem } from '@/components/dare/page-primitives'

export const riskColors = {
  critical: '#d64545',
  major: '#ea580c',
  active: '#e6a70a',
  watch: '#eab308',
  ok: '#16a34a',
  low: '#86efac',
  info: '#2563eb',
  muted: '#94a3b8',
}

/** Shared province fills for response / ops maps */
export const responseProvinceColors: Record<string, string> = {
  Harare: '#fca5a5',
  Bulawayo: '#86efac',
  Manicaland: '#d64545',
  'Mashonaland Central': '#fdba74',
  'Mashonaland East': '#ea580c',
  'Mashonaland West': '#fde047',
  Masvingo: '#ea580c',
  'Matabeleland North': '#86efac',
  'Matabeleland South': '#bbf7d0',
  Midlands: '#fdba74',
}

export const droughtProvinceColors: Record<string, string> = {
  Harare: '#86efac',
  Bulawayo: '#bbf7d0',
  Manicaland: '#d64545',
  'Mashonaland Central': '#ea580c',
  'Mashonaland East': '#e6a70a',
  'Mashonaland West': '#ea580c',
  Masvingo: '#d64545',
  'Matabeleland North': '#e6a70a',
  'Matabeleland South': '#16a34a',
  Midlands: '#ea580c',
}

export const callProvinceColors: Record<string, string> = {
  Harare: '#d64545',
  Bulawayo: '#86efac',
  Manicaland: '#ea580c',
  'Mashonaland Central': '#fdba74',
  'Mashonaland East': '#fde047',
  'Mashonaland West': '#ea580c',
  Masvingo: '#d64545',
  'Matabeleland North': '#86efac',
  'Matabeleland South': '#bbf7d0',
  Midlands: '#fdba74',
}

export const logisticsProvinceColors: Record<string, string> = {
  Harare: '#16a34a',
  Bulawayo: '#16a34a',
  Manicaland: '#ea580c',
  'Mashonaland Central': '#e6a70a',
  'Mashonaland East': '#e6a70a',
  'Mashonaland West': '#d64545',
  Masvingo: '#ea580c',
  'Matabeleland North': '#86efac',
  'Matabeleland South': '#16a34a',
  Midlands: '#ea580c',
}

export const fiveWProvinceColors: Record<string, string> = {
  Harare: '#16a34a',
  Bulawayo: '#16a34a',
  Manicaland: '#e6a70a',
  'Mashonaland Central': '#16a34a',
  'Mashonaland East': '#ea580c',
  'Mashonaland West': '#e6a70a',
  Masvingo: '#ea580c',
  'Matabeleland North': '#16a34a',
  'Matabeleland South': '#16a34a',
  Midlands: '#e6a70a',
}

export const partnerProvinceColors: Record<string, string> = {
  Harare: '#16794a',
  Bulawayo: '#22c55e',
  Manicaland: '#16a34a',
  'Mashonaland Central': '#86efac',
  'Mashonaland East': '#4ade80',
  'Mashonaland West': '#22c55e',
  Masvingo: '#16a34a',
  'Matabeleland North': '#bbf7d0',
  'Matabeleland South': '#86efac',
  Midlands: '#4ade80',
}

export const incidentMarkers = [
  { id: 'm1', position: [-19.3, 32.5] as [number, number], value: 6, color: '#d64545', label: 'Manicaland' },
  { id: 'm2', position: [-20.1, 30.8] as [number, number], value: 4, color: '#ea580c', label: 'Masvingo' },
  { id: 'm3', position: [-17.8, 31.0] as [number, number], value: 3, color: '#e6a70a', label: 'Harare' },
  { id: 'm4', position: [-18.9, 29.8] as [number, number], value: 5, color: '#ea580c', label: 'Midlands' },
  { id: 'm5', position: [-17.4, 30.2] as [number, number], value: 2, color: '#e6a70a', label: 'Mash West' },
]

export function kpi(value: string, label: string, sub: string, icon: KpiItem['icon'], color: string): KpiItem {
  return { value, label, sub, icon, color }
}

export const droughtKpis = [
  kpi('High', 'Drought Risk Level', 'Rising vs last month', AlertTriangle, riskColors.critical),
  kpi('8 / 63', 'Affected Districts', 'Priority districts', MapPin, riskColors.major),
  kpi('421,000', 'People at Risk', 'Next 3 months', Users, riskColors.info),
  kpi('2–3 mo', 'Lead Time', 'Forecast window', Clock, riskColors.active),
  kpi('Approaching', 'Trigger Status', '78% probability', Activity, riskColors.major),
  kpi('6', 'Actions Ready', 'Pre-approved AA', CheckCircle2, riskColors.ok),
  kpi('$5.00M', 'Financing Available', 'Of $6.45M required', DollarSign, riskColors.ok),
]

export const anticipatoryKpis = [
  kpi('18', 'Actions Ready', 'Ready for activation', CheckCircle2, riskColors.ok),
  kpi('7', 'Actions Active', 'Under implementation', Zap, riskColors.major),
  kpi('856,214', 'People to Benefit', 'Across AA plans', Users, '#7c3aed'),
  kpi('23', 'Targeted Districts', 'Priority areas', MapPin, riskColors.info),
  kpi('$6.45M', 'Budget Required', 'Full AA portfolio', DollarSign, riskColors.ok),
  kpi('$5.00M', 'Financing Secured', '77% funded', DollarSign, riskColors.info),
  kpi('15', 'Actions Completed', 'This season', CheckCircle2, '#0f766e'),
]

export const responseKpis = [
  kpi('23', 'Active Incidents', 'Across 7 provinces', Siren, riskColors.critical),
  kpi('856,214', 'People Affected', 'Across affected areas', Users, riskColors.info),
  kpi('421,580', 'People in Need', 'Requiring assistance', HeartPulse, riskColors.major),
  kpi('268,745', 'People Assisted', '31% of people in need', CheckCircle2, riskColors.ok),
  kpi('72,450', 'Sheltered', 'In safe shelters', Tent, '#7c3aed'),
  kpi('68%', 'Resources Deployed', 'Of response plan', Truck, riskColors.info),
  kpi('$4.25M', 'Funding Utilized', '66% of released funds', DollarSign, riskColors.ok),
]

export const emergencyKpis = [
  kpi('23', 'Active Incidents', 'Across 7 provinces', Siren, riskColors.critical),
  kpi('856,214', 'People Affected', 'Multi-hazard', Users, riskColors.info),
  kpi('421,580', 'People In Need', 'Priority caseload', HeartPulse, riskColors.major),
  kpi('268,745', 'People Assisted', '31% assisted', CheckCircle2, riskColors.ok),
  kpi('72,450', 'Sheltered', 'Safe locations', Tent, '#7c3aed'),
  kpi('$4.25M', 'Funding Utilized', '66% of released', DollarSign, riskColors.ok),
]

export const logisticsKpis = [
  kpi('2,846', 'Total Resources', 'Across all categories', Package, riskColors.info),
  kpi('68%', 'Resources Deployed', '1,934 of 2,846', Truck, riskColors.ok),
  kpi('156', 'Resource Requests', 'Open requests', AlertTriangle, riskColors.major),
  kpi('214', 'On-the-Move', 'In transit', Activity, riskColors.active),
  kpi('912', 'Available Stock', 'Ready for deployment', Package, riskColors.ok),
  kpi('$1.82M', 'Logistics Cost (YTD)', '76% of budget', DollarSign, riskColors.ok),
]

export const fiveWKpis = [
  kpi('24', 'Total Agencies', 'Active', Building2, riskColors.ok),
  kpi('42', 'Total Partners', 'Partner organisations', Handshake, riskColors.info),
  kpi('856,214', 'People Affected', 'Across affected areas', Users, riskColors.major),
  kpi('$12.6M', 'Resources Committed', 'In-kind & financial', DollarSign, riskColors.ok),
  kpi('156', 'Total Interventions', 'Ongoing / planned', Activity, riskColors.info),
  kpi('25 Aug', 'Last Update', '15:40 CAT', Clock, riskColors.muted),
]

export const partnersKpis = [
  kpi('247', 'Total Partners', '+12% vs 2025', Handshake, riskColors.ok),
  kpi('18', 'UN Agencies', '+2 vs 2025', Building2, riskColors.info),
  kpi('96', 'NGOs & CSOs', '+8%', Users, '#7c3aed'),
  kpi('28', 'Government Ministries', 'Stable', Building2, riskColors.ok),
  kpi('58', 'Private Sector', '+15%', DollarSign, riskColors.active),
  kpi('47', 'Development Partners', '+6%', Shield, riskColors.info),
]

export const callCentreKpis = [
  kpi('1,248', 'Total Calls (24h)', '+16% vs previous', Phone, riskColors.ok),
  kpi('1,203', 'Incoming Calls', '+18%', Phone, riskColors.info),
  kpi('45', 'Outgoing Calls', '+9%', Phone, '#7c3aed'),
  kpi('312', 'Incidents Reported', '+22%', Siren, riskColors.major),
  kpi('2m 48s', 'Avg. Response Time', '-35% faster', Clock, '#0f766e'),
  kpi('87%', 'Resolution Rate', '+12%', CheckCircle2, riskColors.info),
]

export const searchRescueKpis = [
  kpi('1,482', 'People Rescued', '+18%', HeartPulse, riskColors.ok),
  kpi('276', 'People Missing', '-12%', AlertTriangle, riskColors.critical),
  kpi('143', 'People Deceased', '+8%', Activity, riskColors.major),
  kpi('56', 'Operations Ongoing', '+22%', Waves, riskColors.info),
  kpi('18', 'Recovery Sites', '+6%', MapPin, riskColors.ok),
  kpi('2h 36m', 'Avg. Response Time', '-32%', Clock, '#0f766e'),
]

export const droughtIndicators = [
  ['SPI (3-month)', '-1.4', '↓', '-1.0', 'Approaching'],
  ['SPI (6-month)', '-1.8', '↓', '-1.5', 'High'],
  ['Rainfall Anomaly', '-42%', '↓', '-30%', 'High'],
  ['Soil Moisture', '28%', '↓', '35%', 'Watch'],
  ['Vegetation (NDVI)', '0.32', '↓', '0.40', 'Watch'],
  ['Reservoir Storage', '46%', '→', '40%', 'OK'],
]

export const impactForecast = [
  ['People Affected', '180K', '310K', '421K'],
  ['Livelihoods at Risk', '62K', '118K', '165K'],
  ['Livestock at Risk', '240K', '410K', '580K'],
  ['Crop Area at Risk', '85k ha', '140k ha', '210k ha'],
  ['Water Deficit', '12%', '21%', '33%'],
]

export const aaActions = [
  ['Drought', 'Water trucking', 'Approaching', 'Buhera', '42,000', 'Ready', 72],
  ['Drought', 'Fodder pre-positioning', 'Watch', 'Chiredzi', '18,500', 'Ready', 64],
  ['Flood', 'Cash assistance', 'Activated', 'Chipinge', '25,000', 'Active', 48],
  ['Cyclone', 'Shelter kits', 'Approaching', 'Chimanimani', '12,400', 'Planned', 22],
  ['Fire', 'Firebreak crews', 'Watch', 'Hwange', '8,200', 'Ready', 80],
]

export const priorityIncidents = [
  { title: 'Flooding in Buhera District', meta: 'Manicaland · Started 22 Aug', tone: 'Critical' as const },
  { title: 'Drought stress — Chiredzi', meta: 'Masvingo · Ongoing', tone: 'Major' as const },
  { title: 'Cholera cluster — Harare South', meta: 'Harare · Monitoring', tone: 'Active' as const },
  { title: 'Veldfire — Hwange Rural', meta: 'Mat. North · Contained', tone: 'Active' as const },
]

export const immediateActions = [
  { label: 'Evacuation in high-risk areas', count: 4 },
  { label: 'Emergency shelter set-up', count: 7 },
  { label: 'Water trucking deployment', count: 12 },
  { label: 'Medical team surge', count: 3 },
  { label: 'Food distribution rounds', count: 9 },
  { label: 'Road access clearance', count: 5 },
]

export const resourceBars = [
  { label: 'Personnel', value: 74, color: riskColors.ok },
  { label: 'Vehicles', value: 68, color: riskColors.info },
  { label: 'Medical kits', value: 55, color: riskColors.major },
  { label: 'Shelter items', value: 61, color: '#7c3aed' },
  { label: 'WASH supplies', value: 70, color: riskColors.ok },
  { label: 'Fuel', value: 45, color: riskColors.active },
]

export const partners = [
  'Ministry of Lands',
  'WFP',
  'UNICEF',
  'FAO',
  'Red Cross',
  'IOM',
  'WHO',
  'World Vision',
]
