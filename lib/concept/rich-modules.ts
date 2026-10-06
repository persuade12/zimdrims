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
import { mapStories } from '@/lib/concept/map-stories'

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
  return [{ label: 'Home', href: '/ops' }, ...parts]
}

export const nationalCopConfig: RichModuleConfig = {
  title: 'NEOC Executive Dashboard',
  subtitle: 'National Common Operating Picture for the DCP Emergency Operations Centre.',
  breadcrumbs: crumbs({ label: 'NEOC' }, { label: 'Executive Dashboard' }),
  primaryAction: 'Generate Brief',
  kpis: [
    kpi('14', 'Active Alerts', 'Nationwide', ShieldAlert, riskColors.critical),
    kpi('23', 'Active Incidents', '7 provinces', Siren, riskColors.major),
    kpi('312,450', 'People at Risk', '9 districts', Users, riskColors.info),
    kpi('OPERATIONAL', 'EOC Status', 'National DCP EOC', Activity, riskColors.ok),
    kpi('87%', 'National Readiness', 'Multi-hazard', Shield, riskColors.ok),
    kpi('26', 'Live Data Sources', 'Feeds connected', Database, riskColors.info),
  ],
  map: mapStories.neoc,
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
    { label: 'Open Early Warning', href: '/ops/early-warning' },
    { label: 'Response Overview', href: '/ops/response' },
    { label: 'Trigger Monitor', href: '/ops/trigger-monitor' },
    { label: 'Public Site', href: '/' },
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
  map: mapStories.earlyWarning,
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
    { label: 'All Hazards', href: '/ops/early-warning/all-hazards' },
    { label: 'Flood Dashboard', href: '/ops/early-warning/flood' },
    { label: 'Drought Dashboard', href: '/ops/early-warning/drought' },
    { label: 'Risk Map', href: '/ops/risk-intelligence/risk-map' },
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
      { label: 'Early Warning', href: '/ops/early-warning' },
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
      ...mapStories.earlyWarning,
      title: `${hazard} Risk Map`,
      story: {
        headline: `${hazard} monitoring story — watch thresholds and districts under elevated attention.`,
        beats: [
          `Active ${hazard.toLowerCase()} signals are overlaid on the national multi-hazard picture.`,
          'Hotspots and lead times guide SOP activation and public messaging.',
          'Tap a province for the local exposure story.',
        ],
      },
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
      { label: 'Early Warning Hub', href: '/ops/early-warning' },
      { label: 'NEOC Dashboard', href: '/ops/national-cop' },
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
  map: mapStories.risk,
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
    { label: 'Risk Map', href: '/ops/risk-intelligence/risk-map' },
    { label: 'Risk Explorer', href: '/ops/risk-intelligence/risk-explorer' },
    { label: 'Impact Intelligence', href: '/ops/impact-intelligence' },
    { label: 'Needs Assessment', href: '/ops/needs-assessment' },
  ],
  feed: { title: 'Risk Updates', items: defaultFeed },
}

export const riskMapConfig: RichModuleConfig = {
  ...riskIntelligenceConfig,
  title: 'Risk Map',
  subtitle: 'Interactive multi-hazard risk choropleth and hotspot layers.',
  breadcrumbs: crumbs(
    { label: 'Command' },
    { label: 'Risk Intelligence', href: '/ops/risk-intelligence' },
    { label: 'Risk Map' },
  ),
  primaryAction: 'Export Map',
}

export const riskExplorerConfig: RichModuleConfig = {
  title: 'Risk Explorer',
  subtitle: 'Explore hazard exposure, vulnerability and capacity indicators by geography.',
  breadcrumbs: crumbs(
    { label: 'Command' },
    { label: 'Risk Intelligence', href: '/ops/risk-intelligence' },
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
  map: mapStories.risk,
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
    { label: 'Risk Map', href: '/ops/risk-intelligence/risk-map' },
    { label: 'Needs Assessment', href: '/ops/needs-assessment' },
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
  map: mapStories.impact,
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
    { label: 'Needs Assessment', href: '/ops/needs-assessment' },
    { label: 'Response Overview', href: '/ops/response' },
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
  map: mapStories.needs,
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
    { label: '5W Coordination', href: '/ops/coordination/5w' },
    { label: 'Impact Intelligence', href: '/ops/impact-intelligence' },
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
  map: mapStories.anticipation,
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
    { label: 'Trigger Monitor', href: '/ops/trigger-monitor' },
    { label: 'Drought Anticipation', href: '/ops/anticipation/drought' },
    { label: 'Anticipatory Action', href: '/ops/anticipatory-action' },
    { label: 'Anticipatory Financing', href: '/ops/anticipatory-financing' },
  ],
  feed: { title: 'Anticipation Feed', items: defaultFeed },
}

export const triggerMonitorConfig: RichModuleConfig = {
  title: 'Trigger Monitor',
  subtitle: 'Track forecast thresholds and activation readiness across hazards.',
  breadcrumbs: crumbs({ label: 'Anticipation', href: '/ops/anticipation' }, { label: 'Trigger Monitor' }),
  primaryAction: 'Prepare Activation',
  kpis: [
    kpi('3', 'Approaching', 'Within window', Activity, riskColors.major),
    kpi('2', 'Activated', 'AA underway', Zap, riskColors.ok),
    kpi('6', 'On Watch', 'Elevated probability', Clock, riskColors.active),
    kpi('78%', 'Top trigger prob.', 'Drought SPI', AlertTriangle, riskColors.critical),
    kpi('15–30 Sep', 'Est. trigger date', 'Drought corridor', Clock, riskColors.info),
    kpi('11', 'Models live', 'Forecast sources', Database, riskColors.ok),
  ],
  map: mapStories.trigger,
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
    { label: 'Anticipatory Action', href: '/ops/anticipatory-action' },
    { label: 'Anticipatory Financing', href: '/ops/anticipatory-financing' },
  ],
  feed: { title: 'Trigger Events', items: defaultFeed },
}

export const anticipatoryFinancingConfig: RichModuleConfig = {
  title: 'Anticipatory Financing',
  subtitle: 'Pre-arranged finance windows, releases and gaps for anticipatory action.',
  breadcrumbs: crumbs({ label: 'Anticipation', href: '/ops/anticipation' }, { label: 'Anticipatory Financing' }),
  kpis: [
    kpi('$6.45M', 'Budget Required', 'Full AA portfolio', DollarSign, riskColors.ok),
    kpi('$5.00M', 'Financing Secured', '77% funded', DollarSign, riskColors.info),
    kpi('$1.45M', 'Financing Gap', 'Priority windows', AlertTriangle, riskColors.major),
    kpi('6', 'Finance Windows', 'Active instruments', Building2, riskColors.ok),
    kpi('$1.82M', 'Released YTD', 'Against triggers', CheckCircle2, riskColors.ok),
    kpi('4', 'Pending Releases', 'Awaiting trigger', Clock, riskColors.active),
  ],
  map: mapStories.financing,
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
    { label: 'Anticipatory Action', href: '/ops/anticipatory-action' },
    { label: 'Trigger Monitor', href: '/ops/trigger-monitor' },
  ],
  feed: { title: 'Finance Activity', items: defaultFeed },
}

