import type { LucideIcon } from 'lucide-react'
import {
  LayoutGrid,
  BarChart3,
  Landmark,
  Map,
  HardHat,
  ShieldAlert,
  Leaf,
  HeartHandshake,
  HeartPulse,
  GraduationCap,
  Route,
  FileBarChart,
  Sparkles,
  Store,
  ScrollText,
  Users,
  Droplets,
  Wheat,
  Home,
} from 'lucide-react'
import type { FilterField, KpiItem, TableCell, TableColumn } from '@/components/dare/page-primitives'
import { provinces } from '@/lib/dare-data'

export type ModulePageConfig = {
  title: string
  subtitle: string
  kpis: KpiItem[]
  filters: FilterField[]
  columns: TableColumn[]
  rows: Record<string, TableCell>[]
  notes?: string[]
}

const geoFilters: FilterField[] = [
  { id: 'province', label: 'Province', type: 'select', options: provinces },
  { id: 'district', label: 'District', type: 'select', options: ['Makoni', 'Mutare', 'Gutu', 'Hwange', 'Shurugwi'] },
  { id: 'status', label: 'Status', type: 'select', options: ['Active', 'Watch', 'Critical'] },
]

function kpi(value: string, label: string, sub: string, icon: LucideIcon, color: string): KpiItem {
  return { value, label, sub, icon, color }
}

