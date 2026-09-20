import type { LucideIcon } from 'lucide-react'
import {
  Home,
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
  Flame,
  Droplets,
  Sun,
  HeartPulse,
  Pickaxe,
  Car,
  Waves,
  AlertTriangle,
  Phone,
  MessageSquare,
  Download,
  Share2,
  Map,
  LifeBuoy,
  Network,
  Eye,
  Landmark,
  FolderOpen,
  ExternalLink,
  ClipboardList,
  DollarSign,
} from 'lucide-react'

export type NavChild = {
  label: string
  icon: LucideIcon
  href: string
}

export type NavItem = {
  label: string
  icon: LucideIcon
  href: string
  children?: NavChild[]
}

export type NavGroup = {
  title?: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    items: [
      { label: 'Home', icon: Home, href: '/ops' },
      { label: 'Public Site', icon: ExternalLink, href: '/' },
    ],
  },
  {
    title: 'COMMAND',
    items: [
      { label: 'National COP', icon: LayoutDashboard, href: '/ops/national-cop' },
      {
        label: 'Early Warning',
        icon: Bell,
        href: '/ops/early-warning',
        children: [
          { label: 'All Hazards', icon: ShieldAlert, href: '/ops/early-warning/all-hazards' },
          { label: 'Weather', icon: CloudRain, href: '/ops/early-warning/weather' },
          { label: 'Cyclone', icon: Wind, href: '/ops/early-warning/cyclone' },
          { label: 'Flood', icon: Waves, href: '/ops/early-warning/flood' },
          { label: 'Drought', icon: Sun, href: '/ops/early-warning/drought' },
          { label: 'Fire', icon: Flame, href: '/ops/early-warning/fire' },
          { label: 'Health', icon: HeartPulse, href: '/ops/early-warning/health' },
          { label: 'Mining', icon: Pickaxe, href: '/ops/early-warning/mining' },
          { label: 'Road Traffic', icon: Car, href: '/ops/early-warning/road-traffic' },
          { label: 'Hydrology', icon: Droplets, href: '/ops/early-warning/hydrology' },
        ],
      },
      {
        label: 'Risk Intelligence',
        icon: ShieldAlert,
        href: '/ops/risk-intelligence',
        children: [
          { label: 'Risk Map', icon: Map, href: '/ops/risk-intelligence/risk-map' },
          { label: 'Risk Explorer', icon: BarChart3, href: '/ops/risk-intelligence/risk-explorer' },
        ],
      },
      { label: 'Impact Intelligence', icon: Target, href: '/ops/impact-intelligence' },
      { label: 'Needs Assessment', icon: ClipboardList, href: '/ops/needs-assessment' },
    ],
  },
  {
    title: 'ANTICIPATION',
    items: [
      { label: 'Anticipation Overview', icon: Eye, href: '/ops/anticipation' },
      { label: 'Trigger Monitor', icon: Activity, href: '/ops/trigger-monitor' },
      {
        label: 'Hazard Anticipation',
        icon: Sun,
        href: '/ops/anticipation/drought',
        children: [
          { label: 'Drought', icon: Sun, href: '/ops/anticipation/drought' },
          { label: 'Flood', icon: Waves, href: '/ops/anticipation/flood' },
          { label: 'Cyclone', icon: Wind, href: '/ops/anticipation/cyclone' },
          { label: 'Fire', icon: Flame, href: '/ops/anticipation/fire' },
          { label: 'Disease', icon: HeartPulse, href: '/ops/anticipation/disease' },
          { label: 'Landslide', icon: AlertTriangle, href: '/ops/anticipation/landslide' },
        ],
      },
      { label: 'Anticipatory Action', icon: Zap, href: '/ops/anticipatory-action' },
      { label: 'Anticipatory Financing', icon: DollarSign, href: '/ops/anticipatory-financing' },
    ],
  },
  {
    title: 'RESPONSE',
    items: [
      { label: 'Response Overview', icon: Eye, href: '/ops/response' },
      { label: 'Emergency Operations', icon: Siren, href: '/ops/emergency-operations' },
      { label: 'Incident Command', icon: Radio, href: '/ops/incident-command' },
      { label: 'Logistics & Resources', icon: Truck, href: '/ops/logistics-resources' },
      { label: 'Shelters & Evacuation', icon: Tent, href: '/ops/shelters-evacuation' },
      { label: 'Search & Rescue', icon: LifeBuoy, href: '/ops/search-rescue' },
    ],
  },
  {
    title: 'COORDINATION',
    items: [
      { label: 'Coordination Overview', icon: Network, href: '/ops/coordination' },
      { label: '5W Coordination', icon: Network, href: '/ops/coordination/5w' },
      { label: 'Partners & Stakeholders', icon: Handshake, href: '/ops/coordination/partners' },
      { label: 'Government Coordination', icon: Building2, href: '/ops/government-coordination' },
      { label: 'SADC Regional Coordination', icon: Globe2, href: '/ops/sadc-coordination' },
      { label: 'Call Centre', icon: Phone, href: '/ops/call-centre' },
    ],
  },
  {
    title: 'RECOVERY',
    items: [
      { label: 'Recovery Overview', icon: RefreshCw, href: '/ops/recovery-overview' },
      { label: 'Loss & Damage', icon: TrendingDown, href: '/ops/damage-loss' },
      { label: 'Recovery Progress', icon: RefreshCw, href: '/ops/recovery' },
      { label: 'Build Back Better', icon: Landmark, href: '/ops/build-back-better' },
      { label: 'Resilience', icon: Shield, href: '/ops/resilience' },
    ],
  },
  {
    title: 'KNOWLEDGE',
    items: [
      { label: 'Knowledge Overview', icon: BookOpen, href: '/ops/knowledge' },
      { label: 'Reports', icon: FileBarChart, href: '/ops/reports' },
      { label: 'Analytics', icon: BarChart3, href: '/ops/analytics' },
      { label: 'Lessons Learned', icon: BookOpen, href: '/ops/lessons-learned' },
      { label: 'Indigenous Knowledge (IKS)', icon: Users, href: '/ops/iks' },
      { label: 'Knowledge Repository', icon: FolderOpen, href: '/ops/knowledge-repository' },
    ],
  },
  {
    title: 'ADMINISTRATION',
    items: [
      { label: 'Digital SOPs', icon: FileText, href: '/ops/digital-sops' },
      { label: 'Users & Roles', icon: Users, href: '/ops/users-roles' },
      { label: 'Data Sources', icon: Database, href: '/ops/data-sources' },
      { label: 'System Administration', icon: Settings, href: '/ops/system-administration' },
    ],
  },
]

