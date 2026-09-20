import {
  Activity,
  AlertTriangle,
  BarChart3,
  BookOpen,
  Building2,
  CheckCircle2,
  Clock,
  Database,
  DollarSign,
  FileBarChart,
  FileText,
  Globe2,
  Handshake,
  HeartPulse,
  MapPin,
  Package,
  Radio,
  RefreshCw,
  Settings,
  Shield,
  ShieldAlert,
  Siren,
  Tent,
  TrendingDown,
  Truck,
  Users,
  Zap,
} from 'lucide-react'
import type { RichModuleConfig } from '@/lib/concept/types'
import {
  incidentMarkers,
  kpi,
  responseProvinceColors,
  riskColors,
} from '@/lib/concept-data'

const riskMapColors = responseProvinceColors

const riskLegend = [
  { color: '#d64545', label: 'Critical' },
  { color: '#ea580c', label: 'Major' },
  { color: '#e6a70a', label: 'Watch' },
  { color: '#86efac', label: 'Low' },
]

const defaultFeed = [
  { title: 'National briefing circulated to provincial EOCs', meta: '25 Aug · 14:20 CAT', tone: 'info' as const },
  { title: 'New district assessment uploaded — Buhera', meta: '25 Aug · 13:05 CAT', tone: 'new' as const },
  { title: 'Partner surge request acknowledged — WFP', meta: '25 Aug · 11:40 CAT', tone: 'alert' as const },
]

function crumbs(...parts: { label: string; href?: string }[]): { label: string; href?: string }[] {
  return [{ label: 'Home', href: '/' }, ...parts]
}

export const nationalCopConfig: RichModuleConfig = {
  title: 'NEOC Executive Dashboard',
  subtitle: 'National Common Operating Picture for the DCP Emergency Operations Centre.',
  breadcrumbs: crumbs({ label: 'Command' }, { label: 'National COP' }),
  primaryAction: 'Generate Brief',
  kpis: [
    kpi('14', 'Active Alerts', 'Nationwide', ShieldAlert, riskColors.critical),
    kpi('23', 'Active Incidents', '7 provinces', Siren, riskColors.major),
    kpi('312,450', 'People at Risk', '9 districts', Users, riskColors.info),
    kpi('OPERATIONAL', 'EOC Status', 'National DCP EOC', Activity, riskColors.ok),
    kpi('87%', 'National Readiness', 'Multi-hazard', Shield, riskColors.ok),
    kpi('26', 'Live Data Sources', 'Feeds connected', Database, riskColors.info),
  ],
  map: {
    title: 'National Situation Map',
    provinceColors: riskMapColors,
    markers: incidentMarkers,
    legend: riskLegend,
  },
  donut: {
    title: 'Alert Severity Mix',
    centerValue: '14',
    centerLabel: 'Alerts',
    segments: [
      { label: 'Critical', value: 2, color: riskColors.critical },
      { label: 'Warning', value: 3, color: riskColors.major },
      { label: 'Watch', value: 4, color: riskColors.active },
      { label: 'Advisory', value: 5, color: riskColors.info },
    ],
  },
  statusCards: [
    { label: 'Provincial EOCs', value: '10' },
    { label: 'Partners On-site', value: '86' },
    { label: 'Open SITREPs', value: '12' },
    { label: 'AA Triggers', value: '3' },
  ],
  progress: {
    title: 'Command Priorities',
    items: [
      { label: 'Flood response — Save Basin', pct: 68 },
      { label: 'Drought anticipation — South', pct: 72 },
      { label: 'Health cluster surge', pct: 54 },
      { label: 'Logistics pre-positioning', pct: 61 },
    ],
  },
  table: {
    title: 'Executive Priority Incidents',
    columns: ['Incident', 'Hazard', 'Province', 'Severity', 'People', 'Status'],
    rows: [
      ['Save River flooding', 'Flood', 'Mash. West', 'Critical', '84,200', 'Active'],
      ['Buhera district floods', 'Flood', 'Manicaland', 'Major', '62,400', 'Active'],
      ['Matabeleland drought', 'Drought', 'Mat. North', 'Watch', '121,000', 'Monitoring'],
      ['Cholera cluster', 'Health', 'Harare', 'Warning', '8,400', 'Contained'],
      ['Veldfire — Hwange', 'Fire', 'Mat. North', 'Advisory', '2,100', 'Monitoring'],
    ],
  },
  feed: { title: 'Command Feed', items: defaultFeed },
  actions: [
    { label: 'Open Early Warning', href: '/early-warning' },
    { label: 'Response Overview', href: '/response' },
    { label: 'Trigger Monitor', href: '/trigger-monitor' },
    { label: 'Public Dashboard', href: '/public' },
  ],
  notes: [
    'Dummy dataset · DCP demo — figures frozen at 25 Aug 2026 15:48 CAT.',
    'NEOC brief covers all-hazard national posture for ministers and DCP leadership.',
  ],
}

export const earlyWarningOverviewConfig: RichModuleConfig = {
  title: 'Early Warning Overview',
  subtitle: 'Hazards & alerts hub — multi-hazard monitoring for Zimbabwe.',
  breadcrumbs: crumbs({ label: 'Command' }, { label: 'Early Warning' }),
  primaryAction: 'Create Alert',
  kpis: [
    kpi('14', 'Active Alerts', 'All hazards', ShieldAlert, riskColors.critical),
    kpi('02', 'Critical', 'Immediate action', AlertTriangle, riskColors.critical),
    kpi('03', 'Warnings', 'Take action', AlertTriangle, riskColors.major),
    kpi('04', 'Watches', 'Be prepared', Clock, riskColors.active),
    kpi('05', 'Advisories', 'Stay informed', Activity, riskColors.info),
    kpi('5 min', 'Last Update', 'Near real-time', RefreshCw, riskColors.ok),
  ],
  map: {
    title: 'Multi-Hazard Alert Map',
    provinceColors: riskMapColors,
    markers: incidentMarkers,
    legend: riskLegend,
  },
  donut: {
    title: 'Alerts by Hazard',
    centerValue: '14',
    centerLabel: 'Total',
    segments: [
      { label: 'Flood', value: 4, color: riskColors.info },
      { label: 'Weather', value: 3, color: riskColors.major },
      { label: 'Drought', value: 2, color: riskColors.active },
      { label: 'Health', value: 2, color: '#7c3aed' },
      { label: 'Fire', value: 2, color: riskColors.critical },
      { label: 'Other', value: 1, color: riskColors.muted },
    ],
  },
  table: {
    title: 'Active Early Warnings',
    columns: ['Alert', 'Hazard', 'Location', 'Level', 'Time to impact', 'Updated'],
    rows: [
      ['Flood Warning — Save River', 'Flood', 'Mashonaland West', 'Critical', '24–48 hrs', '2h ago'],
      ['Severe Weather — Mutare', 'Weather', 'Manicaland', 'Warning', '12–24 hrs', '4h ago'],
      ['Drought Watch — Mat. North', 'Drought', 'Matabeleland North', 'Watch', '1–3 months', '6h ago'],
      ['Wildfire Advisory — Shurugwi', 'Fire', 'Midlands', 'Advisory', '72 hrs', 'Today'],
      ['Cholera Health Alert — Gutu', 'Health', 'Masvingo', 'Warning', 'Ongoing', 'Today'],
    ],
  },
  list: {
    title: 'Hazard Dashboards',
    items: [
      { label: 'All Hazards', badge: '14' },
      { label: 'Flood & Hydrology', badge: '4' },
      { label: 'Weather & Cyclone', badge: '3' },
      { label: 'Drought', badge: '2' },
      { label: 'Fire / Health / Mining / Roads', badge: '5' },
    ],
  },
  actions: [
    { label: 'All Hazards', href: '/early-warning/all-hazards' },
    { label: 'Flood Dashboard', href: '/early-warning/flood' },
    { label: 'Drought Dashboard', href: '/early-warning/drought' },
    { label: 'Risk Map', href: '/risk-intelligence/risk-map' },
  ],
  feed: { title: 'Alert Timeline', items: defaultFeed },
}