export function hazardAnticipationConfig(slug: string, title: string, hazard: string): RichModuleConfig {
  return {
    title: `${title} Anticipation`,
    subtitle: `Hazard anticipation, triggers and readiness for ${hazard}.`,
    breadcrumbs: crumbs(
      { label: 'Anticipation', href: '/ops/anticipation' },
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
      ...mapStories.anticipation,
      title: `${hazard} Anticipation Map`,
      story: {
        headline: `${hazard} anticipation — where lead time still allows action before peak impact.`,
        beats: [
          `Forecast confidence and AA readiness are highest in priority ${hazard.toLowerCase()} districts.`,
          'Finance windows and SOPs are linked to these geographies.',
          'Select a province to see local readiness context.',
        ],
      },
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
      { label: 'Trigger Monitor', href: '/ops/trigger-monitor' },
      { label: 'Anticipatory Action', href: '/ops/anticipatory-action' },
      { label: `Open /anticipation/${slug}`, href: `/anticipation/${slug}` },
    ],
    feed: { title: `${hazard} Feed`, items: defaultFeed },
  }
}

export const incidentCommandConfig: RichModuleConfig = {
  title: 'Incident Command',
  subtitle: 'ICS structure, sector commands and field coordination for active incidents.',
  breadcrumbs: crumbs({ label: 'Response', href: '/ops/response' }, { label: 'Incident Command' }),
  primaryAction: 'Open ICS Board',
  kpis: [
    kpi('6', 'Active ICS', 'Command posts', Radio, riskColors.critical),
    kpi('23', 'Incidents Linked', 'Under command', Siren, riskColors.major),
    kpi('148', 'Field Teams', 'Deployed', Users, riskColors.info),
    kpi('42', 'Sector Leads', 'Assigned', Building2, riskColors.ok),
    kpi('18', 'Comms Channels', 'Live', Activity, riskColors.ok),
    kpi('2h 12m', 'Avg Brief Cycle', 'Last 24h', Clock, riskColors.muted),
  ],
  map: mapStories.incidentCommand,
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
    { label: 'Emergency Operations', href: '/ops/emergency-operations' },
    { label: 'Logistics', href: '/ops/logistics-resources' },
    { label: 'Search & Rescue', href: '/ops/search-rescue' },
  ],
  feed: { title: 'ICS Comms', items: defaultFeed },
}

export const sheltersEvacuationConfig: RichModuleConfig = {
  title: 'Shelters & Evacuation',
  subtitle: 'Shelter occupancy, evacuation routes and displacement tracking.',
  breadcrumbs: crumbs({ label: 'Response', href: '/ops/response' }, { label: 'Shelters & Evacuation' }),
  kpis: [
    kpi('72,450', 'People Sheltered', 'Safe locations', Tent, '#7c3aed'),
    kpi('186', 'Active Shelters', 'Open sites', Building2, riskColors.ok),
    kpi('68%', 'Occupancy', 'National average', Users, riskColors.major),
    kpi('14', 'Evacuation Zones', 'Active orders', AlertTriangle, riskColors.critical),
    kpi('9,240', 'In Transit', 'Evacuating now', Truck, riskColors.info),
    kpi('42', 'Host Communities', 'Supporting', Handshake, riskColors.ok),
  ],
  map: mapStories.shelters,
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
    { label: 'Emergency Operations', href: '/ops/emergency-operations' },
    { label: 'Logistics', href: '/ops/logistics-resources' },
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
  map: mapStories.coordination,
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
    { label: '5W', href: '/ops/coordination/5w' },
    { label: 'Partners', href: '/ops/coordination/partners' },
    { label: 'Government', href: '/ops/government-coordination' },
    { label: 'SADC', href: '/ops/sadc-coordination' },
    { label: 'Call Centre', href: '/ops/call-centre' },
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
  breadcrumbs: crumbs({ label: 'Coordination', href: '/ops/coordination' }, { label: 'Government Coordination' }),
  kpis: [
    kpi('28', 'Ministries', 'Engaged', Building2, riskColors.ok),
    kpi('10', 'Provinces', 'Reporting', MapPin, riskColors.info),
    kpi('63', 'Districts', 'Linked', Shield, riskColors.ok),
    kpi('6', 'ICC Actions', 'Open', Activity, riskColors.major),
    kpi('92%', 'Reporting Rate', 'This week', CheckCircle2, riskColors.ok),
    kpi('14', 'Cabinet Notes', 'YTD', FileText, riskColors.muted),
  ],
  map: mapStories.government,
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
    { label: 'Coordination Overview', href: '/ops/coordination' },
    { label: 'NEOC Dashboard', href: '/ops/national-cop' },
  ],
  feed: { title: 'Government Updates', items: defaultFeed },
}

export const sadcCoordinationConfig: RichModuleConfig = {
  title: 'SADC Regional Coordination',
  subtitle: 'Cross-border hazards, regional requests and SADC DRM linkages.',
  breadcrumbs: crumbs({ label: 'Coordination', href: '/ops/coordination' }, { label: 'SADC Regional Coordination' }),
  kpis: [
    kpi('12', 'SADC Links', 'Active channels', Globe2, riskColors.info),
    kpi('4', 'Cross-border Hazards', 'Shared watch', AlertTriangle, riskColors.major),
    kpi('3', 'Mutual Aid Requests', 'Open', Handshake, riskColors.active),
    kpi('8', 'Member Updates', 'This month', FileBarChart, riskColors.ok),
    kpi('2', 'Joint Exercises', 'Scheduled', Activity, riskColors.info),
    kpi('1', 'Regional Sitrep', 'Draft', FileText, riskColors.muted),
  ],
  map: mapStories.sadc,
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
    { label: 'Coordination Overview', href: '/ops/coordination' },
    { label: 'Partners', href: '/ops/coordination/partners' },
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
  map: mapStories.recovery,
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
    { label: 'Loss & Damage', href: '/ops/damage-loss' },
    { label: 'Recovery Progress', href: '/ops/recovery' },
    { label: 'Build Back Better', href: '/ops/build-back-better' },
    { label: 'Resilience', href: '/ops/resilience' },
  ],
  feed: { title: 'Recovery Feed', items: defaultFeed },
}

export const damageLossConfig: RichModuleConfig = {
  title: 'Loss & Damage',
  subtitle: 'Quantified losses across housing, infrastructure, agriculture and services.',
  breadcrumbs: crumbs({ label: 'Recovery', href: '/ops/recovery-overview' }, { label: 'Loss & Damage' }),
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
  map: mapStories.damage,
  actions: [
    { label: 'Recovery Progress', href: '/ops/recovery' },
    { label: 'Build Back Better', href: '/ops/build-back-better' },
  ],
  feed: { title: 'Assessment Updates', items: defaultFeed },
}