export const hazardFilters = [
  'All Hazards',
  'Weather',
  'Hydrology',
  'Flood',
  'Drought',
  'Fire',
  'Health',
  'Mining',
  'Road Safety',
  'Other',
] as const

export const alertSummary = [
  { label: 'Critical', value: '02', tone: 'critical' as const, sub: 'High impact expected' },
  { label: 'Warning', value: '03', tone: 'warning' as const, sub: 'Take action' },
  { label: 'Watch', value: '04', tone: 'watch' as const, sub: 'Be prepared' },
  { label: 'Advisory', value: '05', tone: 'advisory' as const, sub: 'Stay informed' },
  { label: 'All Clear', value: '00', tone: 'clear' as const, sub: 'No immediate threat' },
  { label: 'Total Alerts', value: '14', tone: 'total' as const, sub: 'Active nationwide' },
]

export type EarlyWarning = {
  title: string
  location: string
  level: 'Critical' | 'Warning' | 'Watch' | 'Advisory'
  impact: string
  icon: LucideIcon
  color: string
}

export const activeEarlyWarnings: EarlyWarning[] = [
  {
    title: 'Flood Warning — Save River Basin',
    location: 'Mashonaland West · Chinhoyi',
    level: 'Critical',
    impact: '24–48 hrs',
    icon: Waves,
    color: '#d64545',
  },
  {
    title: 'Severe Weather Warning',
    location: 'Manicaland · Mutare District',
    level: 'Warning',
    impact: '12–24 hrs',
    icon: CloudRain,
    color: '#ea580c',
  },
  {
    title: 'Drought Watch',
    location: 'Matabeleland North',
    level: 'Watch',
    impact: '1–3 months',
    icon: Sun,
    color: '#e6a70a',
  },
  {
    title: 'Wildfire Advisory',
    location: 'Midlands · Shurugwi',
    level: 'Advisory',
    impact: '72 hrs',
    icon: Flame,
    color: '#2563eb',
  },
  {
    title: 'Cholera Health Alert',
    location: 'Masvingo · Gutu',
    level: 'Warning',
    impact: 'Ongoing',
    icon: HeartPulse,
    color: '#ea580c',
  },
]