export function hazardEarlyWarningConfig(
  slug: string,
  title: string,
  hazard: string,
  alerts: number,
  atRisk: string,
): RichModuleConfig {
  return {
    title: `${title} Early Warning`,
    subtitle: `Hazard-specific monitoring and alerting for ${hazard}.`,
    breadcrumbs: crumbs(
      { label: 'Command' },
      { label: 'Early Warning', href: '/early-warning' },
      { label: title },
    ),
    primaryAction: 'Issue Alert',
    kpis: [
      kpi(String(alerts).padStart(2, '0'), 'Active alerts', hazard, ShieldAlert, riskColors.critical),
      kpi(atRisk, 'People at risk', 'Affected areas', Users, riskColors.major),
      kpi('87%', 'Readiness', `${hazard} preparedness`, Shield, riskColors.ok),
      kpi('18', 'Monitoring stations', 'Live feeds', Database, riskColors.info),
      kpi('5 mins', 'Last update', 'Near real-time', Clock, riskColors.ok),
      kpi('6', 'Districts watched', 'Elevated risk', MapPin, riskColors.active),
    ],
    map: {
      title: `${hazard} Risk Map`,
      provinceColors: riskMapColors,
      markers: incidentMarkers.slice(0, 3),
      legend: riskLegend,
    },
    donut: {
      title: 'Alert Levels',
      centerValue: String(alerts),
      centerLabel: 'Alerts',
      segments: [
        { label: 'Critical', value: Math.max(1, Math.floor(alerts * 0.2)), color: riskColors.critical },
        { label: 'Warning', value: Math.max(1, Math.floor(alerts * 0.3)), color: riskColors.major },
        { label: 'Watch', value: Math.max(1, Math.floor(alerts * 0.3)), color: riskColors.active },
        { label: 'Advisory', value: Math.max(1, alerts - 3), color: riskColors.info },
      ],
    },
    progress: {
      title: 'Preparedness Actions',
      items: [
        { label: 'Community alerts issued', pct: 78 },
        { label: 'SOPs activated', pct: 64 },
        { label: 'Partner notification', pct: 82 },
        { label: 'Evacuation readiness', pct: 55 },
      ],
    },
    table: {
      title: `${hazard} Alert Register`,
      columns: ['Alert', 'Location', 'Level', 'Impact window', 'Updated'],
      rows: [
        [`${hazard} Warning — Priority zone`, 'Manicaland', 'Critical', '24–48 hrs', '2h ago'],
        [`${hazard} Watch — Secondary zone`, 'Masvingo', 'Warning', '48–72 hrs', '4h ago'],
        [`${hazard} Advisory — Monitoring`, 'Midlands', 'Advisory', '72 hrs', 'Today'],
      ],
    },
    feed: {
      title: 'Hazard Feed',
      items: [
        { title: `${hazard} model run completed`, meta: '25 Aug · 15:10 CAT', tone: 'info' },
        { title: `Field observation received — ${hazard}`, meta: '25 Aug · 14:00 CAT', tone: 'new' },
        { title: 'Threshold review scheduled', meta: '25 Aug · 12:30 CAT', tone: 'alert' },
      ],
    },
    actions: [
      { label: 'Early Warning Hub', href: '/early-warning' },
      { label: 'National COP', href: '/national-cop' },
      { label: `View /early-warning/${slug}`, href: `/early-warning/${slug}` },
    ],
    notes: [`Integrated Met Services, ZINWA, DCP field and partner feeds for ${hazard.toLowerCase()} monitoring.`],
  }
}

export const riskIntelligenceConfig: RichModuleConfig = {
  title: 'Risk Intelligence Overview',
  subtitle: 'Risk map, explorer and impact intelligence for multi-hazard decision support.',
  breadcrumbs: crumbs({ label: 'Command' }, { label: 'Risk Intelligence' }),
  kpis: [
    kpi('74', 'Risk Index', 'High · +3 vs last month', AlertTriangle, riskColors.critical),
    kpi('312,450', 'People at Risk', '9 districts', Users, riskColors.major),
    kpi('16', 'Districts on Watch', 'Multi-hazard', MapPin, riskColors.active),
    kpi('42', 'High-risk wards', 'Priority targeting', ShieldAlert, riskColors.critical),
    kpi('87%', 'Data coverage', 'National layers', Database, riskColors.ok),
    kpi('11', 'Hazard layers', 'Active overlays', BarChart3, riskColors.info),
  ],
  map: {
    title: 'Composite Risk Map',
    provinceColors: riskMapColors,
    markers: incidentMarkers,
    legend: riskLegend,
  },
  donut: {
    title: 'Risk by Hazard',
    centerValue: '74',
    centerLabel: 'Index',
    segments: [
      { label: 'Flood', value: 28, color: riskColors.info },
      { label: 'Drought', value: 24, color: riskColors.active },
      { label: 'Cyclone', value: 16, color: riskColors.major },
      { label: 'Health', value: 18, color: '#7c3aed' },
      { label: 'Fire', value: 14, color: riskColors.critical },
    ],
  },
  bars: {
    title: 'Provincial Risk Scores',
    items: [
      { label: 'Manicaland', value: 86, color: riskColors.critical },
      { label: 'Mashonaland West', value: 82, color: riskColors.critical },
      { label: 'Masvingo', value: 74, color: riskColors.major },
      { label: 'Matabeleland North', value: 68, color: riskColors.active },
      { label: 'Midlands', value: 54, color: riskColors.info },
    ],
  },
  table: {
    title: 'Top Risk Hotspots',
    columns: ['District', 'Province', 'Primary hazard', 'Risk score', 'People', 'Trend'],
    rows: [
      ['Buhera', 'Manicaland', 'Flood', '92', '48,200', '↑'],
      ['Chiredzi', 'Masvingo', 'Drought', '88', '61,400', '↑'],
      ['Chipinge', 'Manicaland', 'Cyclone', '84', '39,100', '→'],
      ['Hwange', 'Mat. North', 'Drought/Fire', '79', '28,600', '↑'],
      ['Makoni', 'Manicaland', 'Flood', '76', '33,800', '↓'],
    ],
  },
  actions: [
    { label: 'Risk Map', href: '/risk-intelligence/risk-map' },
    { label: 'Risk Explorer', href: '/risk-intelligence/risk-explorer' },
    { label: 'Impact Intelligence', href: '/impact-intelligence' },
    { label: 'Needs Assessment', href: '/needs-assessment' },
  ],
  feed: { title: 'Risk Updates', items: defaultFeed },
}

export const riskMapConfig: RichModuleConfig = {
  ...riskIntelligenceConfig,
  title: 'Risk Map',
  subtitle: 'Interactive multi-hazard risk choropleth and hotspot layers.',
  breadcrumbs: crumbs(
    { label: 'Command' },
    { label: 'Risk Intelligence', href: '/risk-intelligence' },
    { label: 'Risk Map' },
  ),
  primaryAction: 'Export Map',
}

export const riskExplorerConfig: RichModuleConfig = {
  title: 'Risk Explorer',
  subtitle: 'Explore hazard exposure, vulnerability and capacity indicators by geography.',
  breadcrumbs: crumbs(
    { label: 'Command' },
    { label: 'Risk Intelligence', href: '/risk-intelligence' },
    { label: 'Risk Explorer' },
  ),
  kpis: [
    kpi('63', 'Districts', 'Full coverage', MapPin, riskColors.info),
    kpi('1,200+', 'Wards', 'Indexed', Building2, riskColors.ok),
    kpi('11', 'Hazard layers', 'Queryable', ShieldAlert, riskColors.major),
    kpi('48', 'Indicators', 'Exposure & capacity', BarChart3, riskColors.info),
    kpi('92%', 'Data freshness', 'Updated this week', CheckCircle2, riskColors.ok),
    kpi('6', 'Saved views', 'Analyst presets', FileBarChart, riskColors.muted),
  ],
  map: {
    title: 'Explorer Map',
    provinceColors: riskMapColors,
    legend: riskLegend,
  },
  table: {
    title: 'Indicator Browser',
    columns: ['Indicator', 'Domain', 'National value', 'Trend', 'Source'],
    rows: [
      ['Flood exposure (people)', 'Exposure', '1.2M', '↑', 'DCP / ZINWA'],
      ['Drought vulnerability', 'Vulnerability', '0.68', '↑', 'ZimVAC'],
      ['Shelter capacity', 'Capacity', '72%', '→', 'DCP'],
      ['Road access index', 'Capacity', '0.74', '↓', 'MoTH'],
      ['Health facility density', 'Capacity', '1.8 / 10k', '→', 'MoHCC'],
    ],
  },
  bars: {
    title: 'Vulnerability Drivers',
    items: [
      { label: 'Poverty incidence', value: 78 },
      { label: 'Food insecurity', value: 66 },
      { label: 'Water access gaps', value: 58 },
      { label: 'Housing fragility', value: 52 },
    ],
  },
  actions: [
    { label: 'Risk Map', href: '/risk-intelligence/risk-map' },
    { label: 'Needs Assessment', href: '/needs-assessment' },
  ],
  feed: { title: 'Explorer Activity', items: defaultFeed },
}

export const impactIntelligenceConfig: RichModuleConfig = {
  title: 'Impact Intelligence',
  subtitle: 'Forecast and observed impacts across people, livelihoods and infrastructure.',
  breadcrumbs: crumbs({ label: 'Command' }, { label: 'Impact Intelligence' }),
  kpis: [
    kpi('856,214', 'People Affected', 'Observed + forecast', Users, riskColors.info),
    kpi('421,580', 'People in Need', 'Priority caseload', HeartPulse, riskColors.major),
    kpi('210k ha', 'Crop Area at Risk', 'Season outlook', TrendingDown, riskColors.active),
    kpi('580K', 'Livestock at Risk', 'Drought corridor', AlertTriangle, riskColors.critical),
    kpi('148', 'Infra assets hit', 'Roads / bridges / schools', Building2, riskColors.major),
    kpi('$48.2M', 'Est. Economic Loss', 'Working estimate', DollarSign, riskColors.ok),
  ],
  map: {
    title: 'Impact Footprint',
    provinceColors: riskMapColors,
    markers: incidentMarkers,
    legend: riskLegend,
  },
  donut: {
    title: 'Impact by Sector',
    centerValue: '6',
    centerLabel: 'Sectors',
    segments: [
      { label: 'Food Security', value: 32, color: riskColors.ok },
      { label: 'WASH', value: 18, color: riskColors.info },
      { label: 'Shelter', value: 16, color: '#7c3aed' },
      { label: 'Health', value: 14, color: riskColors.major },
      { label: 'Protection', value: 10, color: riskColors.active },
      { label: 'Education', value: 10, color: riskColors.muted },
    ],
  },
  table: {
    title: 'Impact Forecast Windows',
    columns: ['Indicator', '1 month', '2 months', '3 months', 'Confidence'],
    rows: [
      ['People affected', '180K', '310K', '421K', 'High'],
      ['Livelihoods at risk', '62K', '118K', '165K', 'Medium'],
      ['Livestock at risk', '240K', '410K', '580K', 'Medium'],
      ['Crop area at risk', '85k ha', '140k ha', '210k ha', 'High'],
    ],
  },
  progress: {
    title: 'Assessment Coverage',
    items: [
      { label: 'Rapid assessments', pct: 72 },
      { label: 'Sectoral assessments', pct: 58 },
      { label: 'Household surveys', pct: 41 },
      { label: 'Infrastructure checks', pct: 63 },
    ],
  },
  actions: [
    { label: 'Needs Assessment', href: '/needs-assessment' },
    { label: 'Response Overview', href: '/response' },
  ],
  feed: { title: 'Impact Feed', items: defaultFeed },
}

