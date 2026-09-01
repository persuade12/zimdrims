import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Bell,
  ShieldAlert,
  Target,
  Activity,
  Zap,
  Siren,
  Radio,
  Truck,
  Tent,
  Building2,
  Handshake,
  Globe2,
  TrendingDown,
  RefreshCw,
  Shield,
  FileBarChart,
  BarChart3,
  BookOpen,
  FileText,
  Users,
  Database,
  Settings,
  CloudRain,
  Wind,
  Waves,
  Sun,
  Flame,
  HeartPulse,
  Pickaxe,
  Car,
  Droplets,
  Map,
  AlertTriangle,
} from 'lucide-react'
import type { FilterField, KpiItem, TableCell, TableColumn } from '@/components/dare/page-primitives'
import { provinces } from '@/lib/zimdrims-data'

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
  { id: 'district', label: 'District', type: 'select', options: ['Makoni', 'Mutare', 'Chinhoyi', 'Gutu', 'Hwange', 'Shurugwi'] },
  { id: 'level', label: 'Alert Level', type: 'select', options: ['Critical', 'Warning', 'Watch', 'Advisory', 'All Clear'] },
]

function kpi(value: string, label: string, sub: string, icon: LucideIcon, color: string): KpiItem {
  return { value, label, sub, icon, color }
}

function hazardModule(
  title: string,
  hazard: string,
  alerts: number,
  atRisk: string,
): ModulePageConfig {
  return {
    title: `${title} Early Warning Dashboard`,
    subtitle: `Multi-hazard early warning and monitoring for ${hazard} — Department of Civil Protection.`,
    kpis: [
      kpi(String(alerts).padStart(2, '0'), 'Active alerts', hazard, Bell, '#d64545'),
      kpi(atRisk, 'People at risk', 'Across affected areas', Users, '#ea580c'),
      kpi('87%', 'National readiness', `${hazard} preparedness`, Shield, '#16794a'),
      kpi('26', 'Data sources', 'Active feeds', Database, '#2563eb'),
      kpi('5 mins', 'Last update', 'Near real-time', Activity, '#0f766e'),
    ],
    filters: geoFilters,
    columns: [
      { key: 'alert', label: 'Alert' },
      { key: 'location', label: 'Location' },
      { key: 'level', label: 'Level' },
      { key: 'impact', label: 'Time to impact' },
      { key: 'updated', label: 'Updated' },
    ],
    rows: [
      {
        alert: `${hazard} Warning — Save River Basin`,
        location: 'Mashonaland West',
        level: { type: 'badge', label: 'Critical', tone: 'danger' },
        impact: '24–48 hrs',
        updated: '2h ago',
      },
      {
        alert: `${hazard} Watch — Mutare District`,
        location: 'Manicaland',
        level: { type: 'badge', label: 'Warning', tone: 'gold' },
        impact: '12–24 hrs',
        updated: '4h ago',
      },
      {
        alert: `${hazard} Advisory — Midlands`,
        location: 'Shurugwi',
        level: { type: 'badge', label: 'Advisory', tone: 'info' },
        impact: '72 hrs',
        updated: 'Today',
      },
    ],
    notes: [`Integrated feeds from Met Services, ZINWA, DCP field teams and partner agencies for ${hazard.toLowerCase()} monitoring.`],
  }
}