export const riverLevels = [
  { station: 'Save @ Chiredzi', river: 'Save', current: '4.8 m', danger: '4.5 m', status: 'High', tone: 'danger' as const },
  { station: 'Manyame @ Norton', river: 'Manyame', current: '3.2 m', danger: '3.8 m', status: 'Rising', tone: 'gold' as const },
  { station: 'Mazowe @ Bindura', river: 'Mazowe', current: '2.1 m', danger: '3.5 m', status: 'Normal', tone: 'green' as const },
  { station: 'Runde @ Rutenga', river: 'Runde', current: '1.9 m', danger: '3.0 m', status: 'Normal', tone: 'green' as const },
]

export const rainfallSummary = [
  { province: 'Manicaland', max: '112.4 mm', status: 'High', tone: 'danger' as const },
  { province: 'Mashonaland East', max: '86.2 mm', status: 'Moderate', tone: 'gold' as const },
  { province: 'Masvingo', max: '54.1 mm', status: 'Moderate', tone: 'gold' as const },
  { province: 'Midlands', max: '28.6 mm', status: 'Light', tone: 'green' as const },
]

export const alertStatistics = [
  { label: 'Critical', pct: 14, color: '#d64545' },
  { label: 'Warning', pct: 21, color: '#ea580c' },
  { label: 'Watch', pct: 29, color: '#e6a70a' },
  { label: 'Advisory', pct: 36, color: '#2563eb' },
]

export const quickActions = [
  { label: 'Send SMS Alert', icon: MessageSquare, color: '#16794a', href: '/ops/emergency-operations' },
  { label: 'Activate SOP', icon: FileText, color: '#ea580c', href: '/ops/digital-sops' },
  { label: 'Generate Report', icon: Download, color: '#2563eb', href: '/ops/reports' },
  { label: 'Share Update', icon: Share2, color: '#7c3aed', href: '/ops/coordination/partners' },
  { label: 'Create Alert', icon: Bell, color: '#d64545', href: '/ops/early-warning/all-hazards' },
  { label: 'Risk Map', icon: Map, color: '#0f766e', href: '/ops/risk-intelligence/risk-map' },
]

export const keyContacts = [
  { name: 'DCP EOC Hotline', number: '+263 242 700 000', type: 'phone' as const },
  { name: 'Met Services', number: '+263 242 778 000', type: 'phone' as const },
  { name: 'ZINWA Operations', number: '+263 242 750 000', type: 'phone' as const },
  { name: 'WhatsApp Alerts', number: '+263 77 000 0000', type: 'whatsapp' as const },
]

export const hazardForecastTimeline = [
  { hazard: 'Flood', segments: ['critical', 'critical', 'warning', 'watch', 'clear', 'clear'] },
  { hazard: 'Severe Weather', segments: ['warning', 'warning', 'watch', 'watch', 'clear', 'clear'] },
  { hazard: 'Drought', segments: ['watch', 'watch', 'watch', 'watch', 'watch', 'watch'] },
  { hazard: 'Wildfire', segments: ['clear', 'advisory', 'advisory', 'watch', 'clear', 'clear'] },
]

export const timelineLabels = ['Now', '+6h', '+12h', '+24h', '+48h', '+72h']

export const eocStatus = {
  label: 'National DCP EOC',
  state: 'OPERATIONAL',
  uptime: 99.8,
  dataSources: 26,
  lastUpdate: '5 mins ago',
}

export type Alert = {
  title: string
  severity?: 'high' | 'normal'
  time: string
  kind: 'flood' | 'weather' | 'drought' | 'fire' | 'health'
}