export const needsAssessmentConfig: RichModuleConfig = {
  title: 'Needs Assessment',
  subtitle: 'Priority humanitarian and protection needs by sector and geography.',
  breadcrumbs: crumbs({ label: 'Command' }, { label: 'Needs Assessment' }),
  kpis: [
    kpi('421,580', 'People in Need', 'Current caseload', Users, riskColors.major),
    kpi('12', 'Priority Districts', 'Targeted', MapPin, riskColors.critical),
    kpi('9', 'Sectors', 'Assessed', Handshake, riskColors.info),
    kpi('68%', 'Needs Met', 'Assistance vs PIN', CheckCircle2, riskColors.ok),
    kpi('156', 'Open Gaps', 'Unmet requests', AlertTriangle, riskColors.major),
    kpi('$18.4M', 'Funding Gap', 'Priority needs', DollarSign, riskColors.active),
  ],
  bars: {
    title: 'Priority Needs by Sector',
    items: [
      { label: 'Food assistance', value: 92, color: riskColors.critical },
      { label: 'Clean water', value: 84, color: riskColors.major },
      { label: 'Emergency shelter', value: 71, color: '#7c3aed' },
      { label: 'Health supplies', value: 66, color: riskColors.info },
      { label: 'Protection services', value: 58, color: riskColors.active },
    ],
  },
  table: {
    title: 'District Needs Summary',
    columns: ['District', 'PIN', 'Top need', 'Severity', 'Partners', 'Gap'],
    rows: [
      ['Buhera', '48,200', 'Shelter / WASH', 'Critical', '6', '$2.1M'],
      ['Chiredzi', '61,400', 'Food / Water', 'Critical', '8', '$3.4M'],
      ['Chipinge', '39,100', 'Shelter', 'Major', '5', '$1.8M'],
      ['Gutu', '22,600', 'Health', 'Warning', '4', '$0.9M'],
    ],
  },
  list: {
    title: 'Immediate Gaps',
    items: [
      { label: 'Water trucking capacity', badge: 'High' },
      { label: 'Plastic sheeting stock', badge: 'High' },
      { label: 'ORS / cholera kits', badge: 'Medium' },
      { label: 'Protection case workers', badge: 'Medium' },
    ],
  },
  pipeline: {
    title: 'Assessment Pipeline',
    steps: [
      { label: 'Alert', count: 14 },
      { label: 'Rapid', count: 9, active: true },
      { label: 'Sectoral', count: 6 },
      { label: 'Validated', count: 4 },
      { label: 'Published', count: 3 },
    ],
  },
  actions: [
    { label: '5W Coordination', href: '/coordination/5w' },
    { label: 'Impact Intelligence', href: '/impact-intelligence' },
  ],
  feed: { title: 'Assessment Updates', items: defaultFeed },
}

export const anticipationOverviewConfig: RichModuleConfig = {
  title: 'Anticipation Overview',
  subtitle: 'Trigger monitoring, hazard anticipation and anticipatory financing at a glance.',
  breadcrumbs: crumbs({ label: 'Anticipation' }, { label: 'Overview' }),
  kpis: [
    kpi('3', 'Triggers Approaching', 'Next 30 days', Activity, riskColors.major),
    kpi('18', 'AA Actions Ready', 'Pre-approved', Zap, riskColors.ok),
    kpi('7', 'Actions Active', 'Underway', Zap, riskColors.major),
    kpi('$5.00M', 'Financing Available', 'Of $6.45M', DollarSign, riskColors.ok),
    kpi('856K', 'People to Benefit', 'AA portfolio', Users, riskColors.info),
    kpi('23', 'Target Districts', 'Priority', MapPin, riskColors.active),
  ],
  pipeline: {
    title: 'Anticipation Pipeline',
    steps: [
      { label: 'Forecast', count: 11 },
      { label: 'Watch', count: 6 },
      { label: 'Approaching', count: 3, active: true },
      { label: 'Activation', count: 2 },
      { label: 'Action', count: 7 },
    ],
  },
  donut: {
    title: 'AA Portfolio by Hazard',
    centerValue: '18',
    centerLabel: 'Ready',
    segments: [
      { label: 'Drought', value: 8, color: riskColors.active },
      { label: 'Flood', value: 5, color: riskColors.info },
      { label: 'Cyclone', value: 3, color: riskColors.major },
      { label: 'Fire', value: 2, color: riskColors.critical },
    ],
  },
  table: {
    title: 'Active Anticipation Files',
    columns: ['Hazard', 'District focus', 'Trigger', 'Lead time', 'Status', 'Financing'],
    rows: [
      ['Drought', 'Chiredzi / Buhera', 'SPI ≤ -1.5', '2–3 mo', 'Approaching', '$2.1M'],
      ['Flood', 'Chipinge', 'River > danger', '48–72h', 'Watch', '$0.8M'],
      ['Cyclone', 'Chimanimani', 'Track threat', '5–7d', 'Monitoring', '$1.2M'],
    ],
  },
  actions: [
    { label: 'Trigger Monitor', href: '/trigger-monitor' },
    { label: 'Drought Anticipation', href: '/anticipation/drought' },
    { label: 'Anticipatory Action', href: '/anticipatory-action' },
    { label: 'Anticipatory Financing', href: '/anticipatory-financing' },
  ],
  feed: { title: 'Anticipation Feed', items: defaultFeed },
}

export const triggerMonitorConfig: RichModuleConfig = {
  title: 'Trigger Monitor',
  subtitle: 'Track forecast thresholds and activation readiness across hazards.',
  breadcrumbs: crumbs({ label: 'Anticipation', href: '/anticipation' }, { label: 'Trigger Monitor' }),
  primaryAction: 'Prepare Activation',
  kpis: [
    kpi('3', 'Approaching', 'Within window', Activity, riskColors.major),
    kpi('2', 'Activated', 'AA underway', Zap, riskColors.ok),
    kpi('6', 'On Watch', 'Elevated probability', Clock, riskColors.active),
    kpi('78%', 'Top trigger prob.', 'Drought SPI', AlertTriangle, riskColors.critical),
    kpi('15–30 Sep', 'Est. trigger date', 'Drought corridor', Clock, riskColors.info),
    kpi('11', 'Models live', 'Forecast sources', Database, riskColors.ok),
  ],
  progress: {
    title: 'Trigger Status Gauges',
    items: [
      { label: 'Drought SPI (national)', pct: 78 },
      { label: 'Flood river thresholds', pct: 64 },
      { label: 'Cyclone track threat', pct: 32 },
      { label: 'Fire danger index', pct: 48 },
    ],
  },
  table: {
    title: 'Trigger Register',
    columns: ['Hazard', 'Indicator', 'Threshold', 'Current', 'Probability', 'Status'],
    rows: [
      ['Drought', 'SPI 3-month', '≤ -1.5', '-1.4', '78%', 'Approaching'],
      ['Flood', 'Save @ Chinhoyi', '> 4.5 m', '4.8 m', '92%', 'Activated'],
      ['Cyclone', 'Track distance', '< 200 km', '410 km', '28%', 'Watch'],
      ['Fire', 'FDI', '> 35', '29', '41%', 'Monitoring'],
    ],
  },
  statusCards: [
    { label: 'SOPs Ready', value: '14' },
    { label: 'AA Plans Linked', value: '18' },
    { label: 'Finance Windows', value: '6' },
    { label: 'Partners Notified', value: '22' },
  ],
  actions: [
    { label: 'Anticipatory Action', href: '/anticipatory-action' },
    { label: 'Anticipatory Financing', href: '/anticipatory-financing' },
  ],
  feed: { title: 'Trigger Events', items: defaultFeed },
}