export const recoveryProgressConfig: RichModuleConfig = {
  title: 'Recovery Progress',
  subtitle: 'Track implementation of recovery plans against damage baselines.',
  breadcrumbs: crumbs({ label: 'Recovery', href: '/ops/recovery-overview' }, { label: 'Recovery Progress' }),
  kpis: [
    kpi('62%', 'Overall Progress', 'Priority package', RefreshCw, riskColors.ok),
    kpi('148', 'Projects', 'In portfolio', Package, riskColors.info),
    kpi('84', 'Active', 'Underway', Activity, riskColors.major),
    kpi('32', 'Completed', 'This season', CheckCircle2, riskColors.ok),
    kpi('$12.6M', 'Spend to Date', 'Of $18.4M', DollarSign, riskColors.info),
    kpi('9', 'Districts', 'Reporting', MapPin, riskColors.ok),
  ],
  map: mapStories.recovery,
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
    { label: 'Loss & Damage', href: '/ops/damage-loss' },
    { label: 'Build Back Better', href: '/ops/build-back-better' },
  ],
  feed: { title: 'Progress Updates', items: defaultFeed },
}

export const buildBackBetterConfig: RichModuleConfig = {
  title: 'Build Back Better',
  subtitle: 'Resilient reconstruction standards, BBB-tagged projects and risk reduction.',
  breadcrumbs: crumbs({ label: 'Recovery', href: '/ops/recovery-overview' }, { label: 'Build Back Better' }),
  kpis: [
    kpi('148', 'BBB Projects', 'Tagged', Building2, riskColors.info),
    kpi('67%', 'BBB Compliance', 'Design standards', Shield, riskColors.ok),
    kpi('42', 'Retrofit Sites', 'Priority', RefreshCw, riskColors.major),
    kpi('18', 'Code Upgrades', 'In review', FileText, riskColors.active),
    kpi('$4.8M', 'BBB Premium', 'Incremental cost', DollarSign, riskColors.info),
    kpi('11', 'Training Cohorts', 'Local artisans', Users, riskColors.ok),
  ],
  map: mapStories.bbb,
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
    { label: 'Recovery Progress', href: '/ops/recovery' },
    { label: 'Resilience', href: '/ops/resilience' },
  ],
  feed: { title: 'BBB Updates', items: defaultFeed },
}

export const resilienceConfig: RichModuleConfig = {
  title: 'Resilience',
  subtitle: 'Community resilience actions, capacity building and risk reduction investments.',
  breadcrumbs: crumbs({ label: 'Recovery', href: '/ops/recovery-overview' }, { label: 'Resilience' }),
  kpis: [
    kpi('41', 'Active Actions', 'Community level', Shield, riskColors.ok),
    kpi('126', 'Committees', 'Trained', Users, riskColors.info),
    kpi('18', 'Risk Plans', 'Updated', FileText, riskColors.ok),
    kpi('9', 'Districts', 'Focus', MapPin, riskColors.major),
    kpi('$3.2M', 'Resilience Spend', 'YTD', DollarSign, riskColors.info),
    kpi('74', 'Early Warning Groups', 'Functional', Activity, riskColors.ok),
  ],
  map: mapStories.resilience,
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
    { label: 'Build Back Better', href: '/ops/build-back-better' },
    { label: 'Knowledge / Lessons', href: '/ops/lessons-learned' },
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
    { label: 'Reports', href: '/ops/reports' },
    { label: 'Analytics', href: '/ops/analytics' },
    { label: 'Lessons Learned', href: '/ops/lessons-learned' },
    { label: 'IKS', href: '/ops/iks' },
    { label: 'Repository', href: '/ops/knowledge-repository' },
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
  breadcrumbs: crumbs({ label: 'Knowledge', href: '/ops/knowledge' }, { label: 'Reports' }),
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
    { label: 'Analytics', href: '/ops/analytics' },
    { label: 'Repository', href: '/ops/knowledge-repository' },
  ],
  feed: { title: 'Publishing Queue', items: defaultFeed },
}

export const analyticsConfig: RichModuleConfig = {
  title: 'Analytics',
  subtitle: 'Curated analytical views across warning, response, coordination and recovery.',
  breadcrumbs: crumbs({ label: 'Knowledge', href: '/ops/knowledge' }, { label: 'Analytics' }),
  kpis: [
    kpi('48', 'Curated Views', 'Production', BarChart3, riskColors.info),
    kpi('12', 'Live Boards', 'Refreshing', Activity, riskColors.ok),
    kpi('6', 'Hazard Models', 'Linked', ShieldAlert, riskColors.major),
    kpi('92%', 'Data freshness', 'SLA', CheckCircle2, riskColors.ok),
    kpi('34', 'Sources', 'In warehouse', Database, riskColors.info),
    kpi('8', 'Exports today', 'CSV / PDF', FileBarChart, riskColors.muted),
  ],
  map: mapStories.analytics,
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
    { label: 'Reports', href: '/ops/reports' },
    { label: 'Risk Explorer', href: '/ops/risk-intelligence/risk-explorer' },
  ],
  feed: { title: 'Analytics Activity', items: defaultFeed },
}

export const lessonsLearnedConfig: RichModuleConfig = {
  title: 'Lessons Learned',
  subtitle: 'After-action reviews, corrective actions and institutional learning.',
  breadcrumbs: crumbs({ label: 'Knowledge', href: '/ops/knowledge' }, { label: 'Lessons Learned' }),
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
    { label: 'Reports', href: '/ops/reports' },
    { label: 'IKS', href: '/ops/iks' },
  ],
  feed: { title: 'Learning Feed', items: defaultFeed },
}

export const iksConfig: RichModuleConfig = {
  title: 'Indigenous Knowledge Systems (IKS)',
  subtitle: 'Community observations, traditional indicators and local early warning practices.',
  breadcrumbs: crumbs({ label: 'Knowledge', href: '/ops/knowledge' }, { label: 'IKS' }),
  kpis: [
    kpi('24', 'IKS Entries', 'Documented', BookOpen, riskColors.active),
    kpi('16', 'Communities', 'Contributing', Users, riskColors.ok),
    kpi('7', 'Provinces', 'Covered', MapPin, riskColors.info),
    kpi('11', 'Validated', 'With science', CheckCircle2, riskColors.ok),
    kpi('5', 'In Review', 'Pending', Clock, riskColors.major),
    kpi('3', 'Linked to EW', 'Operationalised', Zap, riskColors.info),
  ],
  map: mapStories.iks,
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
    { label: 'Lessons Learned', href: '/ops/lessons-learned' },
    { label: 'Repository', href: '/ops/knowledge-repository' },
  ],
  feed: { title: 'IKS Contributions', items: defaultFeed },
}

