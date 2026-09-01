import type { LucideIcon } from 'lucide-react'
import {
  Home,
  LayoutGrid,
  BookOpen,
  Crown,
  Users,
  UserRound,
  Building2,
  Gavel,
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
  Briefcase,
  Wheat,
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
      { label: 'Home', icon: Home, href: '/' },
      { label: 'Platform Overview', icon: LayoutGrid, href: '/platform-overview' },
    ],
  },
  {
    title: 'Administrative Enablement',
    items: [
      { label: 'Digital Administrative Enabler', icon: Briefcase, href: '/admin-enabler' },
    ],
  },
  {
    title: 'Governance & Leadership',
    items: [
      {
        label: 'Traditional Leaders Profiles',
        icon: Crown,
        href: '/leaders',
        children: [
          { label: 'Chiefs', icon: Crown, href: '/leaders/chiefs' },
          { label: 'Headmen', icon: UserRound, href: '/leaders/headmen' },
          { label: 'Village Heads', icon: Users, href: '/leaders/village-heads' },
        ],
      },
    ],
  },
  {
    title: 'Data & Profiles',
    items: [
      { label: 'Household Profiles', icon: Users, href: '/households' },
      { label: 'Community Profiles', icon: Building2, href: '/communities' },
      { label: 'Traditional Court', icon: Gavel, href: '/courts' },
      { label: 'ZimVAC Dashboards', icon: BarChart3, href: '/zimvac' },
      { label: 'ZimLAC Dashboards', icon: Landmark, href: '/zimlac' },
      { label: 'District & Provincial Profiles', icon: Map, href: '/profiles/districts' },
    ],
  },
  {
    title: 'Services & Management',
    items: [
      { label: 'Development Projects', icon: HardHat, href: '/projects' },
      { label: 'Hazard & Risk Intelligence', icon: ShieldAlert, href: '/hazards' },
      { label: 'Environment & Climate', icon: Leaf, href: '/environment' },
      { label: 'Social Protection', icon: HeartHandshake, href: '/social-protection' },
      { label: 'Health', icon: HeartPulse, href: '/health' },
      { label: 'Education', icon: GraduationCap, href: '/education' },
      { label: 'Infrastructure & Services', icon: Route, href: '/infrastructure' },
    ],
  },
  {
    title: 'Reports & Insights',
    items: [
      { label: 'Reports & Analytics', icon: FileBarChart, href: '/reports' },
      {
        label: 'Indigenous Knowledge Systems (IKS)',
        icon: BookOpen,
        href: '/iks',
        children: [
          { label: 'Environment & Climate Change', icon: Leaf, href: '/iks/environment-climate-change' },
          { label: 'Agriculture', icon: Wheat, href: '/iks/agriculture' },
          { label: 'Cultural Heritage', icon: Landmark, href: '/iks/cultural-heritage' },
        ],
      },
      { label: 'AI Insights & Alerts', icon: Sparkles, href: '/ai-insights' },
      { label: 'Data Marketplace', icon: Store, href: '/marketplace' },
      { label: 'Governance Insights', icon: ScrollText, href: '/governance-insights' },
    ],
  },
]

export const journeySteps = [
  { label: 'Village', icon: Home, color: '#16794a' },
  { label: 'Ward', icon: Users, color: '#2563eb' },
  { label: 'District', icon: Building2, color: '#7c3aed' },
  { label: 'Province', icon: Landmark, color: '#e6a70a' },
  { label: 'National', icon: Map, color: '#2563eb' },
  { label: 'Cabinet', icon: Crown, color: '#d64545' },
]

export const atAGlance = {
  row1: [
    { value: '35,321', label: 'Villages' },
    { value: '10', label: 'Provinces' },
    { value: '63', label: 'Districts' },
    { value: '1,428', label: 'Traditional Leaders' },
  ],
  row2: [
    { value: '89,456', label: 'Households' },
    { value: '512,369', label: 'Population' },
    { value: '632', label: 'Active Projects' },
    { value: '7', label: 'Hazard Alerts' },
  ],
}

export type QuickModule = {
  title: string
  description: string
  icon: LucideIcon
  color: string
  href: string
}

export const quickModules: QuickModule[] = [
  {
    title: 'Traditional Leaders Profiles',
    description: 'Chiefs, headmen & village heads',
    icon: Crown,
    color: '#16794a',
    href: '/leaders',
  },
  {
    title: 'Household Profiles',
    description: 'Demographics, livelihoods & social protection',
    icon: Users,
    color: '#2563eb',
    href: '/households',
  },
  {
    title: 'Community Profiles',
    description: 'Community & village planning intelligence',
    icon: Building2,
    color: '#7c3aed',
    href: '/communities',
  },
  {
    title: 'Traditional Court',
    description: 'Court data, case management & performance metrics',
    icon: Gavel,
    color: '#d64545',
    href: '/courts',
  },
  {
    title: 'ZimVAC Dashboards',
    description: 'Food security & livelihood data',
    icon: BarChart3,
    color: '#0f766e',
    href: '/zimvac',
  },
  {
    title: 'ZimLAC Dashboards',
    description: 'Local governance & service delivery',
    icon: Landmark,
    color: '#c026d3',
    href: '/zimlac',
  },
  {
    title: 'Development Projects',
    description: 'Investments & project tracking',
    icon: HardHat,
    color: '#2563eb',
    href: '/projects',
  },
  {
    title: 'Hazard & Risk',
    description: 'Multi-hazard intelligence & early warning',
    icon: ShieldAlert,
    color: '#ea580c',
    href: '/hazards',
  },
  {
    title: 'Environment & Climate',
    description: 'Natural resources & climate resilience',
    icon: Leaf,
    color: '#16a34a',
    href: '/environment',
  },
  {
    title: 'Reports & Analytics',
    description: 'Custom reports, dashboards & data analytics',
    icon: FileBarChart,
    color: '#4f46e5',
    href: '/reports',
  },
  {
    title: 'AI Insights & Alerts',
    description: 'AI-powered insights, recommendations & alerts',
    icon: Sparkles,
    color: '#7c3aed',
    href: '/ai-insights',
  },
  {
    title: 'Digital Administrative Enabler',
    description: 'TLSS workflows, documents & succession protocols',
    icon: Briefcase,
    color: '#0f766e',
    href: '/admin-enabler',
  },
]