export const anticipatoryFinancingConfig: RichModuleConfig = {
  title: 'Anticipatory Financing',
  subtitle: 'Pre-arranged finance windows, releases and gaps for anticipatory action.',
  breadcrumbs: crumbs({ label: 'Anticipation', href: '/anticipation' }, { label: 'Anticipatory Financing' }),
  kpis: [
    kpi('$6.45M', 'Budget Required', 'Full AA portfolio', DollarSign, riskColors.ok),
    kpi('$5.00M', 'Financing Secured', '77% funded', DollarSign, riskColors.info),
    kpi('$1.45M', 'Financing Gap', 'Priority windows', AlertTriangle, riskColors.major),
    kpi('6', 'Finance Windows', 'Active instruments', Building2, riskColors.ok),
    kpi('$1.82M', 'Released YTD', 'Against triggers', CheckCircle2, riskColors.ok),
    kpi('4', 'Pending Releases', 'Awaiting trigger', Clock, riskColors.active),
  ],
  donut: {
    title: 'Funding by Instrument',
    centerValue: '$5M',
    centerLabel: 'Secured',
    segments: [
      { label: 'CERF AA', value: 28, color: riskColors.info },
      { label: 'Start Network', value: 22, color: riskColors.ok },
      { label: 'Government', value: 18, color: riskColors.major },
      { label: 'Bilateral', value: 20, color: '#7c3aed' },
      { label: 'Other', value: 12, color: riskColors.muted },
    ],
  },
  bars: {
    title: 'Release Readiness',
    items: [
      { label: 'Drought corridor', value: 82, suffix: '82%' },
      { label: 'Flood AA window', value: 64, suffix: '64%' },
      { label: 'Cyclone contingency', value: 48, suffix: '48%' },
      { label: 'Health surge fund', value: 71, suffix: '71%' },
    ],
  },
  table: {
    title: 'Finance Windows',
    columns: ['Instrument', 'Hazard', 'Amount', 'Status', 'Trigger link', 'Owner'],
    rows: [
      ['CERF AA', 'Drought', '$2.10M', 'Ready', 'SPI ≤ -1.5', 'OCHA'],
      ['Start Network', 'Flood', '$0.80M', 'Active', 'River danger', 'Start'],
      ['National Contingency', 'Multi', '$1.20M', 'Ready', 'NEOC activation', 'DCP'],
      ['Bilateral AA', 'Cyclone', '$0.90M', 'Pipeline', 'Track threat', 'Partner'],
    ],
  },
  actions: [
    { label: 'Anticipatory Action', href: '/anticipatory-action' },
    { label: 'Trigger Monitor', href: '/trigger-monitor' },
  ],
  feed: { title: 'Finance Activity', items: defaultFeed },
}

export function hazardAnticipationConfig(slug: string, title: string, hazard: string): RichModuleConfig {
  return {
    title: `${title} Anticipation`,
    subtitle: `Hazard anticipation, triggers and readiness for ${hazard}.`,
    breadcrumbs: crumbs(
      { label: 'Anticipation', href: '/anticipation' },
      { label: 'Hazard Anticipation' },
      { label: title },
    ),
    kpis: [
      kpi('Watch', 'Risk Level', hazard, AlertTriangle, riskColors.active),
      kpi('4', 'Districts', 'Priority focus', MapPin, riskColors.major),
      kpi('2–14d', 'Lead Time', 'Forecast window', Clock, riskColors.info),
      kpi('Approaching', 'Trigger', 'Monitoring', Activity, riskColors.major),
      kpi('5', 'Actions Ready', 'Pre-approved', CheckCircle2, riskColors.ok),
      kpi('$0.85M', 'Finance Linked', 'AA window', DollarSign, riskColors.ok),
    ],
    map: {
      title: `${hazard} Anticipation Map`,
      provinceColors: riskMapColors,
      legend: riskLegend,
    },
    progress: {
      title: 'Readiness',
      items: [
        { label: 'Forecast confidence', pct: 74 },
        { label: 'SOP readiness', pct: 68 },
        { label: 'Partner standby', pct: 61 },
        { label: 'Finance window', pct: 55 },
      ],
    },
    table: {
      title: 'Anticipatory Actions',
      columns: ['Action', 'District', 'People', 'Status', 'Cost'],
      rows: [
        [`${hazard} early warning dissemination`, 'Priority', '42,000', 'Ready', '$45K'],
        ['Pre-position supplies', 'Priority', '18,500', 'Ready', '$120K'],
        ['Cash preparedness', 'Secondary', '12,000', 'Planned', '$210K'],
      ],
    },
    actions: [
      { label: 'Trigger Monitor', href: '/trigger-monitor' },
      { label: 'Anticipatory Action', href: '/anticipatory-action' },
      { label: `Open /anticipation/${slug}`, href: `/anticipation/${slug}` },
    ],
    feed: { title: `${hazard} Feed`, items: defaultFeed },
  }
}

export const incidentCommandConfig: RichModuleConfig = {
  title: 'Incident Command',
  subtitle: 'ICS structure, sector commands and field coordination for active incidents.',
  breadcrumbs: crumbs({ label: 'Response', href: '/response' }, { label: 'Incident Command' }),
  primaryAction: 'Open ICS Board',
  kpis: [
    kpi('6', 'Active ICS', 'Command posts', Radio, riskColors.critical),
    kpi('23', 'Incidents Linked', 'Under command', Siren, riskColors.major),
    kpi('148', 'Field Teams', 'Deployed', Users, riskColors.info),
    kpi('42', 'Sector Leads', 'Assigned', Building2, riskColors.ok),
    kpi('18', 'Comms Channels', 'Live', Activity, riskColors.ok),
    kpi('2h 12m', 'Avg Brief Cycle', 'Last 24h', Clock, riskColors.muted),
  ],
  statusCards: [
    { label: 'Incident Commanders', value: '6' },
    { label: 'Operations Sections', value: '14' },
    { label: 'Planning Sections', value: '8' },
    { label: 'Logistics Sections', value: '9' },
  ],
  pipeline: {
    title: 'ICS Lifecycle',
    steps: [
      { label: 'Alert', count: 23 },
      { label: 'Activate ICS', count: 6, active: true },
      { label: 'Objectives', count: 6 },
      { label: 'Operations', count: 14 },
      { label: 'Demobilise', count: 2 },
    ],
  },
  table: {
    title: 'Active Command Posts',
    columns: ['Incident', 'IC', 'Province', 'Sectors', 'Teams', 'Status'],
    rows: [
      ['Save Basin Flood', 'P. Ndlovu', 'Mash. West', '5', '28', 'Active'],
      ['Buhera Floods', 'T. Moyo', 'Manicaland', '4', '22', 'Active'],
      ['Chiredzi Drought', 'S. Chikafu', 'Masvingo', '3', '12', 'Monitoring'],
      ['Harare Cholera', 'R. Dube', 'Harare', '4', '18', 'Active'],
    ],
  },
  bars: {
    title: 'Section Workload',
    items: [
      { label: 'Operations', value: 82 },
      { label: 'Logistics', value: 74 },
      { label: 'Planning', value: 61 },
      { label: 'Finance/Admin', value: 48 },
    ],
  },
  actions: [
    { label: 'Emergency Operations', href: '/emergency-operations' },
    { label: 'Logistics', href: '/logistics-resources' },
    { label: 'Search & Rescue', href: '/search-rescue' },
  ],
  feed: { title: 'ICS Comms', items: defaultFeed },
}

export const sheltersEvacuationConfig: RichModuleConfig = {
  title: 'Shelters & Evacuation',
  subtitle: 'Shelter occupancy, evacuation routes and displacement tracking.',
  breadcrumbs: crumbs({ label: 'Response', href: '/response' }, { label: 'Shelters & Evacuation' }),
  kpis: [
    kpi('72,450', 'People Sheltered', 'Safe locations', Tent, '#7c3aed'),
    kpi('186', 'Active Shelters', 'Open sites', Building2, riskColors.ok),
    kpi('68%', 'Occupancy', 'National average', Users, riskColors.major),
    kpi('14', 'Evacuation Zones', 'Active orders', AlertTriangle, riskColors.critical),
    kpi('9,240', 'In Transit', 'Evacuating now', Truck, riskColors.info),
    kpi('42', 'Host Communities', 'Supporting', Handshake, riskColors.ok),
  ],
  map: {
    title: 'Shelter & Evacuation Map',
    provinceColors: riskMapColors,
    markers: incidentMarkers,
    legend: riskLegend,
  },
  donut: {
    title: 'Shelter Types',
    centerValue: '186',
    centerLabel: 'Sites',
    segments: [
      { label: 'Schools', value: 42, color: riskColors.info },
      { label: 'Community halls', value: 28, color: riskColors.ok },
      { label: 'Churches', value: 18, color: '#7c3aed' },
      { label: 'Tents / temporary', value: 12, color: riskColors.major },
    ],
  },
  table: {
    title: 'Priority Shelters',
    columns: ['Shelter', 'District', 'Capacity', 'Occupancy', 'WASH', 'Status'],
    rows: [
      ['Buhera High School', 'Buhera', '1,200', '980', 'OK', 'Open'],
      ['Chipinge Civic Centre', 'Chipinge', '800', '760', 'Stressed', 'Open'],
      ['Chinhoyi Hall', 'Makonde', '600', '410', 'OK', 'Open'],
      ['Gutu Primary', 'Gutu', '450', '120', 'OK', 'Standby'],
    ],
  },
  progress: {
    title: 'Evacuation Progress',
    items: [
      { label: 'Zone A — riverside', pct: 88 },
      { label: 'Zone B — lowlands', pct: 64 },
      { label: 'Zone C — advisory', pct: 42 },
      { label: 'Host registration', pct: 71 },
    ],
  },
  actions: [
    { label: 'Emergency Operations', href: '/emergency-operations' },
    { label: 'Logistics', href: '/logistics-resources' },
  ],
  feed: { title: 'Shelter Updates', items: defaultFeed },
}