export const knowledgeRepositoryConfig: RichModuleConfig = {
  title: 'Knowledge Repository',
  subtitle: 'Central repository for SOPs, maps, media, guidance and archival products.',
  breadcrumbs: crumbs({ label: 'Knowledge', href: '/ops/knowledge' }, { label: 'Knowledge Repository' }),
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
    { label: 'Digital SOPs', href: '/ops/digital-sops' },
    { label: 'Reports', href: '/ops/reports' },
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
    { label: 'Repository', href: '/ops/knowledge-repository' },
    { label: 'Users & Roles', href: '/ops/users-roles' },
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
    { label: 'System Administration', href: '/ops/system-administration' },
    { label: 'Data Sources', href: '/ops/data-sources' },
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
    { label: 'System Administration', href: '/ops/system-administration' },
    { label: 'Analytics', href: '/ops/analytics' },
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
    { label: 'Users & Roles', href: '/ops/users-roles' },
    { label: 'Data Sources', href: '/ops/data-sources' },
    { label: 'Public Site', href: '/' },
  ],
  feed: { title: 'Platform Events', items: defaultFeed },
  notes: ['System administration controls are non-functional in this demo build.'],
}

const netFeed = [
  { title: 'HF radio net check completed — Midlands EOC', meta: '26 Aug · 09:40 CAT', tone: 'info' as const },
  { title: 'Tower outage cleared — Chipinge site NET-118', meta: '26 Aug · 08:15 CAT', tone: 'new' as const },
  { title: 'Blackspot surge reported — Save River corridor', meta: '25 Aug · 21:05 CAT', tone: 'alert' as const },
  { title: 'Satellite terminal pre-positioned — Buhera staging', meta: '25 Aug · 16:30 CAT', tone: 'new' as const },
]

const preparednessFeed = [
  { title: 'National flood SOP annex v1.8 approved', meta: '26 Aug · 10:20 CAT', tone: 'new' as const },
  { title: 'Simulation exercise scheduled — Manicaland', meta: '26 Aug · 08:00 CAT', tone: 'info' as const },
  { title: 'Medical kit shortfall flagged — Masvingo warehouse', meta: '25 Aug · 18:45 CAT', tone: 'alert' as const },
  { title: 'District readiness scores refreshed (Q3)', meta: '25 Aug · 14:10 CAT', tone: 'info' as const },
]

export const netOverviewConfig: RichModuleConfig = {
  title: 'NET Overview',
  subtitle: 'National Emergency Telecommunications — infrastructure, channels and incident posture.',
  breadcrumbs: crumbs({ label: 'NET', href: '/ops/net' }, { label: 'Overview' }),
  primaryAction: 'Open Switchboard',
  kpis: [
    kpi('482', 'Telecom Towers', 'National footprint', Radio, riskColors.info),
    kpi('12', 'Radio Networks', 'HF / VHF / UHF', Activity, riskColors.ok),
    kpi('100%', 'Satellite Coverage', 'VSAT / BGAN', Globe2, riskColors.ok),
    kpi('5', 'Broadcast Systems', 'Radio / TV / Cell', FileBarChart, riskColors.active),
    kpi('3', 'Active Incidents', 'Comms degraded', AlertTriangle, riskColors.major),
    kpi('24', 'Blackspots', 'Priority corridors', MapPin, riskColors.critical),
  ],
  map: mapStories.net,
  donut: {
    title: 'Tower Status',
    centerValue: '482',
    centerLabel: 'Towers',
    segments: [
      { label: 'Operational', value: 428, color: riskColors.ok },
      { label: 'Degraded', value: 36, color: riskColors.active },
      { label: 'Offline', value: 18, color: riskColors.critical },
    ],
  },
  statusCards: [
    { label: 'HF Radio', value: 'Online' },
    { label: 'Satellite', value: '100%' },
    { label: 'Uptime', value: '98.5%' },
    { label: 'SADC EOC Link', value: 'Live' },
  ],
  progress: {
    title: 'Communication Channels',
    items: [
      { label: 'HF Radio network', pct: 94 },
      { label: 'VHF / UHF tactical', pct: 88 },
      { label: 'Satellite terminals', pct: 100 },
      { label: 'Broadcast alert push', pct: 82 },
      { label: 'Mobile cell broadcast', pct: 76 },
    ],
  },
  table: {
    title: 'Broadcast Alert Status',
    columns: ['Channel', 'Coverage', 'Last test', 'Latency', 'Status'],
    rows: [
      ['National Radio', '98%', '25 Aug 06:00', '4 min', 'Ready'],
      ['ZBC Television', '94%', '24 Aug 18:00', '6 min', 'Ready'],
      ['Cell Broadcast', '86%', '25 Aug 12:30', '2 min', 'Degraded'],
      ['Social / Web', '100%', 'Continuous', '<1 min', 'Ready'],
      ['Community Radio', '71%', '22 Aug 09:00', '12 min', 'Watch'],
    ],
  },
  list: {
    title: 'Emergency Switchboard',
    items: [
      { label: 'Police Command — 0242-700-111', badge: 'Direct' },
      { label: 'Fire Brigade — 0242-700-222', badge: 'Direct' },
      { label: 'Military Ops — Secure line', badge: 'Secure' },
      { label: 'SADC EOC Desk — Regional', badge: 'Live' },
      { label: 'MSD Met Desk — Forecast', badge: 'Open' },
    ],
  },
  actions: [
    { label: 'Plans & SOPs', href: '/ops/net/plans-sops' },
    { label: 'Training', href: '/ops/net/training' },
    { label: 'Resources', href: '/ops/net/resources' },
    { label: 'Readiness Monitoring', href: '/ops/net/readiness-monitoring' },
  ],
  feed: { title: 'NET Incidents & Updates', items: netFeed },
  notes: [
    'NET serves preparedness, warning, response and recovery — continuous connectivity for DCP command.',
  ],
}