export const modulePages: Record<string, ModulePageConfig> = {
  'national-cop': {
    title: 'National Common Operating Picture',
    subtitle: 'Unified situational awareness for the National DCP Emergency Operations Centre.',
    kpis: [
      kpi('14', 'Active alerts', 'Nationwide', Bell, '#d64545'),
      kpi('312,450', 'People at risk', '9 districts', Users, '#ea580c'),
      kpi('OPERATIONAL', 'EOC status', 'National DCP EOC', Siren, '#16794a'),
      kpi('26', 'Data sources', 'Live feeds', Database, '#2563eb'),
      kpi('99.8%', 'System uptime', 'Last 30 days', Activity, '#0f766e'),
    ],
    filters: geoFilters,
    columns: [
      { key: 'sector', label: 'Sector' },
      { key: 'status', label: 'Status' },
      { key: 'lead', label: 'Lead agency' },
      { key: 'updated', label: 'Updated' },
    ],
    rows: [
      { sector: 'Early Warning', status: { type: 'badge', label: 'Elevated', tone: 'gold' }, lead: 'Met Services / DCP', updated: '5 mins ago' },
      { sector: 'Hydrology', status: { type: 'badge', label: 'High', tone: 'danger' }, lead: 'ZINWA / DCP', updated: '8 mins ago' },
      { sector: 'Health', status: { type: 'badge', label: 'Watch', tone: 'gold' }, lead: 'MoHCC / DCP', updated: '12 mins ago' },
      { sector: 'Logistics', status: { type: 'badge', label: 'Standby', tone: 'green' }, lead: 'DCP Logistics', updated: '20 mins ago' },
    ],
  },
  'early-warning': {
    title: 'Early Warning Centre',
    subtitle: 'National multi-hazard early warning overview and alert coordination.',
    kpis: [
      kpi('14', 'Total alerts', 'All hazards', Bell, '#d64545'),
      kpi('02', 'Critical', 'Immediate action', ShieldAlert, '#d64545'),
      kpi('03', 'Warning', 'Take action', AlertTriangle, '#ea580c'),
      kpi('04', 'Watch', 'Be prepared', Activity, '#e6a70a'),
      kpi('05', 'Advisory', 'Stay informed', FileText, '#2563eb'),
    ],
    filters: geoFilters,
    columns: [
      { key: 'hazard', label: 'Hazard' },
      { key: 'location', label: 'Location' },
      { key: 'level', label: 'Level' },
      { key: 'lead', label: 'Lead' },
      { key: 'updated', label: 'Updated' },
    ],
    rows: [
      { hazard: 'Flood', location: 'Save River · Chinhoyi', level: { type: 'badge', label: 'Critical', tone: 'danger' }, lead: 'ZINWA', updated: '2h ago' },
      { hazard: 'Severe Weather', location: 'Mutare District', level: { type: 'badge', label: 'Warning', tone: 'gold' }, lead: 'Met Services', updated: '4h ago' },
      { hazard: 'Drought', location: 'Matabeleland North', level: { type: 'badge', label: 'Watch', tone: 'gold' }, lead: 'DCP / FEWSNET', updated: '6h ago' },
      { hazard: 'Wildfire', location: 'Shurugwi', level: { type: 'badge', label: 'Advisory', tone: 'info' }, lead: 'Forestry / DCP', updated: 'Today' },
    ],
  },
  'early-warning/all-hazards': hazardModule('All Hazards', 'Multi-hazard', 14, '312,450'),
  'early-warning/weather': hazardModule('Weather', 'Weather', 3, '312,450'),
  'early-warning/hydrology': hazardModule('Hydrology', 'Hydrology', 4, '185,760'),
  'early-warning/cyclone': hazardModule('Cyclone', 'Cyclone', 1, '48,200'),
  'early-warning/flood': hazardModule('Flood', 'Flood', 4, '185,760'),
  'early-warning/drought': hazardModule('Drought', 'Drought', 2, '920,000'),
  'early-warning/fire': hazardModule('Fire', 'Wildfire', 2, '12,400'),
  'early-warning/health': hazardModule('Health', 'Health', 2, '86,500'),
  'early-warning/mining': hazardModule('Mining', 'Mining', 1, '3,200'),
  'early-warning/road-traffic': hazardModule('Road Traffic', 'Road Safety', 3, '18,900'),
  'risk-intelligence': {
    title: 'Risk Intelligence',
    subtitle: 'Composite hazard, vulnerability and exposure intelligence for decision support.',
    kpis: [
      kpi('74', 'Risk index', 'National composite', ShieldAlert, '#d64545'),
      kpi('312,450', 'People at risk', 'Multi-hazard', Users, '#ea580c'),
      kpi('16', 'Districts on watch', 'Elevated risk', Map, '#e6a70a'),
      kpi('28', 'Data sources', 'Integrated', Database, '#2563eb'),
      kpi('92%', 'Data quality', 'Verified layers', BarChart3, '#16794a'),
    ],
    filters: geoFilters,
    columns: [
      { key: 'province', label: 'Province' },
      { key: 'index', label: 'Risk index' },
      { key: 'trend', label: 'Trend' },
      { key: 'level', label: 'Level' },
    ],
    rows: [
      { province: 'Manicaland', index: '74', trend: '↑', level: { type: 'badge', label: 'High', tone: 'danger' } },
      { province: 'Mashonaland West', index: '81', trend: '↑', level: { type: 'badge', label: 'High', tone: 'danger' } },
      { province: 'Masvingo', index: '68', trend: '→', level: { type: 'badge', label: 'Moderate', tone: 'gold' } },
      { province: 'Bulawayo', index: '42', trend: '↓', level: { type: 'badge', label: 'Low', tone: 'green' } },
    ],
  },
  'risk-intelligence/risk-dashboard': {
    title: 'Risk Intelligence Dashboard',
    subtitle: 'Composite risk metrics, trends and provincial risk profiles.',
    kpis: [
      kpi('74', 'Overall risk index', 'High · +3 vs last month', AlertTriangle, '#d64545'),
      kpi('312,450', 'People at risk', 'Across 9 districts', Users, '#ea580c'),
      kpi('16', 'Districts on watch', 'Multi-hazard', Map, '#e6a70a'),
      kpi('28', 'Active data sources', 'Integrated feeds', Database, '#2563eb'),
      kpi('92%', 'Data quality', 'Verified', BarChart3, '#16794a'),
    ],
    filters: geoFilters,
    columns: [
      { key: 'indicator', label: 'Indicator' },
      { key: 'value', label: 'Value' },
      { key: 'trend', label: 'Trend' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { indicator: 'Hazard composite', value: 'High', trend: '↑', status: { type: 'badge', label: 'Elevated', tone: 'danger' } },
      { indicator: 'Vulnerability index', value: 'Moderate', trend: '→', status: { type: 'badge', label: 'Stable', tone: 'gold' } },
      { indicator: 'Exposure (population)', value: '312,450', trend: '↑', status: { type: 'badge', label: 'Rising', tone: 'gold' } },
      { indicator: 'Infrastructure at risk', value: '428 assets', trend: '↑', status: { type: 'badge', label: 'Watch', tone: 'gold' } },
    ],
    notes: ['Scenario snapshot: El Niño 2026/27 — elevated drought and food insecurity risk in southern provinces.'],
  },
  'risk-intelligence/risk-map': {
    title: 'Risk Map',
    subtitle: 'Geospatial composite risk, hazard layers and provincial risk profiles.',
    kpis: [
      kpi('74', 'Manicaland risk', 'Province profile', Map, '#d64545'),
      kpi('41%', 'Vulnerable pop.', 'Manicaland', Users, '#ea580c'),
      kpi('84', 'Health facilities', '28% at risk', Building2, '#2563eb'),
      kpi('2030', 'Scenario', 'Medium risk projection', Target, '#7c3aed'),
    ],
    filters: [
      ...geoFilters,
      { id: 'scenario', label: 'Scenario', type: 'select', options: ['2025 Baseline', '2030 Medium Risk', '2050 High Risk'] },
    ],
    columns: [
      { key: 'location', label: 'Hotspot' },
      { key: 'hazard', label: 'Hazard' },
      { key: 'population', label: 'Population' },
      { key: 'risk', label: 'Risk level' },
    ],
    rows: [
      { location: 'Save River Basin', hazard: 'Flood', population: '48,200', risk: { type: 'badge', label: 'Very High', tone: 'danger' } },
      { location: 'Mutare District', hazard: 'Severe Weather', population: '312,450', risk: { type: 'badge', label: 'High', tone: 'danger' } },
      { location: 'Shurugwi', hazard: 'Wildfire', population: '12,400', risk: { type: 'badge', label: 'Moderate', tone: 'gold' } },
      { location: 'Gutu', hazard: 'Health', population: '86,500', risk: { type: 'badge', label: 'Moderate', tone: 'gold' } },
    ],
  },
  'impact-intelligence': {
    title: 'Impact Intelligence',
    subtitle: 'Assess population, infrastructure and livelihood impacts from active and forecast hazards.',
    kpis: [
      kpi('312,450', 'People affected', 'Current outlook', Users, '#d64545'),
      kpi('428', 'Assets at risk', 'Critical infrastructure', Building2, '#ea580c'),
      kpi('9', 'Districts impacted', 'Multi-sector', Map, '#e6a70a'),
      kpi('USD 12.4M', 'Estimated loss', 'Preliminary', TrendingDown, '#2563eb'),
    ],
    filters: geoFilters,
    columns: [
      { key: 'sector', label: 'Sector' },
      { key: 'impact', label: 'Impact' },
      { key: 'location', label: 'Location' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { sector: 'Shelter', impact: '1,240 HHs at risk', location: 'Save Basin', status: { type: 'badge', label: 'High', tone: 'danger' } },
      { sector: 'Health', impact: '3 facilities isolated', location: 'Manicaland', status: { type: 'badge', label: 'Moderate', tone: 'gold' } },
      { sector: 'Agriculture', impact: '12,400 Ha affected', location: 'Masvingo', status: { type: 'badge', label: 'Moderate', tone: 'gold' } },
      { sector: 'Roads', impact: '2 bridges on watch', location: 'Midlands', status: { type: 'badge', label: 'Watch', tone: 'gold' } },
    ],
  },
  'trigger-monitor': {
    title: 'Trigger Monitor',
    subtitle: 'Anticipatory trigger thresholds and status across hazard types.',
    kpis: [
      kpi('3', 'Triggered', 'Immediate action', Zap, '#d64545'),
      kpi('2', 'Approaching', 'Pre-position resources', Activity, '#ea580c'),
      kpi('5', 'Not triggered', 'Monitoring', Shield, '#16794a'),
    ],
    filters: geoFilters,
    columns: [
      { key: 'trigger', label: 'Trigger' },
      { key: 'threshold', label: 'Threshold' },
      { key: 'current', label: 'Current' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { trigger: 'Rainfall (72h)', threshold: '100 mm', current: '112 mm', status: { type: 'badge', label: 'Triggered', tone: 'danger' } },
      { trigger: 'River level', threshold: '4.5 m', current: '4.8 m', status: { type: 'badge', label: 'Triggered', tone: 'danger' } },
      { trigger: 'Wind gusts', threshold: '80 km/h', current: '72 km/h', status: { type: 'badge', label: 'Approaching', tone: 'gold' } },
      { trigger: 'Soil moisture', threshold: 'Critical low', current: 'Moderate', status: { type: 'badge', label: 'Not triggered', tone: 'green' } },
    ],
  },
  'anticipatory-action': {
    title: 'Anticipatory Action',
    subtitle: 'Pre-arranged financing and early actions before hazard impacts materialize.',
    kpis: [
      kpi('4', 'Active plans', 'Funded actions', Zap, '#16794a'),
      kpi('USD 2.1M', 'Pre-positioned', 'Relief supplies', Truck, '#2563eb'),
      kpi('18,400', 'People covered', 'Anticipatory reach', Users, '#ea580c'),
    ],
    filters: geoFilters,
    columns: [
      { key: 'action', label: 'Action' },
      { key: 'hazard', label: 'Hazard' },
      { key: 'district', label: 'District' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { action: 'Pre-position WASH kits', hazard: 'Flood', district: 'Makonde', status: { type: 'badge', label: 'Approved', tone: 'green' } },
      { action: 'Cash transfer readiness', hazard: 'Drought', district: 'Hwange', status: { type: 'badge', label: 'Standby', tone: 'gold' } },
      { action: 'Evacuation route briefing', hazard: 'Cyclone', district: 'Chimanimani', status: { type: 'badge', label: 'In progress', tone: 'info' } },
    ],
  },
  'emergency-operations': {
    title: 'Emergency Operations',
    subtitle: 'National and provincial emergency operations coordination.',
    kpis: [
      kpi('OPERATIONAL', 'National EOC', 'Active', Siren, '#16794a'),
      kpi('4', 'Provincial EOCs', 'Activated', Radio, '#2563eb'),
      kpi('12', 'Open incidents', 'Under management', ShieldAlert, '#d64545'),
    ],
    filters: geoFilters,
    columns: [
      { key: 'incident', label: 'Incident' },
      { key: 'location', label: 'Location' },
      { key: 'lead', label: 'Lead' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { incident: 'Save River flooding', location: 'Mashonaland West', lead: 'DCP / ZINWA', status: { type: 'badge', label: 'Active', tone: 'danger' } },
      { incident: 'Severe weather response', location: 'Manicaland', lead: 'DCP / Met', status: { type: 'badge', label: 'Active', tone: 'gold' } },
      { incident: 'Cholera monitoring', location: 'Masvingo', lead: 'MoHCC / DCP', status: { type: 'badge', label: 'Monitoring', tone: 'info' } },
    ],
  },
  'incident-command': {
    title: 'Incident Command',
    subtitle: 'Incident command structures, roles and operational timelines.',
    kpis: [kpi('3', 'Active ICS', 'Incident commands', Radio, '#2563eb'), kpi('24', 'Assigned teams', 'Field & EOC', Users, '#16794a')],
    filters: geoFilters,
    columns: [
      { key: 'incident', label: 'Incident' },
      { key: 'commander', label: 'IC' },
      { key: 'phase', label: 'Phase' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { incident: 'Save River flood', commander: 'DCP West', phase: 'Response', status: { type: 'badge', label: 'Active', tone: 'danger' } },
      { incident: 'Mutare storms', commander: 'DCP Manicaland', phase: 'Response', status: { type: 'badge', label: 'Active', tone: 'gold' } },
    ],
  },
  'logistics-resources': {
    title: 'Logistics & Resources',
    subtitle: 'Relief stock, transport assets and resource tracking.',
    kpis: [
      kpi('12', 'Warehouses', 'National network', Truck, '#2563eb'),
      kpi('86%', 'Stock availability', 'Core relief items', Shield, '#16794a'),
      kpi('24', 'Vehicles deployed', 'Last 72 hours', Truck, '#ea580c'),
    ],
    filters: geoFilters,
    columns: [
      { key: 'item', label: 'Resource' },
      { key: 'location', label: 'Location' },
      { key: 'qty', label: 'Quantity' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { item: 'Family tents', location: 'Harare central store', qty: '420', status: { type: 'badge', label: 'Available', tone: 'green' } },
      { item: 'Water purification', location: 'Bulawayo hub', qty: '12,000 units', status: { type: 'badge', label: 'Available', tone: 'green' } },
      { item: 'Trucks (6x6)', location: 'National pool', qty: '8 deployed', status: { type: 'badge', label: 'In use', tone: 'info' } },
    ],
  },
  'shelters-evacuation': {
    title: 'Shelters & Evacuation',
    subtitle: 'Evacuation centres, shelter capacity and population movement.',
    kpis: [
      kpi('48', 'Evacuation centres', 'Standby capacity', Tent, '#2563eb'),
      kpi('12,400', 'Shelter spaces', 'Available now', Users, '#16794a'),
      kpi('860', 'Evacuated', 'Current incidents', Siren, '#ea580c'),
    ],
    filters: geoFilters,
    columns: [
      { key: 'centre', label: 'Centre' },
      { key: 'district', label: 'District' },
      { key: 'capacity', label: 'Capacity' },
      { key: 'occupancy', label: 'Occupancy' },
    ],
    rows: [
      { centre: 'Chinhoyi Hall', district: 'Makonde', capacity: '600', occupancy: '420' },
      { centre: 'Mutare Polytechnic', district: 'Mutare', capacity: '1,200', occupancy: '440' },
      { centre: 'Gutu Community Centre', district: 'Gutu', capacity: '350', occupancy: '0' },
    ],
  },
  'government-coordination': {
    title: 'Government Coordination',
    subtitle: 'Inter-ministerial coordination and government response alignment.',
    kpis: [kpi('8', 'Ministries engaged', 'Active coordination', Building2, '#16794a'), kpi('3', 'Cabinet briefings', 'This month', FileBarChart, '#2563eb')],
    filters: geoFilters,
    columns: [
      { key: 'ministry', label: 'Ministry' },
      { key: 'role', label: 'Role' },
      { key: 'contact', label: 'Focal point' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { ministry: 'Local Government & Public Works', role: 'Lead · DCP', contact: 'DCP EOC', status: { type: 'badge', label: 'Active', tone: 'green' } },
      { ministry: 'Health & Child Care', role: 'Health cluster', contact: 'MoHCC EOC', status: { type: 'badge', label: 'Active', tone: 'green' } },
      { ministry: 'Transport', role: 'Road access', contact: 'MoT Ops', status: { type: 'badge', label: 'Standby', tone: 'gold' } },
    ],
  },
  'partner-coordination': {
    title: 'Partner Coordination',
    subtitle: 'UN, NGO and development partner coordination for disaster response.',
    kpis: [kpi('24', 'Partners active', 'Response network', Handshake, '#16794a'), kpi('6', 'Clusters open', 'Sector coordination', Users, '#2563eb')],
    filters: geoFilters,
    columns: [
      { key: 'partner', label: 'Partner' },
      { key: 'sector', label: 'Sector' },
      { key: 'coverage', label: 'Coverage' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { partner: 'WFP', sector: 'Food security', coverage: 'National', status: { type: 'badge', label: 'Active', tone: 'green' } },
      { partner: 'UNICEF', sector: 'WASH / Nutrition', coverage: '8 districts', status: { type: 'badge', label: 'Active', tone: 'green' } },
      { partner: 'Red Cross', sector: 'Shelter / DRR', coverage: 'Manicaland', status: { type: 'badge', label: 'Standby', tone: 'gold' } },
    ],
  },
  'sadc-coordination': {
    title: 'SADC Regional Coordination',
    subtitle: 'Regional early warning, mutual aid and cross-border hazard coordination.',
    kpis: [kpi('4', 'Regional alerts', 'SADC shared', Globe2, '#2563eb'), kpi('2', 'Cross-border', 'River basins', Waves, '#ea580c')],
    filters: geoFilters,
    columns: [
      { key: 'item', label: 'Item' },
      { key: 'country', label: 'Country / region' },
      { key: 'hazard', label: 'Hazard' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { item: 'Zambezi basin bulletin', country: 'SADC', hazard: 'Flood', status: { type: 'badge', label: 'Shared', tone: 'info' } },
      { item: 'Cyclone watch', country: 'Mozambique Channel', hazard: 'Cyclone', status: { type: 'badge', label: 'Monitoring', tone: 'gold' } },
    ],
  },
  'damage-loss': {
    title: 'Damage & Loss Assessment',
    subtitle: 'Post-disaster damage, loss and needs assessment tracking.',
    kpis: [kpi('USD 12.4M', 'Estimated damage', 'Preliminary', TrendingDown, '#d64545'), kpi('1,240', 'HHs affected', 'Reported', Users, '#ea580c')],
    filters: geoFilters,
    columns: [
      { key: 'sector', label: 'Sector' },
      { key: 'damage', label: 'Damage' },
      { key: 'location', label: 'Location' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { sector: 'Housing', damage: '420 units', location: 'Save Basin', status: { type: 'badge', label: 'Verified', tone: 'gold' } },
      { sector: 'Agriculture', damage: '1,860 Ha', location: 'Masvingo', status: { type: 'badge', label: 'Draft', tone: 'info' } },
    ],
  },
  recovery: {
    title: 'Recovery Planning',
    subtitle: 'Medium-term recovery programming and reconstruction tracking.',
    kpis: [kpi('6', 'Recovery plans', 'In development', RefreshCw, '#16794a'), kpi('USD 4.2M', 'Pledged', 'Recovery fund', Handshake, '#2563eb')],
    filters: geoFilters,
    columns: [
      { key: 'plan', label: 'Plan' },
      { key: 'district', label: 'District' },
      { key: 'lead', label: 'Lead' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { plan: 'Flood recovery — Save Basin', district: 'Makonde', lead: 'DCP / Local Govt', status: { type: 'badge', label: 'Draft', tone: 'info' } },
      { plan: 'Cyclone Idai legacy', district: 'Chimanimani', lead: 'DCP / Partners', status: { type: 'badge', label: 'Active', tone: 'green' } },
    ],
  },
  resilience: {
    title: 'Resilience Building',
    subtitle: 'DRR investments, community resilience and long-term risk reduction.',
    kpis: [kpi('18', 'DRR projects', 'Active portfolio', Shield, '#16794a'), kpi('124', 'Communities', 'CBDRM coverage', Users, '#2563eb')],
    filters: geoFilters,
    columns: [
      { key: 'project', label: 'Project' },
      { key: 'location', label: 'Location' },
      { key: 'focus', label: 'Focus' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { project: 'Community early warning', location: 'Chimanimani', focus: 'Flood / landslide', status: { type: 'badge', label: 'Active', tone: 'green' } },
      { project: 'Firebreak maintenance', location: 'Shurugwi', focus: 'Wildfire', status: { type: 'badge', label: 'Active', tone: 'green' } },
    ],
  },
  reports: {
    title: 'Reports',
    subtitle: 'Situation reports, bulletins and operational reporting.',
    kpis: [kpi('48', 'Published', '2026 YTD', FileBarChart, '#2563eb'), kpi('6', 'Pending', 'Awaiting approval', FileText, '#e6a70a')],
    filters: [
      { id: 'type', label: 'Type', type: 'select', options: ['SitRep', 'Bulletin', 'Assessment', 'Brief'] },
      { id: 'year', label: 'Year', type: 'select', options: ['2026', '2025'] },
    ],
    columns: [
      { key: 'name', label: 'Report' },
      { key: 'type', label: 'Type' },
      { key: 'area', label: 'Coverage' },
      { key: 'updated', label: 'Updated' },
    ],
    rows: [
      { name: 'National SitRep #142', type: 'SitRep', area: 'National', updated: '25 Aug 2026' },
      { name: 'Hydrology Bulletin', type: 'Bulletin', area: 'National', updated: '25 Aug 2026' },
      { name: 'Manicaland Weather Brief', type: 'Brief', area: 'Manicaland', updated: '24 Aug 2026' },
    ],
  },
  analytics: {
    title: 'Analytics',
    subtitle: 'Operational analytics, trends and performance dashboards.',
    kpis: [kpi('12', 'Dashboards', 'Published', BarChart3, '#2563eb'), kpi('92%', 'Data quality', 'Verified', Shield, '#16794a')],
    filters: geoFilters,
    columns: [
      { key: 'dashboard', label: 'Dashboard' },
      { key: 'owner', label: 'Owner' },
      { key: 'updated', label: 'Updated' },
    ],
    rows: [
      { dashboard: 'Alert trends (12 months)', owner: 'DCP Analytics', updated: 'Daily' },
      { dashboard: 'Response timeliness', owner: 'DCP Ops', updated: 'Weekly' },
    ],
  },
  'lessons-learned': {
    title: 'Lessons Learned',
    subtitle: 'After-action reviews, evaluations and knowledge capture.',
    kpis: [kpi('14', 'AARs completed', '2024–2026', BookOpen, '#16794a'), kpi('3', 'In review', 'Current cycle', FileText, '#e6a70a')],
    filters: [{ id: 'year', label: 'Year', type: 'select', options: ['2026', '2025', '2024'] }],
    columns: [
      { key: 'event', label: 'Event' },
      { key: 'year', label: 'Year' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { event: 'Cyclone Chido response', year: '2024', status: { type: 'badge', label: 'Published', tone: 'green' } },
      { event: 'Midlands wildfire season', year: '2025', status: { type: 'badge', label: 'Published', tone: 'green' } },
      { event: 'Save Basin flood response', year: '2026', status: { type: 'badge', label: 'Draft', tone: 'info' } },
    ],
  },
  'digital-sops': {
    title: 'Digital SOPs',
    subtitle: 'Standard operating procedures for hazard-specific response.',
    kpis: [kpi('24', 'SOPs digitized', 'All hazards', FileText, '#16794a'), kpi('3', 'Activated', 'Current incidents', Zap, '#ea580c')],
    filters: [{ id: 'hazard', label: 'Hazard', type: 'select', options: ['Flood', 'Cyclone', 'Drought', 'Fire', 'Health'] }],
    columns: [
      { key: 'sop', label: 'SOP' },
      { key: 'hazard', label: 'Hazard' },
      { key: 'version', label: 'Version' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { sop: 'Flood response activation', hazard: 'Flood', version: '3.2', status: { type: 'badge', label: 'Activated', tone: 'danger' } },
      { sop: 'Severe weather protocol', hazard: 'Weather', version: '2.8', status: { type: 'badge', label: 'Activated', tone: 'gold' } },
      { sop: 'Cholera outbreak', hazard: 'Health', version: '4.1', status: { type: 'badge', label: 'Standby', tone: 'green' } },
    ],
  },
  'users-roles': {
    title: 'Users & Roles',
    subtitle: 'Platform access control for DCP and partner organisations.',
    kpis: [kpi('842', 'Active users', 'National platform', Users, '#2563eb'), kpi('12', 'Role profiles', 'RBAC', Shield, '#16794a')],
    filters: [{ id: 'role', label: 'Role', type: 'select', options: ['DCP Admin', 'Provincial Officer', 'Partner', 'Viewer'] }],
    columns: [
      { key: 'user', label: 'User' },
      { key: 'role', label: 'Role' },
      { key: 'org', label: 'Organisation' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { user: 'Wonder Mufunda', role: 'DCP Administrator', org: 'DCP', status: { type: 'badge', label: 'Active', tone: 'green' } },
      { user: 'Tendai Moyo', role: 'Provincial Officer', org: 'DCP Manicaland', status: { type: 'badge', label: 'Active', tone: 'green' } },
    ],
  },
  'data-sources': {
    title: 'Data Sources',
    subtitle: 'Integrated hazard, hydrology, weather and operational data feeds.',
    kpis: [kpi('26', 'Active feeds', 'Live integrations', Database, '#16794a'), kpi('2', 'Degraded', 'Needs attention', Activity, '#ea580c')],
    filters: [{ id: 'type', label: 'Type', type: 'select', options: ['Weather', 'Hydrology', 'Health', 'Satellite', 'Field'] }],
    columns: [
      { key: 'source', label: 'Source' },
      { key: 'type', label: 'Type' },
      { key: 'frequency', label: 'Frequency' },
      { key: 'status', label: 'Status' },
    ],
    rows: [
      { source: 'Met Services AWS', type: 'Weather', frequency: '15 min', status: { type: 'badge', label: 'Live', tone: 'green' } },
      { source: 'ZINWA river gauges', type: 'Hydrology', frequency: 'Hourly', status: { type: 'badge', label: 'Live', tone: 'green' } },
      { source: 'FEWSNET drought', type: 'Satellite', frequency: 'Weekly', status: { type: 'badge', label: 'Live', tone: 'green' } },
    ],
  },
  'system-administration': {
    title: 'System Administration',
    subtitle: 'Platform configuration, audit logs and system health.',
    kpis: [
      kpi('99.8%', 'Uptime', 'Last 30 days', Activity, '#16794a'),
      kpi('v2.0.0', 'Version', 'ZIM-DRIMS', Settings, '#2563eb'),
      kpi('0', 'Critical issues', 'Open tickets', ShieldAlert, '#16794a'),
    ],
    filters: [],
    columns: [
      { key: 'component', label: 'Component' },
      { key: 'status', label: 'Status' },
      { key: 'updated', label: 'Last check' },
    ],
    rows: [
      { component: 'Early Warning Engine', status: { type: 'badge', label: 'Operational', tone: 'green' }, updated: '1 min ago' },
      { component: 'Risk Map Services', status: { type: 'badge', label: 'Operational', tone: 'green' }, updated: '2 mins ago' },
      { component: 'Notification Gateway', status: { type: 'badge', label: 'Operational', tone: 'green' }, updated: '3 mins ago' },
    ],
    notes: ['National DCP EOC status: OPERATIONAL · All core modules running normally.'],
  },
}

export function resolveModuleSlug(slug: string[] | undefined): keyof typeof modulePages | null {
  if (!slug?.length) return null
  const key = slug.join('/')
  return key in modulePages ? (key as keyof typeof modulePages) : null
}