export const coordinationOverviewConfig: RichModuleConfig = {
  title: 'Coordination Overview',
  subtitle: 'Government, partner, 5W and regional coordination at a glance.',
  breadcrumbs: crumbs({ label: 'Coordination' }, { label: 'Overview' }),
  kpis: [
    kpi('247', 'Partners', 'Registered', Handshake, riskColors.ok),
    kpi('156', 'Interventions', '5W tracked', Activity, riskColors.info),
    kpi('24', 'Gov Agencies', 'Active', Building2, riskColors.ok),
    kpi('12', 'SADC Links', 'Regional', Globe2, riskColors.info),
    kpi('1,248', 'Call Centre (24h)', 'Contacts', Users, riskColors.major),
    kpi('18', 'Coord Meetings', 'This week', Clock, riskColors.muted),
  ],
  donut: {
    title: 'Coordination Channels',
    centerValue: '4',
    centerLabel: 'Pillars',
    segments: [
      { label: 'Government', value: 30, color: riskColors.ok },
      { label: 'Partners', value: 35, color: riskColors.info },
      { label: '5W Ops', value: 20, color: riskColors.major },
      { label: 'SADC', value: 15, color: '#7c3aed' },
    ],
  },
  table: {
    title: 'Upcoming Coordination Events',
    columns: ['Event', 'Type', 'Lead', 'When', 'Status'],
    rows: [
      ['Health cluster meeting', 'Sector', 'MoHCC', '26 Aug 09:00', 'Scheduled'],
      ['National ICC', 'Government', 'DCP', '27 Aug 10:00', 'Scheduled'],
      ['SADC DRM call', 'Regional', 'SADC', '28 Aug 14:00', 'Tentative'],
      ['5W data clinic', 'Technical', 'OCHA', '29 Aug 11:00', 'Scheduled'],
    ],
  },
  actions: [
    { label: '5W', href: '/coordination/5w' },
    { label: 'Partners', href: '/coordination/partners' },
    { label: 'Government', href: '/government-coordination' },
    { label: 'SADC', href: '/sadc-coordination' },
    { label: 'Call Centre', href: '/call-centre' },
  ],
  feed: { title: 'Coordination Feed', items: defaultFeed },
  bars: {
    title: 'Partner Engagement',
    items: [
      { label: 'Food Security', value: 48 },
      { label: 'WASH', value: 36 },
      { label: 'Health', value: 32 },
      { label: 'Shelter', value: 28 },
    ],
  },
}

export const governmentCoordinationConfig: RichModuleConfig = {
  title: 'Government Coordination',
  subtitle: 'Ministries, provincial structures and national ICC alignment.',
  breadcrumbs: crumbs({ label: 'Coordination', href: '/coordination' }, { label: 'Government Coordination' }),
  kpis: [
    kpi('28', 'Ministries', 'Engaged', Building2, riskColors.ok),
    kpi('10', 'Provinces', 'Reporting', MapPin, riskColors.info),
    kpi('63', 'Districts', 'Linked', Shield, riskColors.ok),
    kpi('6', 'ICC Actions', 'Open', Activity, riskColors.major),
    kpi('92%', 'Reporting Rate', 'This week', CheckCircle2, riskColors.ok),
    kpi('14', 'Cabinet Notes', 'YTD', FileText, riskColors.muted),
  ],
  statusCards: [
    { label: 'National ICC', value: 'Active' },
    { label: 'Provincial EOCs', value: '10/10' },
    { label: 'Sector leads', value: '15' },
    { label: 'Outstanding tasks', value: '6' },
  ],
  table: {
    title: 'Ministry Action Tracker',
    columns: ['Ministry', 'Lead action', 'Province focus', 'Due', 'Status'],
    rows: [
      ['Lands / Agriculture', 'Input distribution', 'Masvingo', '30 Aug', 'On track'],
      ['Health', 'Cholera surge', 'Harare', '28 Aug', 'At risk'],
      ['Local Government', 'Shelter sites', 'Manicaland', '27 Aug', 'On track'],
      ['Transport', 'Road clearance', 'Mash. West', '26 Aug', 'Delayed'],
    ],
  },
  progress: {
    title: 'Provincial Reporting',
    items: [
      { label: 'Manicaland', pct: 96 },
      { label: 'Masvingo', pct: 88 },
      { label: 'Mashonaland West', pct: 84 },
      { label: 'Midlands', pct: 79 },
    ],
  },
  actions: [
    { label: 'Coordination Overview', href: '/coordination' },
    { label: 'National COP', href: '/national-cop' },
  ],
  feed: { title: 'Government Updates', items: defaultFeed },
}

export const sadcCoordinationConfig: RichModuleConfig = {
  title: 'SADC Regional Coordination',
  subtitle: 'Cross-border hazards, regional requests and SADC DRM linkages.',
  breadcrumbs: crumbs({ label: 'Coordination', href: '/coordination' }, { label: 'SADC Regional Coordination' }),
  kpis: [
    kpi('12', 'SADC Links', 'Active channels', Globe2, riskColors.info),
    kpi('4', 'Cross-border Hazards', 'Shared watch', AlertTriangle, riskColors.major),
    kpi('3', 'Mutual Aid Requests', 'Open', Handshake, riskColors.active),
    kpi('8', 'Member Updates', 'This month', FileBarChart, riskColors.ok),
    kpi('2', 'Joint Exercises', 'Scheduled', Activity, riskColors.info),
    kpi('1', 'Regional Sitrep', 'Draft', FileText, riskColors.muted),
  ],
  table: {
    title: 'Regional Issues',
    columns: ['Issue', 'Countries', 'Hazard', 'Status', 'Next step'],
    rows: [
      ['Limpopo basin flood watch', 'ZW / MZ / SA', 'Flood', 'Watch', 'Joint bulletin'],
      ['Drought corridor sharing', 'ZW / BW / ZM', 'Drought', 'Active', 'Data exchange'],
      ['Cholera border alert', 'ZW / MZ', 'Health', 'Warning', 'Surveillance sync'],
    ],
  },
  bars: {
    title: 'Regional Engagement',
    items: [
      { label: 'Information sharing', value: 78 },
      { label: 'Joint assessments', value: 54 },
      { label: 'Resource requests', value: 42 },
      { label: 'Exercises / drills', value: 36 },
    ],
  },
  actions: [
    { label: 'Coordination Overview', href: '/coordination' },
    { label: 'Partners', href: '/coordination/partners' },
  ],
  feed: { title: 'SADC Feed', items: defaultFeed },
  notes: ['Demo regional layer — no live SADC API connected.'],
}

export const recoveryOverviewConfig: RichModuleConfig = {
  title: 'Recovery Overview',
  subtitle: 'Loss & damage, recovery progress, build back better and resilience.',
  breadcrumbs: crumbs({ label: 'Recovery' }, { label: 'Overview' }),
  kpis: [
    kpi('$48.2M', 'Est. Damage', 'Working total', TrendingDown, riskColors.critical),
    kpi('62%', 'Recovery Progress', 'Priority sectors', RefreshCw, riskColors.ok),
    kpi('148', 'BBB Projects', 'Pipeline', Building2, riskColors.info),
    kpi('41', 'Resilience Actions', 'Active', Shield, riskColors.ok),
    kpi('9', 'Districts', 'Recovery focus', MapPin, riskColors.major),
    kpi('$12.6M', 'Recovery Finance', 'Committed', DollarSign, riskColors.info),
  ],
  pipeline: {
    title: 'Recovery Pathway',
    steps: [
      { label: 'Damage', count: 9 },
      { label: 'Plan', count: 7, active: true },
      { label: 'Finance', count: 5 },
      { label: 'Implement', count: 4 },
      { label: 'Resilience', count: 3 },
    ],
  },
  progress: {
    title: 'Sector Recovery',
    items: [
      { label: 'Housing', pct: 58 },
      { label: 'Infrastructure', pct: 46 },
      { label: 'Livelihoods', pct: 62 },
      { label: 'Social services', pct: 71 },
    ],
  },
  table: {
    title: 'Priority Recovery Files',
    columns: ['District', 'Damage est.', 'Progress', 'BBB flag', 'Lead'],
    rows: [
      ['Buhera', '$8.4M', '54%', 'Yes', 'Local Gov'],
      ['Chipinge', '$6.1M', '48%', 'Yes', 'DCP'],
      ['Chiredzi', '$5.2M', '61%', 'Partial', 'Agriculture'],
      ['Makonde', '$3.8M', '72%', 'No', 'Local Gov'],
    ],
  },
  actions: [
    { label: 'Loss & Damage', href: '/damage-loss' },
    { label: 'Recovery Progress', href: '/recovery' },
    { label: 'Build Back Better', href: '/build-back-better' },
    { label: 'Resilience', href: '/resilience' },
  ],
  feed: { title: 'Recovery Feed', items: defaultFeed },
}