export const netPlansSopsConfig: RichModuleConfig = {
  title: 'Emergency Plans & SOPs',
  subtitle: 'Controlled NET plans, telecom SOPs and activation playbooks.',
  breadcrumbs: crumbs({ label: 'NET', href: '/ops/net' }, { label: 'Emergency Plans & SOPs' }),
  primaryAction: 'Publish SOP',
  kpis: [
    kpi('28', 'NET SOPs', 'Controlled docs', FileText, riskColors.ok),
    kpi('6', 'Playbooks', 'Hazard-specific', ShieldAlert, riskColors.info),
    kpi('4', 'In Review', 'Due update', Clock, riskColors.active),
    kpi('97%', 'Staff Ack.', 'Signed current', Users, riskColors.ok),
    kpi('2', 'Overdue', 'Past review', AlertTriangle, riskColors.major),
    kpi('v3.1', 'NETP', 'National plan', CheckCircle2, riskColors.info),
  ],
  statusCards: [
    { label: 'NETP Document', value: 'Current' },
    { label: 'EOC Comms SOP', value: 'v2.4' },
    { label: 'Blackspot Protocol', value: 'v1.6' },
    { label: 'SADC Interlink', value: 'v1.2' },
  ],
  table: {
    title: 'NET Document Catalogue',
    columns: ['Document', 'Type', 'Version', 'Owner', 'Review due', 'Status'],
    rows: [
      ['National Emergency Telecoms Plan (NETP)', 'Plan', '3.1', 'NET Unit', '15 Nov', 'Current'],
      ['EOC Communications SOP', 'SOP', '2.4', 'NEOC', '30 Sep', 'Current'],
      ['HF Net Activation Playbook', 'Playbook', '1.9', 'NET Unit', '12 Oct', 'Current'],
      ['Tower Outage Escalation', 'SOP', '1.6', 'Infrastructure', '01 Sep', 'In review'],
      ['Cell Broadcast Issuance', 'SOP', '2.0', 'EW / NET', '20 Oct', 'Current'],
      ['Satellite Surge Deployment', 'Playbook', '1.3', 'Logistics', '05 Sep', 'In review'],
      ['Community Radio Relay Guide', 'SOP', '1.1', 'Public Info', '18 Aug', 'Overdue'],
    ],
  },
  progress: {
    title: 'Acknowledgement Coverage',
    items: [
      { label: 'National EOC staff', pct: 100 },
      { label: 'Provincial EOC focal points', pct: 94 },
      { label: 'District NET officers', pct: 88 },
      { label: 'Partner liaison desks', pct: 72 },
    ],
  },
  list: {
    title: 'Quick Links',
    items: [
      { label: 'NETP Document (PDF)', badge: 'Open' },
      { label: 'Emergency Frequencies Card', badge: 'Open' },
      { label: 'SADC EOC Interop Annex', badge: 'Open' },
      { label: 'Towers & Sites Register', badge: 'Open' },
    ],
  },
  actions: [
    { label: 'NET Overview', href: '/ops/net' },
    { label: 'Digital SOPs', href: '/ops/digital-sops' },
    { label: 'Training', href: '/ops/net/training' },
  ],
  feed: { title: 'Document Activity', items: netFeed },
}

export const netTrainingConfig: RichModuleConfig = {
  title: 'Training & Simulation Exercises',
  subtitle: 'Telecom drills, simulation exercises and staff competency tracking.',
  breadcrumbs: crumbs({ label: 'NET', href: '/ops/net' }, { label: 'Training & Simulation Exercises' }),
  primaryAction: 'Schedule Drill',
  kpis: [
    kpi('14', 'Exercises YTD', 'Completed', CheckCircle2, riskColors.ok),
    kpi('3', 'Upcoming', 'Next 30 days', Clock, riskColors.active),
    kpi('186', 'Staff Trained', 'NET modules', Users, riskColors.info),
    kpi('84%', 'Competency', 'Pass rate', Shield, riskColors.ok),
    kpi('6', 'Provinces', 'Drilled this quarter', MapPin, riskColors.major),
    kpi('2', 'Joint SADC', 'Regional drills', Globe2, riskColors.info),
  ],
  pipeline: {
    title: 'Exercise Pipeline',
    steps: [
      { label: 'Planned', count: 5 },
      { label: 'Scheduled', count: 3, active: true },
      { label: 'Running', count: 1 },
      { label: 'After-action', count: 2 },
      { label: 'Closed', count: 14 },
    ],
  },
  table: {
    title: 'Exercise Calendar',
    columns: ['Exercise', 'Type', 'Location', 'Date', 'Lead', 'Status'],
    rows: [
      ['HF Night Net Check', 'Drill', 'National', '28 Aug', 'NET Unit', 'Scheduled'],
      ['Flood Comms Failover', 'Tabletop', 'Manicaland', '02 Sep', 'Provincial EOC', 'Scheduled'],
      ['Satellite Surge Deploy', 'Field', 'Buhera', '10 Sep', 'Logistics', 'Planned'],
      ['Cell Broadcast Push Test', 'Technical', 'Harare', '15 Sep', 'EW / NET', 'Planned'],
      ['SADC Cross-border Link', 'Regional', 'Beitbridge', '22 Sep', 'SADC Desk', 'Planned'],
      ['EOC Blackout Recovery', 'Simulation', 'NEOC', '12 Aug', 'NEOC', 'Closed'],
    ],
  },
  bars: {
    title: 'Provincial Drill Coverage (YTD)',
    items: [
      { label: 'Harare', value: 100, color: riskColors.ok },
      { label: 'Manicaland', value: 92, color: riskColors.ok },
      { label: 'Mashonaland West', value: 78, color: riskColors.active },
      { label: 'Masvingo', value: 64, color: riskColors.major },
      { label: 'Matabeleland North', value: 58, color: riskColors.major },
      { label: 'Midlands', value: 86, color: riskColors.ok },
    ],
  },
  progress: {
    title: 'Competency Modules',
    items: [
      { label: 'HF / VHF radio ops', pct: 91 },
      { label: 'Satellite terminal setup', pct: 84 },
      { label: 'Broadcast alert workflow', pct: 88 },
      { label: 'Blackspot triage', pct: 76 },
    ],
  },
  actions: [
    { label: 'NET Overview', href: '/ops/net' },
    { label: 'Readiness Monitoring', href: '/ops/net/readiness-monitoring' },
  ],
  feed: { title: 'Training Updates', items: netFeed },
}

export const netResourcesConfig: RichModuleConfig = {
  title: 'Resources & Pre-positioning',
  subtitle: 'Pre-positioned telecom assets, kits and surge capacity nationwide.',
  breadcrumbs: crumbs({ label: 'NET', href: '/ops/net' }, { label: 'Resources & Pre-positioning' }),
  primaryAction: 'Request Surge Kit',
  kpis: [
    kpi('64', 'Sat Terminals', 'BGAN / VSAT', Radio, riskColors.info),
    kpi('128', 'HF Kits', 'Deployable', Package, riskColors.ok),
    kpi('42', 'Generators', 'Comms power', Activity, riskColors.active),
    kpi('18', 'Staging Sites', 'Pre-positioned', MapPin, riskColors.info),
    kpi('76%', 'Stock Ready', 'Vs target', CheckCircle2, riskColors.ok),
    kpi('9', 'Kits En Route', 'Convoys', Truck, riskColors.major),
  ],
  map: mapStories.net,
  progress: {
    title: 'Stock vs Target',
    items: [
      { label: 'Satellite terminals', pct: 88 },
      { label: 'HF / VHF kits', pct: 82 },
      { label: 'Power / generators', pct: 70 },
      { label: 'Spare antennas / masts', pct: 64 },
      { label: 'Field technician kits', pct: 76 },
    ],
  },
  table: {
    title: 'Pre-positioned Inventory',
    columns: ['Asset', 'Location', 'Qty', 'Condition', 'Last check', 'Owner'],
    rows: [
      ['BGAN terminal set', 'Buhera staging', '6', 'Good', '24 Aug', 'NET Logistics'],
      ['HF radio kit', 'Chinhoyi EOC', '12', 'Good', '25 Aug', 'Provincial EOC'],
      ['Portable mast', 'Mutare warehouse', '4', 'Fair', '20 Aug', 'Infrastructure'],
      ['Generator 5kVA', 'Masvingo hub', '8', 'Good', '23 Aug', 'Logistics'],
      ['VHF handhelds', 'Harare NEOC', '40', 'Good', '26 Aug', 'NEOC'],
      ['Spare battery packs', 'Bulawayo', '96', 'Good', '22 Aug', 'NET Stores'],
    ],
  },
  bars: {
    title: 'Staging Site Fill Rates',
    items: [
      { label: 'Harare NEOC', value: 94, color: riskColors.ok },
      { label: 'Mutare hub', value: 78, color: riskColors.active },
      { label: 'Chinhoyi', value: 72, color: riskColors.active },
      { label: 'Masvingo', value: 61, color: riskColors.major },
      { label: 'Hwange', value: 54, color: riskColors.major },
    ],
  },
  actions: [
    { label: 'NET Overview', href: '/ops/net' },
    { label: 'Logistics & Resources', href: '/ops/logistics-resources' },
    { label: 'Training', href: '/ops/net/training' },
  ],
  feed: { title: 'Logistics Movement', items: netFeed },
}