export const governanceStats = [
  { value: '514,834', label: 'Villages', icon: Home, color: '#16794a' },
  { value: '10', label: 'Provinces', icon: Landmark, color: '#16794a' },
  { value: '63', label: 'Districts', icon: Map, color: '#16794a' },
  { value: '1,428', label: 'Traditional Leaders', icon: Crown, color: '#e6a70a' },
  { value: '89', label: 'Hazard Alerts', icon: ShieldAlert, color: '#d64545' },
  { value: '632', label: 'Active Projects', icon: HardHat, color: '#16794a' },
  { value: 'USD 24.8B', label: 'Investment Pipeline', icon: Store, color: '#7c3aed' },
]

export const platformHealth = {
  uptime: 99.2,
  items: [
    'All Modules Operational',
    'Data Sync in Progress',
    'Total Users: 12,458',
    'Live Hazard Monitoring',
  ],
}

export type Alert = {
  title: string
  severity?: 'high' | 'normal'
  time: string
  kind: 'flood' | 'drought' | 'crop' | 'nutrition' | 'road'
}

export const alerts: Alert[] = [
  { title: 'Flood risk increases in Mutare District', severity: 'high', time: '2h ago', kind: 'flood' },
  { title: 'Drought conditions worsening in Matabeleland North', time: '6h ago', kind: 'drought' },
  { title: 'Maize planted area up 12% in Mhondoro Ngezi', time: 'Today', kind: 'crop' },
  { title: 'Nutrition intervention required in 8 districts', time: 'Today', kind: 'nutrition' },
  { title: 'Rural road project approvals underway', time: 'Today', kind: 'road' },
]

export const sdgGoals = [
  { n: 1, title: 'No Poverty', color: '#e5243b' },
  { n: 2, title: 'Zero Hunger', color: '#dda63a' },
  { n: 3, title: 'Good Health', color: '#4c9f38' },
  { n: 4, title: 'Quality Education', color: '#c5192d' },
  { n: 5, title: 'Gender Equality', color: '#ff3a21' },
  { n: 6, title: 'Clean Water', color: '#26bde2' },
  { n: 13, title: 'Climate Action', color: '#3f7e44' },
  { n: 15, title: 'Life on Land', color: '#56c02b' },
  { n: 8, title: 'Decent Work', color: '#a21942' },
]

export const dataAtAGlance = [
  { value: '16,664,880', label: 'Population', change: '+2.1% vs 2024', up: true, icon: Users, color: '#2563eb' },
  { value: '4,832,665', label: 'Households', change: '+2.8% vs 2024', up: true, icon: Home, color: '#16a34a' },
  { value: '12.4%', label: 'Food Insecure', change: '+3.2% vs 2024', up: true, icon: BarChart3, color: '#ea580c' },
  { value: '10.2%', label: 'Child Malnutrition', change: '+1.2% vs 2024', up: true, icon: HeartPulse, color: '#7c3aed' },
  { value: '7.8%', label: 'Out-of-School Children', change: '+1.2% vs 2024', up: true, icon: GraduationCap, color: '#c026d3' },
  { value: '14.1%', label: 'HIV Prevalence', change: '+0.8% vs 2024', up: true, icon: HeartHandshake, color: '#d64545' },
]

export const zimvacIndicators = [
  { code: 'FCS', value: '78%', status: 'Medium', pct: 78 },
  { code: 'HHS', value: '4.1', status: 'Low', pct: 60 },
  { code: 'rCSI', value: '6.3', status: 'Low Risk', pct: 45 },
  { code: 'DDS', value: '5.8', status: 'Good', pct: 72 },
]

export const zimlacServices = {
  overall: 81,
  items: [
    { label: 'Health', pct: 84 },
    { label: 'Water', pct: 79 },
    { label: 'Education', pct: 76 },
    { label: 'Social Protection', pct: 82 },
    { label: 'Infrastructure', pct: 78 },
  ],
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
  Manicaland: { fill: '#C4B5E8', hover: '#D9CEF4', population: '2.0M', districts: 7, villages: 4821 },
  'Mashonaland Central': { fill: '#F2C86B', hover: '#FAD98E', population: '1.3M', districts: 7, villages: 3912 },
  'Mashonaland East': { fill: '#F5B6C8', hover: '#FFD0DE', population: '1.6M', districts: 9, villages: 4441 },
  'Mashonaland West': { fill: '#F0A882', hover: '#FFC4A3', population: '1.5M', districts: 7, villages: 4108 },
  Masvingo: { fill: '#7FD4B8', hover: '#A3E8D1', population: '1.5M', districts: 7, villages: 5014 },
  'Matabeleland North': { fill: '#F2D97A', hover: '#FAE9A8', population: '824K', districts: 7, villages: 3221 },
  'Matabeleland South': { fill: '#A8D49A', hover: '#C4E8B8', population: '726K', districts: 7, villages: 4225 },
  Midlands: { fill: '#BFD4A0', hover: '#D4E8BE', population: '1.7M', districts: 8, villages: 4602 },
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