export const damageLossConfig: RichModuleConfig = {
  title: 'Loss & Damage',
  subtitle: 'Quantified losses across housing, infrastructure, agriculture and services.',
  breadcrumbs: crumbs({ label: 'Recovery', href: '/recovery-overview' }, { label: 'Loss & Damage' }),
  kpis: [
    kpi('$48.2M', 'Total Est. Damage', 'Multi-sector', TrendingDown, riskColors.critical),
    kpi('12,480', 'Homes Damaged', 'Partial + total', Tent, riskColors.major),
    kpi('148', 'Infra Assets', 'Roads / bridges / schools', Building2, riskColors.major),
    kpi('210k ha', 'Crops Lost/Damaged', 'Season', AlertTriangle, riskColors.active),
    kpi('84', 'Public Facilities', 'Affected', Building2, riskColors.info),
    kpi('9', 'District Assessments', 'Complete', CheckCircle2, riskColors.ok),
  ],
  donut: {
    title: 'Damage by Sector',
    centerValue: '$48M',
    centerLabel: 'Total',
    segments: [
      { label: 'Housing', value: 34, color: '#7c3aed' },
      { label: 'Infrastructure', value: 28, color: riskColors.info },
      { label: 'Agriculture', value: 22, color: riskColors.ok },
      { label: 'Social services', value: 16, color: riskColors.major },
    ],
  },
  table: {
    title: 'Damage Register',
    columns: ['Asset / area', 'Sector', 'District', 'Severity', 'Est. cost', 'Verified'],
    rows: [
      ['Housing stock — Buhera', 'Housing', 'Buhera', 'Major', '$4.2M', 'Yes'],
      ['Save bridge approach', 'Infrastructure', 'Makonde', 'Critical', '$1.1M', 'Yes'],
      ['Maize belt loss', 'Agriculture', 'Chiredzi', 'Major', '$3.6M', 'Partial'],
      ['Clinic wing', 'Health', 'Chipinge', 'Moderate', '$0.4M', 'Yes'],
    ],
  },
  map: {
    title: 'Damage Concentration',
    provinceColors: riskMapColors,
    legend: riskLegend,
  },
  actions: [
    { label: 'Recovery Progress', href: '/recovery' },
    { label: 'Build Back Better', href: '/build-back-better' },
  ],
  feed: { title: 'Assessment Updates', items: defaultFeed },
}

export const recoveryProgressConfig: RichModuleConfig = {
  title: 'Recovery Progress',
  subtitle: 'Track implementation of recovery plans against damage baselines.',
  breadcrumbs: crumbs({ label: 'Recovery', href: '/recovery-overview' }, { label: 'Recovery Progress' }),
  kpis: [
    kpi('62%', 'Overall Progress', 'Priority package', RefreshCw, riskColors.ok),
    kpi('148', 'Projects', 'In portfolio', Package, riskColors.info),
    kpi('84', 'Active', 'Underway', Activity, riskColors.major),
    kpi('32', 'Completed', 'This season', CheckCircle2, riskColors.ok),
    kpi('$12.6M', 'Spend to Date', 'Of $18.4M', DollarSign, riskColors.info),
    kpi('9', 'Districts', 'Reporting', MapPin, riskColors.ok),
  ],
  progress: {
    title: 'District Progress',
    items: [
      { label: 'Makonde', pct: 72 },
      { label: 'Chiredzi', pct: 61 },
      { label: 'Buhera', pct: 54 },
      { label: 'Chipinge', pct: 48 },
    ],
  },
  table: {
    title: 'Flagship Projects',
    columns: ['Project', 'District', 'Sector', 'Progress', 'Budget', 'Status'],
    rows: [
      ['Housing repair phase 1', 'Buhera', 'Housing', '54%', '$2.1M', 'Active'],
      ['Bridge rehabilitation', 'Makonde', 'Infra', '68%', '$1.1M', 'Active'],
      ['Livelihood vouchers', 'Chiredzi', 'Livelihoods', '71%', '$0.9M', 'Active'],
      ['School rehab', 'Chipinge', 'Education', '42%', '$0.6M', 'Delayed'],
    ],
  },
  bars: {
    title: 'Spend vs Plan',
    items: [
      { label: 'Housing', value: 58, suffix: '58%' },
      { label: 'Infrastructure', value: 46, suffix: '46%' },
      { label: 'Livelihoods', value: 72, suffix: '72%' },
      { label: 'Social services', value: 64, suffix: '64%' },
    ],
  },
  actions: [
    { label: 'Loss & Damage', href: '/damage-loss' },
    { label: 'Build Back Better', href: '/build-back-better' },
  ],
  feed: { title: 'Progress Updates', items: defaultFeed },
}

export const buildBackBetterConfig: RichModuleConfig = {
  title: 'Build Back Better',
  subtitle: 'Resilient reconstruction standards, BBB-tagged projects and risk reduction.',
  breadcrumbs: crumbs({ label: 'Recovery', href: '/recovery-overview' }, { label: 'Build Back Better' }),
  kpis: [
    kpi('148', 'BBB Projects', 'Tagged', Building2, riskColors.info),
    kpi('67%', 'BBB Compliance', 'Design standards', Shield, riskColors.ok),
    kpi('42', 'Retrofit Sites', 'Priority', RefreshCw, riskColors.major),
    kpi('18', 'Code Upgrades', 'In review', FileText, riskColors.active),
    kpi('$4.8M', 'BBB Premium', 'Incremental cost', DollarSign, riskColors.info),
    kpi('11', 'Training Cohorts', 'Local artisans', Users, riskColors.ok),
  ],
  table: {
    title: 'BBB Project Pipeline',
    columns: ['Project', 'Hazard focus', 'Standard', 'Status', 'District'],
    rows: [
      ['Elevated housing pads', 'Flood', 'BBB-Flood-01', 'Design', 'Buhera'],
      ['Cyclone roofing kits', 'Cyclone', 'BBB-Wind-02', 'Procurement', 'Chipinge'],
      ['Drought-resilient water points', 'Drought', 'BBB-WASH-03', 'Active', 'Chiredzi'],
      ['Firebreak community crews', 'Fire', 'BBB-Fire-01', 'Active', 'Hwange'],
    ],
  },
  progress: {
    title: 'Standards Adoption',
    items: [
      { label: 'Flood-resilient housing', pct: 62 },
      { label: 'Wind-resistant schools', pct: 48 },
      { label: 'Climate-smart WASH', pct: 71 },
      { label: 'Safer health facilities', pct: 55 },
    ],
  },
  actions: [
    { label: 'Recovery Progress', href: '/recovery' },
    { label: 'Resilience', href: '/resilience' },
  ],
  feed: { title: 'BBB Updates', items: defaultFeed },
}

export const resilienceConfig: RichModuleConfig = {
  title: 'Resilience',
  subtitle: 'Community resilience actions, capacity building and risk reduction investments.',
  breadcrumbs: crumbs({ label: 'Recovery', href: '/recovery-overview' }, { label: 'Resilience' }),
  kpis: [
    kpi('41', 'Active Actions', 'Community level', Shield, riskColors.ok),
    kpi('126', 'Committees', 'Trained', Users, riskColors.info),
    kpi('18', 'Risk Plans', 'Updated', FileText, riskColors.ok),
    kpi('9', 'Districts', 'Focus', MapPin, riskColors.major),
    kpi('$3.2M', 'Resilience Spend', 'YTD', DollarSign, riskColors.info),
    kpi('74', 'Early Warning Groups', 'Functional', Activity, riskColors.ok),
  ],
  bars: {
    title: 'Resilience Pillars',
    items: [
      { label: 'Preparedness', value: 78 },
      { label: 'Social protection', value: 64 },
      { label: 'Infrastructure', value: 52 },
      { label: 'Ecosystems', value: 46 },
      { label: 'Governance', value: 71 },
    ],
  },
  table: {
    title: 'Resilience Actions',
    columns: ['Action', 'District', 'Pillar', 'People', 'Status'],
    rows: [
      ['Community EW drills', 'Buhera', 'Preparedness', '12,400', 'Active'],
      ['Watershed restoration', 'Chipinge', 'Ecosystems', '8,200', 'Active'],
      ['Village savings + DRR', 'Chiredzi', 'Social protection', '6,100', 'Active'],
      ['School safety plans', 'Makoni', 'Governance', '4,800', 'Planned'],
    ],
  },
  actions: [
    { label: 'Build Back Better', href: '/build-back-better' },
    { label: 'Knowledge / Lessons', href: '/lessons-learned' },
  ],
  feed: { title: 'Resilience Feed', items: defaultFeed },
}

export const knowledgeOverviewConfig: RichModuleConfig = {
  title: 'Knowledge Overview',
  subtitle: 'Reports, analytics, lessons learned, IKS and the knowledge repository.',
  breadcrumbs: crumbs({ label: 'Knowledge' }, { label: 'Overview' }),
  kpis: [
    kpi('312', 'Reports', 'Published library', FileBarChart, riskColors.info),
    kpi('48', 'Analytics Views', 'Curated', BarChart3, riskColors.ok),
    kpi('86', 'Lessons', 'Captured', BookOpen, riskColors.major),
    kpi('24', 'IKS Entries', 'Documented', Users, riskColors.active),
    kpi('1,042', 'Repository Assets', 'Documents / media', Database, riskColors.info),
    kpi('19', 'New this month', 'Uploads', CheckCircle2, riskColors.ok),
  ],
  table: {
    title: 'Recent Knowledge Products',
    columns: ['Title', 'Type', 'Owner', 'Date', 'Access'],
    rows: [
      ['National Flood SITREP #14', 'Report', 'NEOC', '25 Aug', 'Internal'],
      ['Drought AA After-Action', 'Lesson', 'AA Unit', '22 Aug', 'Internal'],
      ['IKS rainfall signs — Matabeleland', 'IKS', 'Community', '18 Aug', 'Shared'],
      ['Multi-hazard risk analytics Q2', 'Analytics', 'Risk Unit', '12 Aug', 'Internal'],
    ],
  },
  actions: [
    { label: 'Reports', href: '/reports' },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Lessons Learned', href: '/lessons-learned' },
    { label: 'IKS', href: '/iks' },
    { label: 'Repository', href: '/knowledge-repository' },
  ],
  feed: { title: 'Knowledge Feed', items: defaultFeed },
  bars: {
    title: 'Usage this month',
    items: [
      { label: 'Report downloads', value: 420 },
      { label: 'Analytics views', value: 310 },
      { label: 'Repository searches', value: 280 },
      { label: 'IKS contributions', value: 36 },
    ],
  },
}