export const netReadinessMonitoringConfig: RichModuleConfig = {
  title: 'Readiness Monitoring',
  subtitle: 'Continuous NET readiness scores, uptime and escalation triggers.',
  breadcrumbs: crumbs({ label: 'NET', href: '/ops/net' }, { label: 'Readiness Monitoring' }),
  primaryAction: 'Export Scorecard',
  kpis: [
    kpi('92%', 'Comms Ready', 'National', Shield, riskColors.ok),
    kpi('98.5%', 'Network Uptime', '30-day', Activity, riskColors.ok),
    kpi('4.2h', 'MTTR', 'Mean restore', Clock, riskColors.info),
    kpi('24', 'Blackspots', 'Open', AlertTriangle, riskColors.critical),
    kpi('3', 'Escalations', 'Active', Siren, riskColors.major),
    kpi('10/10', 'Provinces', 'Reporting', CheckCircle2, riskColors.ok),
  ],
  map: mapStories.net,
  donut: {
    title: 'Readiness Bands',
    centerValue: '92%',
    centerLabel: 'NET',
    segments: [
      { label: 'Very high', value: 4, color: riskColors.ok },
      { label: 'High', value: 3, color: '#4ade80' },
      { label: 'Moderate', value: 2, color: riskColors.active },
      { label: 'Low', value: 1, color: riskColors.major },
    ],
  },
  table: {
    title: 'Provincial NET Scorecard',
    columns: ['Province', 'Readiness', 'Uptime', 'Blackspots', 'Last drill', 'Trend'],
    rows: [
      ['Harare', '98%', '99.6%', '1', '12 Aug', '↑'],
      ['Bulawayo', '95%', '99.1%', '1', '05 Aug', '→'],
      ['Manicaland', '74%', '96.2%', '7', '18 Aug', '↓'],
      ['Mashonaland West', '78%', '97.0%', '5', '20 Aug', '↓'],
      ['Masvingo', '84%', '98.4%', '3', '10 Aug', '↑'],
      ['Midlands', '90%', '98.8%', '2', '22 Aug', '↑'],
      ['Matabeleland North', '88%', '98.1%', '2', '08 Aug', '→'],
    ],
  },
  progress: {
    title: 'Monitoring Dimensions',
    items: [
      { label: 'Infrastructure health', pct: 91 },
      { label: 'Staff on-call coverage', pct: 94 },
      { label: 'SOP currency', pct: 96 },
      { label: 'Exercise currency', pct: 84 },
      { label: 'Spare capacity', pct: 76 },
    ],
  },
  statusCards: [
    { label: 'Alert Bus', value: 'OK' },
    { label: 'HF Night Net', value: 'OK' },
    { label: 'Sat Gateways', value: 'OK' },
    { label: 'Cell Broadcast', value: 'Watch' },
  ],
  actions: [
    { label: 'NET Overview', href: '/ops/net' },
    { label: 'Preparedness Monitoring', href: '/ops/preparedness/readiness-monitoring' },
  ],
  feed: { title: 'Monitoring Alerts', items: netFeed },
}

export const preparednessOverviewConfig: RichModuleConfig = {
  title: 'Readiness & Preparedness Overview',
  subtitle: 'National preparedness posture across plans, training, resources and monitoring.',
  breadcrumbs: crumbs(
    { label: 'Readiness & Preparedness', href: '/ops/preparedness' },
    { label: 'Overview' },
  ),
  primaryAction: 'Situation Summary',
  kpis: [
    kpi('78%', 'Preparedness', 'National index', Shield, riskColors.ok),
    kpi('92%', 'Comms Ready', 'NET linked', Radio, riskColors.info),
    kpi('96%', 'Plans & SOPs', 'Current', FileText, riskColors.ok),
    kpi('84%', 'Training', 'Completion', Users, riskColors.active),
    kpi('76%', 'Pre-positioned', 'Resources', Package, riskColors.major),
    kpi('73%', 'Monitoring', 'Score', Activity, riskColors.info),
  ],
  map: mapStories.preparedness,
  donut: {
    title: 'Readiness Distribution',
    centerValue: '78%',
    centerLabel: 'Index',
    segments: [
      { label: 'Very high', value: 2, color: riskColors.ok },
      { label: 'High', value: 4, color: '#4ade80' },
      { label: 'Moderate', value: 3, color: riskColors.active },
      { label: 'Critical watch', value: 1, color: riskColors.major },
    ],
  },
  progress: {
    title: 'Preparedness Key Indicators',
    items: [
      { label: 'Emergency plans currency', pct: 96 },
      { label: 'Training & exercises', pct: 84 },
      { label: 'Resources pre-positioned', pct: 76 },
      { label: 'NET / communications', pct: 92 },
      { label: 'Readiness monitoring', pct: 73 },
    ],
  },
  table: {
    title: 'Emergency Plans & SOPs Status',
    columns: ['Plan / SOP', 'Domain', 'Status', 'Last updated', 'Owner'],
    rows: [
      ['National Contingency Plan', 'Multi-hazard', 'Approved', '12 Aug', 'DCP'],
      ['Flood Response Playbook', 'Response', 'Approved', '20 Aug', 'Ops'],
      ['Drought AA Protocol', 'Anticipation', 'In progress', '18 Aug', 'AA Unit'],
      ['Evacuation & Shelter SOP', 'Response', 'Approved', '05 Aug', 'NEOC'],
      ['Public Warning SOP', 'Early Warning', 'Draft', '22 Aug', 'EW Unit'],
    ],
  },
  statusCards: [
    { label: 'NET Status', value: 'Ops' },
    { label: 'Towers', value: '482' },
    { label: 'Radio Nets', value: '12' },
    { label: 'Sat Coverage', value: '100%' },
  ],
  actions: [
    { label: 'Plans & SOPs', href: '/ops/preparedness/plans-sops' },
    { label: 'Training', href: '/ops/preparedness/training' },
    { label: 'Resources', href: '/ops/preparedness/resources' },
    { label: 'NET Overview', href: '/ops/net' },
  ],
  feed: { title: 'Recent Alerts & Updates', items: preparednessFeed },
}