export const alerts: Alert[] = [
  { title: 'Flood Warning — Save River at Chinhoyi', severity: 'high', time: '2h ago', kind: 'flood' },
  { title: 'Severe thunderstorm watch — Mutare District', severity: 'high', time: '4h ago', kind: 'weather' },
  { title: 'Drought conditions worsening in Matabeleland North', time: '6h ago', kind: 'drought' },
  { title: 'Wildfire risk elevated — Shurugwi District', time: 'Today', kind: 'fire' },
  { title: 'Cholera outbreak monitoring — Gutu District', time: 'Today', kind: 'health' },
]

export const riskIndicators = [
  { value: '74', label: 'Overall Risk Index', sub: 'High · +3 vs last month', icon: AlertTriangle, color: '#d64545' },
  { value: '312,450', label: 'People at Risk', sub: 'Across 9 districts', icon: Users, color: '#ea580c' },
  { value: '16', label: 'Districts on Watch', sub: 'Multi-hazard', icon: Map, color: '#e6a70a' },
  { value: '87%', label: 'National Readiness', sub: 'Weather preparedness', icon: Shield, color: '#16794a' },
]

export const provinceRiskLevels: Record<string, { fill: string; hover: string; level: string; risk: string }> = {
  Harare: { fill: '#F4A698', hover: '#FFC4B8', level: 'Moderate', risk: 'warning' },
  Bulawayo: { fill: '#9EC5E8', hover: '#B8D9F4', level: 'Low', risk: 'clear' },
  Manicaland: { fill: '#d64545', hover: '#ef6b6b', level: 'High', risk: 'critical' },
  'Mashonaland Central': { fill: '#F2C86B', hover: '#FAD98E', level: 'Moderate', risk: 'watch' },
  'Mashonaland East': { fill: '#ea580c', hover: '#fb923c', level: 'Warning', risk: 'warning' },
  'Mashonaland West': { fill: '#d64545', hover: '#ef6b6b', level: 'Critical', risk: 'critical' },
  Masvingo: { fill: '#ea580c', hover: '#fb923c', level: 'Warning', risk: 'warning' },
  'Matabeleland North': { fill: '#e6a70a', hover: '#facc15', level: 'Watch', risk: 'watch' },
  'Matabeleland South': { fill: '#16a34a', hover: '#22c55e', level: 'Low', risk: 'clear' },
  Midlands: { fill: '#2563eb', hover: '#3b82f6', level: 'Advisory', risk: 'advisory' },
}

export const provinceData: Record<
  string,
  {
    fill: string
    hover: string
    population: string
    districts: number
    villages: number
  }
> = {
  Harare: { fill: '#F4A698', hover: '#FFC4B8', population: '2.1M', districts: 4, villages: 412 },
  Bulawayo: { fill: '#9EC5E8', hover: '#B8D9F4', population: '665K', districts: 2, villages: 368 },
  Manicaland: { fill: '#d64545', hover: '#ef6b6b', population: '2.0M', districts: 7, villages: 4821 },
  'Mashonaland Central': { fill: '#F2C86B', hover: '#FAD98E', population: '1.3M', districts: 7, villages: 3912 },
  'Mashonaland East': { fill: '#ea580c', hover: '#fb923c', population: '1.6M', districts: 9, villages: 4441 },
  'Mashonaland West': { fill: '#d64545', hover: '#ef6b6b', population: '1.5M', districts: 7, villages: 4108 },
  Masvingo: { fill: '#ea580c', hover: '#fb923c', population: '1.5M', districts: 7, villages: 5014 },
  'Matabeleland North': { fill: '#e6a70a', hover: '#facc15', population: '824K', districts: 7, villages: 3221 },
  'Matabeleland South': { fill: '#16a34a', hover: '#22c55e', population: '726K', districts: 7, villages: 4225 },
  Midlands: { fill: '#2563eb', hover: '#3b82f6', population: '1.7M', districts: 8, villages: 4602 },
}

export const majorCities = [
  { name: 'Harare', coordinates: [31.05, -17.83] as [number, number], capital: true },
  { name: 'Bulawayo', coordinates: [28.58, -20.15] as [number, number], capital: false },
]

export const provinces = [
  'Harare',
  'Bulawayo',
  'Manicaland',
  'Mashonaland Central',
  'Mashonaland East',
  'Mashonaland West',
  'Midlands',
  'Masvingo',
  'Matabeleland North',
  'Matabeleland South',
]