export const reportsConfig: RichModuleConfig = {
  title: 'Reports',
  subtitle: 'SITREPs, briefing packs and statutory disaster reports.',
  breadcrumbs: crumbs({ label: 'Knowledge', href: '/knowledge' }, { label: 'Reports' }),
  kpis: [
    kpi('312', 'Reports', 'Library', FileBarChart, riskColors.info),
    kpi('14', 'SITREPs', 'This incident cycle', Siren, riskColors.major),
    kpi('6', 'In Draft', 'Awaiting clearance', FileText, riskColors.active),
    kpi('28', 'Published (30d)', 'Cleared', CheckCircle2, riskColors.ok),
    kpi('9', 'Audiences', 'Templates', Users, riskColors.muted),
    kpi('25 Aug', 'Latest', '15:40 CAT', Clock, riskColors.ok),
  ],
  table: {
    title: 'Report Register',
    columns: ['Report', 'Type', 'Period', 'Owner', 'Status'],
    rows: [
      ['National SITREP #14', 'SITREP', '25 Aug', 'NEOC', 'Published'],
      ['Ministerial brief — floods', 'Brief', '24 Aug', 'DCP', 'Published'],
      ['Weekly EW bulletin', 'Bulletin', '18–25 Aug', 'EW Unit', 'Draft'],
      ['Partner coordination note', 'Note', '23 Aug', 'Coord', 'Published'],
    ],
  },
  list: {
    title: 'Templates',
    items: [
      { label: 'National SITREP', badge: 'Ready' },
      { label: 'Provincial EOC report', badge: 'Ready' },
      { label: 'Cabinet note', badge: 'Ready' },
      { label: 'Public advisory', badge: 'Ready' },
    ],
  },
  actions: [
    { label: 'Analytics', href: '/analytics' },
    { label: 'Repository', href: '/knowledge-repository' },
  ],
  feed: { title: 'Publishing Queue', items: defaultFeed },
}

export const analyticsConfig: RichModuleConfig = {
  title: 'Analytics',
  subtitle: 'Curated analytical views across warning, response, coordination and recovery.',
  breadcrumbs: crumbs({ label: 'Knowledge', href: '/knowledge' }, { label: 'Analytics' }),
  kpis: [
    kpi('48', 'Curated Views', 'Production', BarChart3, riskColors.info),
    kpi('12', 'Live Boards', 'Refreshing', Activity, riskColors.ok),
    kpi('6', 'Hazard Models', 'Linked', ShieldAlert, riskColors.major),
    kpi('92%', 'Data freshness', 'SLA', CheckCircle2, riskColors.ok),
    kpi('34', 'Sources', 'In warehouse', Database, riskColors.info),
    kpi('8', 'Exports today', 'CSV / PDF', FileBarChart, riskColors.muted),
  ],
  bars: {
    title: 'Top Analytics Views',
    items: [
      { label: 'Alert volume trends', value: 96 },
      { label: 'Response coverage 5W', value: 84 },
      { label: 'Shelter occupancy', value: 72 },
      { label: 'AA trigger probability', value: 68 },
    ],
  },
  table: {
    title: 'Featured Analytics',
    columns: ['View', 'Domain', 'Refresh', 'Owner', 'Access'],
    rows: [
      ['72h hazard outlook', 'Early Warning', '15 min', 'EW', 'Ops'],
      ['Assistance vs PIN', 'Response', '1h', 'Ops', 'Ops'],
      ['Partner presence map', 'Coordination', '6h', 'Coord', 'Shared'],
      ['Recovery burn rate', 'Recovery', 'Daily', 'Recovery', 'Ops'],
    ],
  },
  actions: [
    { label: 'Reports', href: '/reports' },
    { label: 'Risk Explorer', href: '/risk-intelligence/risk-explorer' },
  ],
  feed: { title: 'Analytics Activity', items: defaultFeed },
}

export const lessonsLearnedConfig: RichModuleConfig = {
  title: 'Lessons Learned',
  subtitle: 'After-action reviews, corrective actions and institutional learning.',
  breadcrumbs: crumbs({ label: 'Knowledge', href: '/knowledge' }, { label: 'Lessons Learned' }),
  kpis: [
    kpi('86', 'Lessons Captured', 'Library', BookOpen, riskColors.major),
    kpi('22', 'Open Actions', 'Corrective', AlertTriangle, riskColors.critical),
    kpi('14', 'AARs', 'This year', FileText, riskColors.info),
    kpi('61%', 'Actions Closed', 'YTD', CheckCircle2, riskColors.ok),
    kpi('9', 'Hazards Covered', 'Multi-hazard', ShieldAlert, riskColors.ok),
    kpi('5', 'In Review', 'Pending validation', Clock, riskColors.active),
  ],
  table: {
    title: 'Lesson Register',
    columns: ['Lesson', 'Event', 'Theme', 'Priority', 'Status'],
    rows: [
      ['Pre-position WASH earlier', 'Flood 2026', 'Logistics', 'High', 'Open'],
      ['Clarify AA trigger comms', 'Drought AA', 'Anticipation', 'High', 'In progress'],
      ['Improve shelter WASH ratios', 'Flood 2026', 'Shelter', 'Medium', 'Open'],
      ['SADC data exchange lag', 'Regional', 'Coordination', 'Medium', 'Closed'],
    ],
  },
  progress: {
    title: 'Corrective Action Closure',
    items: [
      { label: 'Logistics', pct: 68 },
      { label: 'Early warning', pct: 74 },
      { label: 'Coordination', pct: 55 },
      { label: 'Shelter', pct: 42 },
    ],
  },
  actions: [
    { label: 'Reports', href: '/reports' },
    { label: 'IKS', href: '/iks' },
  ],
  feed: { title: 'Learning Feed', items: defaultFeed },
}

export const iksConfig: RichModuleConfig = {
  title: 'Indigenous Knowledge Systems (IKS)',
  subtitle: 'Community observations, traditional indicators and local early warning practices.',
  breadcrumbs: crumbs({ label: 'Knowledge', href: '/knowledge' }, { label: 'IKS' }),
  kpis: [
    kpi('24', 'IKS Entries', 'Documented', BookOpen, riskColors.active),
    kpi('16', 'Communities', 'Contributing', Users, riskColors.ok),
    kpi('7', 'Provinces', 'Covered', MapPin, riskColors.info),
    kpi('11', 'Validated', 'With science', CheckCircle2, riskColors.ok),
    kpi('5', 'In Review', 'Pending', Clock, riskColors.major),
    kpi('3', 'Linked to EW', 'Operationalised', Zap, riskColors.info),
  ],
  table: {
    title: 'IKS Catalogue',
    columns: ['Indicator', 'Community', 'Hazard link', 'Season', 'Status'],
    rows: [
      ['Bird migration patterns', 'Matabeleland', 'Drought', 'Pre-rain', 'Validated'],
      ['River colour / smell', 'Save basin', 'Flood', 'Rainy', 'Linked to EW'],
      ['Tree flowering timing', 'Manicaland', 'Drought', 'Pre-rain', 'In review'],
      ['Wind direction lore', 'Chimanimani', 'Cyclone', 'Seasonal', 'Documented'],
    ],
  },
  list: {
    title: 'Engagement',
    items: [
      { label: 'Community dialogues', badge: '8' },
      { label: 'Elder interviews', badge: '22' },
      { label: 'School IKS clubs', badge: '6' },
      { label: 'Joint validation workshops', badge: '4' },
    ],
  },
  actions: [
    { label: 'Lessons Learned', href: '/lessons-learned' },
    { label: 'Repository', href: '/knowledge-repository' },
  ],
  feed: { title: 'IKS Contributions', items: defaultFeed },
}