export const preparednessPlansSopsConfig: RichModuleConfig = {
  title: 'Emergency Plans & SOPs',
  subtitle: 'Emergency plans and controlled SOPs for multi-hazard preparedness.',
  breadcrumbs: crumbs(
    { label: 'Readiness & Preparedness', href: '/ops/preparedness' },
    { label: 'Emergency Plans & SOPs' },
  ),
  primaryAction: 'Upload Plan',
  kpis: [
    kpi('186', 'SOPs', 'Controlled', FileText, riskColors.ok),
    kpi('24', 'Contingency Plans', 'Active', Shield, riskColors.info),
    kpi('11', 'In Review', 'Due update', Clock, riskColors.active),
    kpi('8', 'Hazard Playbooks', 'Multi-hazard', ShieldAlert, riskColors.major),
    kpi('96%', 'Staff Ack.', 'Read & sign', Users, riskColors.ok),
    kpi('3', 'Overdue', 'Past review', AlertTriangle, riskColors.critical),
  ],
  table: {
    title: 'Plan & SOP Catalogue',
    columns: ['Document', 'Hazard / Domain', 'Version', 'Owner', 'Status', 'Next review'],
    rows: [
      ['National Contingency Plan 2026/27', 'Multi-hazard', '4.0', 'DCP', 'Approved', '01 Mar'],
      ['Flood Response Playbook', 'Flood', '1.8', 'Ops', 'Approved', '30 Nov'],
      ['Cyclone Preparedness Plan', 'Cyclone', '2.2', 'Manicaland EOC', 'Approved', '15 Oct'],
      ['Drought Anticipatory Protocol', 'Drought', '1.4', 'AA Unit', 'In progress', '20 Sep'],
      ['Evacuation & Shelter SOP', 'Response', '3.1', 'NEOC', 'Approved', '12 Dec'],
      ['Public Warning Issuance SOP', 'Early Warning', '2.1', 'EW Unit', 'Draft', '05 Sep'],
      ['Epidemic Coordination Plan', 'Health', '1.6', 'MoHCC / DCP', 'Approved', '18 Nov'],
      ['School Safety Preparedness', 'Education', '1.0', 'MoPSE', 'In progress', '30 Sep'],
    ],
  },
  progress: {
    title: 'Review Cycle Health',
    items: [
      { label: 'Current / approved', pct: 82 },
      { label: 'In progress / draft', pct: 12 },
      { label: 'Overdue for review', pct: 6 },
    ],
  },
  list: {
    title: 'Priority Updates This Week',
    items: [
      { label: 'Flood annex — Manicaland', badge: 'Due 30 Aug' },
      { label: 'Public warning SOP draft', badge: 'Review' },
      { label: 'School safety pack', badge: 'Partner' },
      { label: 'Drought AA protocol', badge: 'AA Unit' },
    ],
  },
  pipeline: {
    title: 'Document Workflow',
    steps: [
      { label: 'Draft', count: 8 },
      { label: 'Technical review', count: 6, active: true },
      { label: 'Leadership approve', count: 3 },
      { label: 'Published', count: 186 },
    ],
  },
  actions: [
    { label: 'Preparedness Overview', href: '/ops/preparedness' },
    { label: 'Digital SOPs', href: '/ops/digital-sops' },
    { label: 'NET Plans', href: '/ops/net/plans-sops' },
  ],
  feed: { title: 'Document Activity', items: preparednessFeed },
}

export const preparednessTrainingConfig: RichModuleConfig = {
  title: 'Training & Simulation Exercises',
  subtitle: 'Training cohorts, drills and simulation exercise calendar.',
  breadcrumbs: crumbs(
    { label: 'Readiness & Preparedness', href: '/ops/preparedness' },
    { label: 'Training & Simulation Exercises' },
  ),
  primaryAction: 'Create Exercise',
  kpis: [
    kpi('42', 'Exercises YTD', 'All types', CheckCircle2, riskColors.ok),
    kpi('11', 'Cohorts Active', 'In training', Users, riskColors.info),
    kpi('84%', 'Completion', 'Assigned modules', Shield, riskColors.ok),
    kpi('1,240', 'Participants', 'YTD', Users, riskColors.active),
    kpi('5', 'Upcoming', 'Next 21 days', Clock, riskColors.major),
    kpi('9', 'After-action', 'Pending close', FileBarChart, riskColors.info),
  ],
  pipeline: {
    title: 'Exercise Lifecycle',
    steps: [
      { label: 'Design', count: 4 },
      { label: 'Scheduled', count: 5, active: true },
      { label: 'Delivered', count: 42 },
      { label: 'AAR', count: 9 },
      { label: 'Lessons logged', count: 31 },
    ],
  },
  table: {
    title: 'Upcoming & Recent Exercises',
    columns: ['Exercise', 'Type', 'Province', 'Date', 'Participants', 'Status'],
    rows: [
      ['District flood evacuation drill', 'Field', 'Manicaland', '29 Aug', '180', 'Scheduled'],
      ['EOC activation tabletop', 'Tabletop', 'National', '01 Sep', '46', 'Scheduled'],
      ['Shelter management cohort', 'Course', 'Harare', '05 Sep', '32', 'Planned'],
      ['Community early warning seminar', 'Community', 'Masvingo', '08 Sep', '120', 'Planned'],
      ['Search & rescue refresh', 'Field', 'Mash. West', '12 Sep', '64', 'Planned'],
      ['National multi-hazard SIMEX', 'Simulation', 'NEOC', '18 Aug', '210', 'AAR open'],
    ],
  },
  bars: {
    title: 'Training Completion by Province',
    items: [
      { label: 'Harare', value: 96, color: riskColors.ok },
      { label: 'Bulawayo', value: 91, color: riskColors.ok },
      { label: 'Manicaland', value: 82, color: riskColors.active },
      { label: 'Masvingo', value: 74, color: riskColors.active },
      { label: 'Matabeleland North', value: 68, color: riskColors.major },
      { label: 'Midlands', value: 88, color: riskColors.ok },
    ],
  },
  progress: {
    title: 'Core Curricula',
    items: [
      { label: 'EOC operations', pct: 90 },
      { label: 'Evacuation & shelter', pct: 84 },
      { label: 'Community preparedness', pct: 78 },
      { label: 'Incident command basics', pct: 86 },
    ],
  },
  actions: [
    { label: 'Preparedness Overview', href: '/ops/preparedness' },
    { label: 'NET Training', href: '/ops/net/training' },
    { label: 'Lessons Learned', href: '/ops/lessons-learned' },
  ],
  feed: { title: 'Training Desk', items: preparednessFeed },
}