export const modulePages: Record<string, ModulePageConfig> = {
  'platform-overview': {
    title: 'Platform Overview',
    subtitle: 'Module health, coverage and national operating picture for DARE/Inkundla.',
    kpis: [
      kpi('23', 'Live modules', 'All operational', LayoutGrid, '#16794a'),
      kpi('12,458', 'Active users', '+318 this week', Users, '#2563eb'),
      kpi('99.2%', 'Uptime', 'Last 30 days', BarChart3, '#0f766e'),
      kpi('63', 'Districts covered', 'National', Map, '#7c3aed'),
      kpi('4.8m', 'Household records', 'Synced', Home, '#e6a70a'),
    ],
    filters: geoFilters,
    columns: [
      { key: 'module', label: 'Module' },
      { key: 'owner', label: 'Owner' },
      { key: 'records', label: 'Records' },
      { key: 'status', label: 'Status' },
      { key: 'updated', label: 'Last sync' },
    ],
    rows: [
      { module: 'Leaders Registry', owner: 'TLSS', records: '35,892', status: { type: 'badge', label: 'Operational', tone: 'green' }, updated: '12 min ago' },
      { module: 'Household Register', owner: 'ZimVAC / DARE/Inkundla', records: '4,832,665', status: { type: 'badge', label: 'Syncing', tone: 'info' }, updated: '4 min ago' },
      { module: 'Traditional Courts', owner: 'TLSS', records: '318,445', status: { type: 'badge', label: 'Operational', tone: 'green' }, updated: '21 min ago' },
      { module: 'Hazard Intelligence', owner: 'Civil Protection', records: '89 alerts', status: { type: 'badge', label: 'Live', tone: 'gold' }, updated: 'Live' },
    ],
    notes: [
      'National coverage is complete for all 10 provinces.',
      'Household register nightly sync is in progress for Manicaland.',
    ],
  },
  zimvac: {
    title: 'ZimVAC Dashboards',
    subtitle: 'Food security and livelihood assessment indicators, 2025.',
    kpis: [
      kpi('12.4%', 'Food insecure', '+3.2% vs 2024', Wheat, '#ea580c'),
      kpi('78%', 'FCS acceptable', 'National', BarChart3, '#16794a'),
      kpi('4.1', 'Hunger Scale', 'Low', HeartPulse, '#e6a70a'),
      kpi('6.3', 'rCSI', 'Low risk', ShieldAlert, '#2563eb'),
      kpi('5.8', 'Dietary Diversity', 'Good', Wheat, '#0f766e'),
    ],
    filters: [
      ...geoFilters,
      { id: 'indicator', label: 'Indicator', type: 'select', options: ['FCS', 'HHS', 'rCSI', 'DDS'] },
    ],
    columns: [
      { key: 'province', label: 'Province' },
      { key: 'fcs', label: 'FCS' },
      { key: 'hhs', label: 'HHS' },
      { key: 'rcsi', label: 'rCSI' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { province: 'Manicaland', fcs: '68', hhs: '1.8', rcsi: '8.2', status: { type: 'badge', label: 'Acceptable', tone: 'green' } },
      { province: 'Masvingo', fcs: '54', hhs: '2.6', rcsi: '14.1', status: { type: 'badge', label: 'Moderate', tone: 'gold' } },
      { province: 'Matabeleland North', fcs: '41', hhs: '3.4', rcsi: '19.4', status: { type: 'badge', label: 'Poor', tone: 'danger' } },
      { province: 'Midlands', fcs: '61', hhs: '2.1', rcsi: '9.6', status: { type: 'badge', label: 'Acceptable', tone: 'green' } },
      { province: 'Mashonaland West', fcs: '72', hhs: '1.4', rcsi: '6.8', status: { type: 'badge', label: 'Good', tone: 'green' } },
    ],
  },
  zimlac: {
    title: 'ZimLAC Dashboards',
    subtitle: 'Local governance and service delivery performance.',
    kpis: [
      kpi('81%', 'Overall performance', 'National', Landmark, '#c026d3'),
      kpi('84%', 'Health', 'Service delivery', HeartPulse, '#d64545'),
      kpi('79%', 'Water', 'Service delivery', Droplets, '#2563eb'),
      kpi('76%', 'Education', 'Service delivery', GraduationCap, '#c5192d'),
      kpi('82%', 'Social Protection', 'Service delivery', HeartHandshake, '#16794a'),
    ],
    filters: geoFilters,
    columns: [
      { key: 'district', label: 'District' },
      { key: 'province', label: 'Province' },
      { key: 'score', label: 'Score' },
      { key: 'satisfaction', label: 'Citizen satisfaction' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { district: 'Makoni', province: 'Manicaland', score: '78%', satisfaction: '74%', status: { type: 'badge', label: 'On track', tone: 'green' } },
      { district: 'Gutu', province: 'Masvingo', score: '71%', satisfaction: '68%', status: { type: 'badge', label: 'Watch', tone: 'gold' } },
      { district: 'Hwange', province: 'Matabeleland North', score: '64%', satisfaction: '61%', status: { type: 'badge', label: 'Below target', tone: 'danger' } },
      { district: 'Shurugwi', province: 'Midlands', score: '82%', satisfaction: '79%', status: { type: 'badge', label: 'On track', tone: 'green' } },
    ],
  },
  districts: {
    title: 'District & Provincial Profiles',
    subtitle: 'Administrative profiles from village to province.',
    kpis: [
      kpi('10', 'Provinces', 'National', Map, '#16794a'),
      kpi('63', 'Districts', 'Covered', Landmark, '#2563eb'),
      kpi('1,428', 'Wards with TL coverage', 'Traditional leaders', Users, '#e6a70a'),
      kpi('35,321', 'Villages', 'Registered', Home, '#7c3aed'),
      kpi('16.7m', 'Population', '2025 estimate', Users, '#0f766e'),
    ],
    filters: geoFilters,
    columns: [
      { key: 'name', label: 'Area' },
      { key: 'type', label: 'Level' },
      { key: 'population', label: 'Population' },
      { key: 'villages', label: 'Villages' },
      { key: 'projects', label: 'Projects' },
      { key: 'risk', label: 'Hazard risk' },
    ],
    rows: [
      { name: 'Manicaland', type: 'Province', population: '2.1m', villages: '4,821', projects: 86, risk: { type: 'badge', label: 'Moderate', tone: 'gold' } },
      { name: 'Makoni', type: 'District', population: '312,400', villages: '856', projects: 24, risk: { type: 'badge', label: 'Moderate', tone: 'gold' } },
      { name: 'Masvingo', type: 'Province', population: '1.6m', villages: '5,014', projects: 71, risk: { type: 'badge', label: 'High', tone: 'danger' } },
      { name: 'Gutu', type: 'District', population: '198,220', villages: '612', projects: 18, risk: { type: 'badge', label: 'Moderate', tone: 'gold' } },
    ],
  },
  projects: {
    title: 'Development Projects',
    subtitle: 'Investments and project tracking from village to national pipeline.',
    kpis: [
      kpi('632', 'Active projects', 'National', HardHat, '#2563eb'),
      kpi('USD 24.8B', 'Investment pipeline', 'Committed + pipeline', Store, '#7c3aed'),
      kpi('218', 'Completed (2025)', 'YTD', HardHat, '#16794a'),
      kpi('41', 'Delayed', 'Need attention', ShieldAlert, '#d64545'),
      kpi('89%', 'On-budget share', 'Active portfolio', BarChart3, '#0f766e'),
    ],
    filters: [
      ...geoFilters,
      { id: 'sector', label: 'Sector', type: 'select', options: ['WASH', 'Health', 'Education', 'Infrastructure', 'Agriculture'] },
    ],
    columns: [
      { key: 'name', label: 'Project' },
      { key: 'location', label: 'Location' },
      { key: 'sector', label: 'Sector' },
      { key: 'partner', label: 'Partner' },
      { key: 'status', label: 'Status' },
      { key: 'progress', label: 'Progress' },
    ],
    rows: [
      { name: 'Borehole Rehabilitation', location: 'Chitora, Makoni', sector: 'WASH', partner: 'UNICEF', status: { type: 'badge', label: 'In Progress', tone: 'info' }, progress: { type: 'progress', pct: 70 } },
      { name: 'Feeder Road Gravelling', location: 'Chitora, Makoni', sector: 'Infrastructure', partner: 'GoZ / World Bank', status: { type: 'badge', label: 'In Progress', tone: 'info' }, progress: { type: 'progress', pct: 45 } },
      { name: 'Clinic Solar Backup', location: 'Chitora, Makoni', sector: 'Health', partner: 'UNDP', status: { type: 'badge', label: 'Completed', tone: 'green' }, progress: { type: 'progress', pct: 100 } },
      { name: 'Irrigation Scheme Rehab', location: 'Gutu', sector: 'Agriculture', partner: 'FAO', status: { type: 'badge', label: 'Delayed', tone: 'danger' }, progress: { type: 'progress', pct: 28 } },
      { name: 'Classroom Block', location: 'Hwange', sector: 'Education', partner: 'MoPSE', status: { type: 'badge', label: 'Not Started', tone: 'muted' }, progress: { type: 'progress', pct: 8 } },
    ],
  },
  hazards: {
    title: 'Hazard & Risk Intelligence',
    subtitle: 'Multi-hazard early warning from village to national level.',
    kpis: [
      kpi('89', 'Active alerts', 'National', ShieldAlert, '#d64545'),
      kpi('7', 'High severity', 'Requires action', ShieldAlert, '#ea580c'),
      kpi('23', 'Districts on watch', 'Seasonal outlook', Map, '#e6a70a'),
      kpi('High', 'Wild fire (Chitora)', 'Jun–Aug 2025', Leaf, '#d64545'),
      kpi('Moderate', 'Drought (Makoni)', 'Current', Droplets, '#e6a70a'),
    ],
    filters: [
      ...geoFilters,
      { id: 'hazard', label: 'Hazard', type: 'select', options: ['Drought', 'Flood', 'Wild Fire', 'Storm', 'Pest'] },
    ],
    columns: [
      { key: 'alert', label: 'Alert' },
      { key: 'location', label: 'Location' },
      { key: 'type', label: 'Type' },
      { key: 'severity', label: 'Severity' },
      { key: 'updated', label: 'Updated' },
    ],
    rows: [
      { alert: 'Flood risk increases in Mutare District', location: 'Mutare', type: 'Flood', severity: { type: 'badge', label: 'High', tone: 'danger' }, updated: '2h ago' },
      { alert: 'Drought conditions worsening', location: 'Matabeleland North', type: 'Drought', severity: { type: 'badge', label: 'High', tone: 'danger' }, updated: '6h ago' },
      { alert: 'Wild fire risk — firebreaks overdue', location: 'Chitora, Makoni', type: 'Wild Fire', severity: { type: 'badge', label: 'High', tone: 'danger' }, updated: 'Today' },
      { alert: 'River levels rising', location: 'Masvingo Chiefdom', type: 'Flood', severity: { type: 'badge', label: 'Moderate', tone: 'gold' }, updated: 'Today' },
    ],
    notes: ['Seasonal outlook Jun–Aug 2025: drought Moderate, flood Low, food insecurity Moderate, disease outbreak Low.'],
  },
  environment: {
    title: 'Environment & Climate',
    subtitle: 'Natural resources, land use and climate resilience.',
    kpis: [
      kpi('74%', 'Climate resilience', 'Chitora score', Leaf, '#16a34a'),
      kpi('3,245 Ha', 'Village area', 'Chitora', Map, '#16794a'),
      kpi('42%', 'Electricity coverage', 'Rural average', Route, '#e6a70a'),
      kpi('1,120 Ha', 'Cultivated land', 'Current season', Wheat, '#2563eb'),
      kpi('Moderate', 'Pest risk', 'Seasonal', ShieldAlert, '#ea580c'),
    ],
    filters: geoFilters,
    columns: [
      { key: 'indicator', label: 'Indicator' },
      { key: 'value', label: 'Value' },
      { key: 'area', label: 'Area' },
      { key: 'trend', label: 'Trend' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { indicator: 'Forest cover', value: '18%', area: 'Makoni', trend: '-1.2%', status: { type: 'badge', label: 'Declining', tone: 'gold' } },
      { indicator: 'Protected wells', value: '11', area: 'Chitora', trend: '+2', status: { type: 'badge', label: 'Stable', tone: 'green' } },
      { indicator: 'Irrigated land', value: '46 Ha', area: 'Chitora', trend: '+8 Ha', status: { type: 'badge', label: 'Improving', tone: 'green' } },
      { indicator: 'Waste management', value: 'Basic', area: 'Chitora', trend: '—', status: { type: 'badge', label: 'Watch', tone: 'gold' } },
    ],
  },
  'social-protection': {
    title: 'Social Protection',
    subtitle: 'BEAM, HCT, food aid and other safety-net coverage.',
    kpis: [
      kpi('214', 'Vulnerable HHs', 'Chitora · 25%', HeartHandshake, '#ea580c'),
      kpi('132', 'Female headed', '15.4%', Users, '#7c3aed'),
      kpi('18', 'Child headed', '2.1%', Users, '#d64545'),
      kpi('146', 'PWD households', '17.1%', HeartPulse, '#0f766e'),
      kpi('82%', 'ZimLAC SP score', 'National', Landmark, '#16794a'),
    ],
    filters: [
      ...geoFilters,
      { id: 'programme', label: 'Programme', type: 'select', options: ['BEAM', 'HCT', 'Food Aid', 'Disability Grant'] },
    ],
    columns: [
      { key: 'hh', label: 'Household' },
      { key: 'village', label: 'Village' },
      { key: 'programme', label: 'Programme' },
      { key: 'vulnerability', label: 'Vulnerability' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { hh: 'Maureen Moyo', village: 'Chitora', programme: 'BEAM, HCT', vulnerability: { type: 'badge', label: 'High', tone: 'danger' }, status: { type: 'badge', label: 'Active', tone: 'green' } },
      { hh: 'Chipo Dube', village: 'Chitora', programme: 'BEAM, Food Aid', vulnerability: { type: 'badge', label: 'High', tone: 'danger' }, status: { type: 'badge', label: 'Active', tone: 'green' } },
      { hh: 'Blessing Chikomba', village: 'Chitora', programme: 'Food Aid', vulnerability: { type: 'badge', label: 'Medium', tone: 'gold' }, status: { type: 'badge', label: 'Review', tone: 'gold' } },
      { hh: 'Rutendo Nyoni', village: 'Chitora', programme: 'HCT', vulnerability: { type: 'badge', label: 'Medium', tone: 'gold' }, status: { type: 'badge', label: 'Active', tone: 'green' } },
    ],
  },
  health: {
    title: 'Health',
    subtitle: 'Facility status, coverage and key health indicators.',
    kpis: [
      kpi('1', 'Clinics (Chitora)', 'Operational', HeartPulse, '#16794a'),
      kpi('84%', 'ZimLAC health score', 'National', Landmark, '#d64545'),
      kpi('10.2%', 'Child malnutrition', '+1.2% vs 2024', HeartPulse, '#7c3aed'),
      kpi('14.1%', 'HIV prevalence', '+0.8% vs 2024', HeartHandshake, '#d64545'),
      kpi('76%', 'Village health score', 'Chitora', BarChart3, '#2563eb'),
    ],
    filters: geoFilters,
    columns: [
      { key: 'facility', label: 'Facility' },
      { key: 'location', label: 'Location' },
      { key: 'type', label: 'Type' },
      { key: 'staff', label: 'Staff' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { facility: 'Chitora Clinic', location: 'Chitora Village', type: 'Clinic', staff: '6', status: { type: 'badge', label: 'Operational', tone: 'green' } },
      { facility: 'Makoni District Hospital', location: 'Rusape', type: 'Hospital', staff: '148', status: { type: 'badge', label: 'Operational', tone: 'green' } },
      { facility: 'Mabhena Clinic', location: 'Gutu', type: 'Clinic', staff: '4', status: { type: 'badge', label: 'Stock-out watch', tone: 'gold' } },
    ],
    notes: ['Vaccination campaign announced for Chitora Ward 12 — see community announcements.'],
  },
  education: {
    title: 'Education',
    subtitle: 'School operations, attendance and out-of-school children.',
    kpis: [
      kpi('4', 'Schools (Chitora)', 'All operational', GraduationCap, '#c5192d'),
      kpi('86%', 'Attendance', 'Village snapshot', Users, '#16794a'),
      kpi('7.8%', 'Out-of-school', '+1.2% vs 2024', GraduationCap, '#d64545'),
      kpi('76%', 'ZimLAC education', 'National', Landmark, '#2563eb'),
      kpi('81%', 'Village education score', 'Chitora', BarChart3, '#0f766e'),
    ],
    filters: geoFilters,
    columns: [
      { key: 'school', label: 'School' },
      { key: 'level', label: 'Level' },
      { key: 'enrolment', label: 'Enrolment' },
      { key: 'teachers', label: 'Teachers' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { school: 'Chitora Primary', level: 'Primary', enrolment: 412, teachers: 14, status: { type: 'badge', label: 'Operational', tone: 'green' } },
      { school: 'Chimwewe Secondary', level: 'Secondary', enrolment: 286, teachers: 11, status: { type: 'badge', label: 'Operational', tone: 'green' } },
      { school: 'Mabhena Primary', level: 'Primary', enrolment: 198, teachers: 8, status: { type: 'badge', label: 'Teacher gap', tone: 'gold' } },
    ],
  },
  infrastructure: {
    title: 'Infrastructure & Services',
    subtitle: 'Roads, water, energy, connectivity and community assets.',
    kpis: [
      kpi('23', 'Boreholes', '20 functional', Droplets, '#0f766e'),
      kpi('18.6 km', 'Village roads', '12.4 km passable', Route, '#2563eb'),
      kpi('42%', 'Electricity coverage', 'Rural', Route, '#e6a70a'),
      kpi('Good', 'Mobile network', 'Chitora', BarChart3, '#16794a'),
      kpi('68%', 'Latrine coverage', 'WASH', Droplets, '#7c3aed'),
    ],
    filters: geoFilters,
    columns: [
      { key: 'asset', label: 'Asset' },
      { key: 'location', label: 'Location' },
      { key: 'condition', label: 'Condition' },
      { key: 'coverage', label: 'Coverage' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { asset: 'Boreholes', location: 'Chitora', condition: '20 / 23 functional', coverage: '88%', status: { type: 'badge', label: 'Watch', tone: 'gold' } },
      { asset: 'Feeder roads', location: 'Chitora', condition: '12.4 km passable', coverage: '67%', status: { type: 'badge', label: 'In repair', tone: 'info' } },
      { asset: 'Community hall', location: 'Chitora', condition: 'Good', coverage: '1 facility', status: { type: 'badge', label: 'Operational', tone: 'green' } },
      { asset: 'Dip tanks', location: 'Mabhena', condition: '100%', coverage: 'Complete', status: { type: 'badge', label: 'Operational', tone: 'green' } },
    ],
  },
  reports: {
    title: 'Reports & Analytics',
    subtitle: 'Custom reports, dashboards and downloadable briefs.',
    kpis: [
      kpi('48', 'Published reports', '2025 YTD', FileBarChart, '#4f46e5'),
      kpi('12', 'Scheduled', 'This month', FileBarChart, '#2563eb'),
      kpi('92%', 'Data quality', 'Verified', BarChart3, '#16794a'),
      kpi('6', 'Pending approvals', 'District level', FileBarChart, '#e6a70a'),
    ],
    filters: [
      { id: 'q', label: 'Search', placeholder: 'Report name' },
      { id: 'type', label: 'Type', type: 'select', options: ['Village profile', 'ZimVAC brief', 'Court performance', 'Hazard outlook'] },
      { id: 'year', label: 'Year', type: 'select', options: ['2025', '2024'] },
    ],
    columns: [
      { key: 'name', label: 'Report' },
      { key: 'type', label: 'Type' },
      { key: 'area', label: 'Coverage' },
      { key: 'updated', label: 'Updated' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { name: 'Village Development Plan', type: 'Village profile', area: 'Chitora', updated: '21 May 2025', status: { type: 'badge', label: 'Verified', tone: 'green' } },
      { name: 'ZimVAC District Brief', type: 'ZimVAC brief', area: 'Makoni', updated: '18 May 2025', status: { type: 'badge', label: 'Published', tone: 'green' } },
      { name: 'IKS National Digest 2025', type: 'Indigenous Knowledge Systems', area: 'National', updated: '27 May 2025', status: { type: 'badge', label: 'Published', tone: 'green' } },
      { name: 'Traditional Court Q1', type: 'Court performance', area: 'National', updated: '02 Apr 2025', status: { type: 'badge', label: 'Published', tone: 'green' } },
      { name: 'Hazard Map', type: 'Hazard outlook', area: 'Chitora', updated: '21 May 2025', status: { type: 'badge', label: 'Draft', tone: 'gold' } },
    ],
  },
  'ai-insights': {
    title: 'AI Insights & Alerts',
    subtitle: 'Automated recommendations, clustering and early warning.',
    kpis: [
      kpi('14', 'Open insights', 'Actionable', Sparkles, '#7c3aed'),
      kpi('5', 'High priority', 'This week', ShieldAlert, '#d64545'),
      kpi('96%', 'Model confidence', 'Succession analysis', BarChart3, '#16794a'),
      kpi('87', 'HH cluster flagged', 'Northern Chitora', Users, '#ea580c'),
    ],
    filters: [
      { id: 'q', label: 'Search', placeholder: 'Insight' },
      { id: 'priority', label: 'Priority', type: 'select', options: ['High', 'Medium', 'Low'] },
      { id: 'module', label: 'Module', type: 'select', options: ['Households', 'Hazards', 'Leaders', 'Projects'] },
    ],
    columns: [
      { key: 'insight', label: 'Insight' },
      { key: 'module', label: 'Module' },
      { key: 'priority', label: 'Priority' },
      { key: 'confidence', label: 'Confidence' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { insight: '87 vulnerable households clustered in northern Chitora', module: 'Households', priority: { type: 'badge', label: 'High', tone: 'danger' }, confidence: '91%', status: { type: 'badge', label: 'Open', tone: 'gold' } },
      { insight: 'Borehole coverage below district average', module: 'Infrastructure', priority: { type: 'badge', label: 'High', tone: 'danger' }, confidence: '88%', status: { type: 'badge', label: 'Open', tone: 'gold' } },
      { insight: 'Succession window 2–5 years for VH Bvepfepfe Onias', module: 'Leaders', priority: { type: 'badge', label: 'Medium', tone: 'gold' }, confidence: '96%', status: { type: 'badge', label: 'Tracked', tone: 'info' } },
      { insight: 'Nutrition intervention required in 8 districts', module: 'ZimVAC', priority: { type: 'badge', label: 'High', tone: 'danger' }, confidence: '84%', status: { type: 'badge', label: 'Open', tone: 'gold' } },
    ],
  },
  marketplace: {
    title: 'Data Marketplace',
    subtitle: 'API and data products for partners, ministries and researchers.',
    kpis: [
      kpi('18', 'Published datasets', 'Open + licensed', Store, '#7c3aed'),
      kpi('42', 'API consumers', 'Active keys', Users, '#2563eb'),
      kpi('1.2m', 'API calls', 'Last 30 days', BarChart3, '#16794a'),
      kpi('ISO 27001', 'Alignment', 'Secure access', ShieldAlert, '#0f766e'),
    ],
    filters: [
      { id: 'q', label: 'Search', placeholder: 'Dataset or API' },
      { id: 'access', label: 'Access', type: 'select', options: ['Open', 'Licensed', 'Restricted'] },
    ],
    columns: [
      { key: 'product', label: 'Product' },
      { key: 'owner', label: 'Owner' },
      { key: 'format', label: 'Format' },
      { key: 'access', label: 'Access' },
      { key: 'updated', label: 'Updated' },
    ],
    rows: [
      { product: 'Village boundaries (simplified)', owner: 'MLGPW', format: 'GeoJSON', access: { type: 'badge', label: 'Licensed', tone: 'info' }, updated: 'May 2025' },
      { product: 'ZimVAC district indicators', owner: 'ZimVAC', format: 'CSV / API', access: { type: 'badge', label: 'Open', tone: 'green' }, updated: 'May 2025' },
      { product: 'Traditional courts aggregates', owner: 'TLSS', format: 'API', access: { type: 'badge', label: 'Restricted', tone: 'gold' }, updated: 'Apr 2025' },
      { product: 'Hazard alerts feed', owner: 'Civil Protection', format: 'API', access: { type: 'badge', label: 'Licensed', tone: 'info' }, updated: 'Live' },
    ],
  },
  'governance-insights': {
    title: 'Governance Insights',
    subtitle: 'Traditional authority performance, engagement and compliance.',
    kpis: [
      kpi('92%', 'Governance score', 'Chitora', Landmark, '#16794a'),
      kpi('93.5%', 'Court clearance', 'National', ScrollText, '#2563eb'),
      kpi('4', 'Consultations', 'Chief Masvingo YTD', Users, '#7c3aed'),
      kpi('37', 'Open community issues', 'Chiefdom', ShieldAlert, '#e6a70a'),
      kpi('89%', 'Mediation success', 'Village courts', BarChart3, '#0f766e'),
    ],
    filters: geoFilters,
    columns: [
      { key: 'insight', label: 'Insight' },
      { key: 'area', label: 'Area' },
      { key: 'metric', label: 'Metric' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { insight: 'Citizen satisfaction below service delivery score', area: 'Gutu', metric: '68% vs 71%', status: { type: 'badge', label: 'Watch', tone: 'gold' } },
      { insight: 'Court clearance remains above 90%', area: 'National', metric: '93.5%', status: { type: 'badge', label: 'On track', tone: 'green' } },
      { insight: 'Open issues concentrated in water and roads', area: 'Masvingo Chiefdom', metric: '37 open', status: { type: 'badge', label: 'Action', tone: 'danger' } },
    ],
  },
}