export const knowledgeRepositoryConfig: RichModuleConfig = {
  title: 'Knowledge Repository',
  subtitle: 'Central repository for SOPs, maps, media, guidance and archival products.',
  breadcrumbs: crumbs({ label: 'Knowledge', href: '/knowledge' }, { label: 'Knowledge Repository' }),
  kpis: [
    kpi('1,042', 'Assets', 'All types', Database, riskColors.info),
    kpi('186', 'SOPs / Guidance', 'Controlled', FileText, riskColors.ok),
    kpi('240', 'Maps / GIS', 'Published', MapPin, riskColors.major),
    kpi('310', 'Media', 'Photos / video', Package, riskColors.active),
    kpi('19', 'Uploads (30d)', 'New', CheckCircle2, riskColors.ok),
    kpi('64', 'Collections', 'Curated', BookOpen, riskColors.muted),
  ],
  table: {
    title: 'Recent Assets',
    columns: ['Asset', 'Type', 'Collection', 'Updated', 'Access'],
    rows: [
      ['National Contingency Plan 2026', 'Document', 'Plans', '20 Aug', 'Internal'],
      ['Flood SOP — Save Basin', 'SOP', 'SOPs', '18 Aug', 'Ops'],
      ['Province risk atlas v3', 'GIS', 'Maps', '12 Aug', 'Shared'],
      ['AA activation checklist', 'Guidance', 'Anticipation', '10 Aug', 'Ops'],
    ],
  },
  bars: {
    title: 'Repository Composition',
    items: [
      { label: 'Documents', value: 42, suffix: '42%' },
      { label: 'Maps / GIS', value: 23, suffix: '23%' },
      { label: 'Media', value: 30, suffix: '30%' },
      { label: 'Other', value: 5, suffix: '5%' },
    ],
  },
  actions: [
    { label: 'Digital SOPs', href: '/digital-sops' },
    { label: 'Reports', href: '/reports' },
  ],
  feed: { title: 'Repository Activity', items: defaultFeed },
}

export const digitalSopsConfig: RichModuleConfig = {
  title: 'Digital SOPs',
  subtitle: 'Controlled digital standard operating procedures for DCP operations.',
  breadcrumbs: crumbs({ label: 'Administration' }, { label: 'Digital SOPs' }),
  kpis: [
    kpi('186', 'SOPs', 'Controlled docs', FileText, riskColors.ok),
    kpi('42', 'Active Versions', 'Current', CheckCircle2, riskColors.info),
    kpi('11', 'In Review', 'Due update', Clock, riskColors.major),
    kpi('8', 'Hazard Playbooks', 'Multi-hazard', ShieldAlert, riskColors.active),
    kpi('96%', 'Staff Ack.', 'Read & sign', Users, riskColors.ok),
    kpi('3', 'Overdue', 'Past review date', AlertTriangle, riskColors.critical),
  ],
  table: {
    title: 'SOP Catalogue',
    columns: ['SOP', 'Domain', 'Version', 'Owner', 'Status'],
    rows: [
      ['National EOC Activation', 'Command', '2.4', 'NEOC', 'Current'],
      ['Flood Response Playbook', 'Response', '1.8', 'Ops', 'Current'],
      ['AA Trigger Protocol', 'Anticipation', '1.3', 'AA Unit', 'In review'],
      ['Public Alert Issuance', 'EW', '2.1', 'EW Unit', 'Current'],
    ],
  },
  actions: [
    { label: 'Repository', href: '/knowledge-repository' },
    { label: 'Users & Roles', href: '/users-roles' },
  ],
  feed: { title: 'SOP Changes', items: defaultFeed },
}

export const usersRolesConfig: RichModuleConfig = {
  title: 'Access Control — Users & Roles',
  subtitle: 'Demo access control matrix for ZIM-DRIMS roles and permissions (UI only).',
  breadcrumbs: crumbs({ label: 'Administration' }, { label: 'Users & Roles' }),
  primaryAction: 'Invite User',
  kpis: [
    kpi('248', 'Users', 'Active accounts', Users, riskColors.info),
    kpi('12', 'Roles', 'Defined', Shield, riskColors.ok),
    kpi('34', 'Pending Invites', 'Awaiting', Clock, riskColors.active),
    kpi('6', 'Locked', 'Security hold', AlertTriangle, riskColors.major),
    kpi('18', 'Agencies', 'Tenants', Building2, riskColors.ok),
    kpi('99.2%', 'MFA Coverage', 'Demo metric', CheckCircle2, riskColors.ok),
  ],
  table: {
    title: 'Role Matrix (Demo)',
    columns: ['Role', 'Users', 'Modules', 'Write', 'Approve', 'Admin'],
    rows: [
      ['DCP Administrator', '6', 'All', 'Yes', 'Yes', 'Yes'],
      ['NEOC Officer', '28', 'Command/Response', 'Yes', 'Limited', 'No'],
      ['Provincial EOC', '40', 'Province scoped', 'Yes', 'No', 'No'],
      ['Partner Viewer', '96', 'Coordination read', 'No', 'No', 'No'],
      ['Public Publisher', '8', 'Public module', 'Limited', 'Yes', 'No'],
    ],
  },
  list: {
    title: 'Recent Access Events',
    items: [
      { label: 'Role change — Partner Viewer', badge: 'Today' },
      { label: 'Invite accepted — Masvingo EOC', badge: 'Today' },
      { label: 'MFA reset — NEOC Officer', badge: 'Yesterday' },
      { label: 'Deactivated dormant account', badge: '2d ago' },
    ],
  },
  statusCards: [
    { label: 'SSO Connected', value: 'Demo' },
    { label: 'Audit Log', value: 'On' },
    { label: 'Session Policy', value: '8h' },
    { label: 'Privilege Reviews', value: 'Q3' },
  ],
  notes: [
    'Access control is demonstration-only — no real authentication is enforced in this build.',
    'Use this screen to walk stakeholders through intended role separation.',
  ],
  actions: [
    { label: 'System Administration', href: '/system-administration' },
    { label: 'Data Sources', href: '/data-sources' },
  ],
  feed: { title: 'Access Audit (Demo)', items: defaultFeed },
}

export const dataSourcesConfig: RichModuleConfig = {
  title: 'Data Sources',
  subtitle: 'Connected feeds, freshness and stewardship for ZIM-DRIMS data.',
  breadcrumbs: crumbs({ label: 'Administration' }, { label: 'Data Sources' }),
  kpis: [
    kpi('34', 'Active Sources', 'Connected', Database, riskColors.ok),
    kpi('18', 'Systems', 'Integrated', Settings, riskColors.info),
    kpi('96%', 'Freshness SLA', 'Met', CheckCircle2, riskColors.ok),
    kpi('3', 'Degraded', 'Needs attention', AlertTriangle, riskColors.major),
    kpi('12', 'Owners', 'Stewards', Users, riskColors.muted),
    kpi('5 min', 'Fastest Feed', 'EW sensors', Clock, riskColors.info),
  ],
  table: {
    title: 'Source Catalogue',
    columns: ['Source', 'Domain', 'Cadence', 'Health', 'Owner'],
    rows: [
      ['Met Services forecasts', 'Early Warning', '15 min', 'Healthy', 'MSD'],
      ['ZINWA river gauges', 'Hydrology', '5 min', 'Healthy', 'ZINWA'],
      ['DCP incident forms', 'Response', 'Near real-time', 'Healthy', 'DCP'],
      ['Partner 5W upload', 'Coordination', 'Daily', 'Degraded', 'OCHA'],
      ['ZimVAC indicators', 'Risk', 'Seasonal', 'Healthy', 'FNC'],
    ],
  },
  progress: {
    title: 'Ingestion Health',
    items: [
      { label: 'Early Warning feeds', pct: 98 },
      { label: 'Response ops data', pct: 94 },
      { label: 'Coordination 5W', pct: 78 },
      { label: 'Recovery finance', pct: 86 },
    ],
  },
  actions: [
    { label: 'System Administration', href: '/system-administration' },
    { label: 'Analytics', href: '/analytics' },
  ],
  feed: { title: 'Source Alerts', items: defaultFeed },
}

export const systemAdminConfig: RichModuleConfig = {
  title: 'System Administration',
  subtitle: 'Platform health, configuration and operational administration (demo).',
  breadcrumbs: crumbs({ label: 'Administration' }, { label: 'System Administration' }),
  kpis: [
    kpi('99.8%', 'Uptime', '30-day', Activity, riskColors.ok),
    kpi('18', 'Services', 'Healthy', Settings, riskColors.info),
    kpi('2', 'Incidents', 'Open (IT)', AlertTriangle, riskColors.major),
    kpi('34', 'Jobs', 'Scheduled', Clock, riskColors.ok),
    kpi('6', 'Environments', 'Tracked', Database, riskColors.muted),
    kpi('v2.0.0', 'Release', 'Current', CheckCircle2, riskColors.ok),
  ],
  statusCards: [
    { label: 'API Gateway', value: 'OK' },
    { label: 'Map Tiles', value: 'OK' },
    { label: 'Notify Bus', value: 'Degraded' },
    { label: 'Search Index', value: 'OK' },
  ],
  table: {
    title: 'Admin Tasks',
    columns: ['Task', 'Owner', 'Priority', 'Due', 'Status'],
    rows: [
      ['Rotate demo API keys', 'Platform', 'Medium', '30 Aug', 'Open'],
      ['Notify bus capacity', 'SRE', 'High', '26 Aug', 'In progress'],
      ['Archive Q1 logs', 'Platform', 'Low', '15 Sep', 'Scheduled'],
      ['UAT refresh', 'QA', 'Medium', '01 Sep', 'Open'],
    ],
  },
  actions: [
    { label: 'Users & Roles', href: '/users-roles' },
    { label: 'Data Sources', href: '/data-sources' },
    { label: 'Public Dashboard', href: '/public' },
  ],
  feed: { title: 'Platform Events', items: defaultFeed },
  notes: ['System administration controls are non-functional in this demo build.'],
}