export const preparednessResourcesConfig: RichModuleConfig = {
  title: 'Resources & Pre-positioning',
  subtitle: 'Pre-positioned relief stocks, equipment and staging sites.',
  breadcrumbs: crumbs(
    { label: 'Readiness & Preparedness', href: '/ops/preparedness' },
    { label: 'Resources & Pre-positioning' },
  ),
  primaryAction: 'Allocate Stock',
  kpis: [
    kpi('18', 'Warehouses', 'National network', Building2, riskColors.info),
    kpi('76%', 'Fill Rate', 'Vs contingency', Package, riskColors.ok),
    kpi('42k', 'Food Rations', 'Family packs', Package, riskColors.active),
    kpi('28k', 'WASH Kits', 'Ready', Package, riskColors.info),
    kpi('6.2k', 'Shelter Kits', 'Tents / NFIs', Tent, riskColors.major),
    kpi('14', 'Convoys Ready', 'Standby', Truck, riskColors.ok),
  ],
  map: mapStories.preparedness,
  progress: {
    title: 'Commodity Readiness',
    items: [
      { label: 'Food & nutrition', pct: 78 },
      { label: 'WASH / water', pct: 72 },
      { label: 'Shelter / NFI', pct: 68 },
      { label: 'Medical kits', pct: 81 },
      { label: 'Fuel & transport', pct: 64 },
    ],
  },
  table: {
    title: 'Staging Inventory Snapshot',
    columns: ['Site', 'Province', 'Food', 'WASH', 'Shelter', 'Medical', 'Status'],
    rows: [
      ['Harare Central', 'Harare', 'High', 'High', 'Med', 'High', 'Ready'],
      ['Mutare Hub', 'Manicaland', 'Med', 'Med', 'Low', 'Med', 'Replenish'],
      ['Chinhoyi', 'Mash. West', 'Med', 'High', 'Med', 'Med', 'Ready'],
      ['Masvingo Hub', 'Masvingo', 'Low', 'Med', 'Med', 'Low', 'Priority'],
      ['Bulawayo', 'Bulawayo', 'High', 'High', 'High', 'High', 'Ready'],
      ['Hwange', 'Mat. North', 'Med', 'Low', 'Med', 'Med', 'Watch'],
    ],
  },
  bars: {
    title: 'People Covered by Pre-positioned Stocks',
    items: [
      { label: 'Food (person-days)', value: 86, suffix: '%' },
      { label: 'WASH', value: 74, suffix: '%' },
      { label: 'Shelter', value: 61, suffix: '%' },
      { label: 'Medical', value: 79, suffix: '%' },
    ],
  },
  list: {
    title: 'Priority Replenishment',
    items: [
      { label: 'Shelter kits — Mutare hub', badge: 'Urgent' },
      { label: 'Medical kits — Masvingo', badge: 'Urgent' },
      { label: 'WASH — Hwange', badge: 'Watch' },
      { label: 'Fuel reserve — Chinhoyi', badge: 'Planned' },
    ],
  },
  actions: [
    { label: 'Preparedness Overview', href: '/ops/preparedness' },
    { label: 'Logistics & Resources', href: '/ops/logistics-resources' },
    { label: 'NET Resources', href: '/ops/net/resources' },
  ],
  feed: { title: 'Stock Movements', items: preparednessFeed },
}

export const preparednessReadinessMonitoringConfig: RichModuleConfig = {
  title: 'Readiness Monitoring',
  subtitle: 'Province and sector readiness scores with escalation triggers.',
  breadcrumbs: crumbs(
    { label: 'Readiness & Preparedness', href: '/ops/preparedness' },
    { label: 'Readiness Monitoring' },
  ),
  primaryAction: 'Export Scorecard',
  kpis: [
    kpi('78%', 'National Index', 'Composite', Shield, riskColors.ok),
    kpi('73%', 'Monitoring', 'Cadence met', Activity, riskColors.info),
    kpi('4', 'Provinces', 'Below threshold', AlertTriangle, riskColors.major),
    kpi('12', 'Open Actions', 'Escalated', Siren, riskColors.critical),
    kpi('10/10', 'Reporting', 'Provinces in', CheckCircle2, riskColors.ok),
    kpi('2h', 'Last Refresh', 'Automated', Clock, riskColors.ok),
  ],
  map: mapStories.preparedness,
  donut: {
    title: 'Provinces by Band',
    centerValue: '78%',
    centerLabel: 'Index',
    segments: [
      { label: 'Very high (≥90)', value: 2, color: riskColors.ok },
      { label: 'High (80–89)', value: 3, color: '#4ade80' },
      { label: 'Moderate (70–79)', value: 3, color: riskColors.active },
      { label: 'Watch (<70)', value: 2, color: riskColors.major },
    ],
  },
  table: {
    title: 'Provincial Readiness Scorecard',
    columns: ['Province', 'Index', 'Plans', 'Training', 'Stocks', 'NET', 'Trend'],
    rows: [
      ['Harare', '94%', '98%', '96%', '92%', '98%', '↑'],
      ['Bulawayo', '91%', '96%', '91%', '90%', '95%', '→'],
      ['Midlands', '86%', '94%', '88%', '80%', '90%', '↑'],
      ['Masvingo', '74%', '90%', '74%', '68%', '84%', '↓'],
      ['Manicaland', '71%', '88%', '82%', '64%', '74%', '↓'],
      ['Mashonaland West', '69%', '86%', '78%', '66%', '78%', '↓'],
      ['Matabeleland North', '72%', '84%', '68%', '70%', '88%', '→'],
    ],
  },
  progress: {
    title: 'Sector Readiness',
    items: [
      { label: 'Civil protection / EOC', pct: 88 },
      { label: 'Health surge', pct: 76 },
      { label: 'WASH contingency', pct: 71 },
      { label: 'Education / schools', pct: 68 },
      { label: 'Agriculture / livelihoods', pct: 64 },
    ],
  },
  statusCards: [
    { label: 'Threshold', value: '70%' },
    { label: 'Below Target', value: '4' },
    { label: 'Actions Due', value: '12' },
    { label: 'Next Board', value: '02 Sep' },
  ],
  actions: [
    { label: 'Preparedness Overview', href: '/ops/preparedness' },
    { label: 'NET Monitoring', href: '/ops/net/readiness-monitoring' },
    { label: 'Response Overview', href: '/ops/response' },
  ],
  feed: { title: 'Monitoring Feed', items: preparednessFeed },
  notes: [
    'Scores refresh from provincial EOC returns, warehouse systems and NET health feeds.',
  ],
}
