import type { LucideIcon } from 'lucide-react'
import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  Gauge,
  Users,
  Crown,
  Building2,
  FileText,
  ScrollText,
  UserRound,
  Package,
  Wallet,
  BookOpen,
  GitBranch,
  ShieldCheck,
  Mail,
  Inbox,
  Send,
  FolderOpen,
  Landmark,
} from 'lucide-react'

export const adminEnablerKpis = [
  { value: '1,248', label: 'Total Requests', sub: '+86 this month', icon: ClipboardList, color: '#16794a' },
  { value: '186', label: 'Pending Approvals', sub: '12 high priority', icon: Clock3, color: '#ea580c' },
  { value: '892', label: 'Tasks Completed', sub: '71% of assigned', icon: CheckCircle2, color: '#2563eb' },
  { value: '92%', label: 'SLA Compliance', sub: 'Above target', icon: Gauge, color: '#7c3aed' },
  { value: '342', label: 'Active Users', sub: 'TLSS officers', icon: Users, color: '#0f766e' },
]

export const adminEnablerTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'requests', label: 'Requests & Workflows' },
  { id: 'documents', label: 'Document Management' },
  { id: 'correspondence', label: 'Correspondence' },
  { id: 'hr', label: 'Human Resource' },
  { id: 'assets', label: 'Assets & Inventory' },
  { id: 'finance', label: 'Finance & Budgets' },
  { id: 'knowledge', label: 'Knowledge & Circulars' },
  { id: 'succession', label: 'Succession Protocols', badge: 'NEW' },
  { id: 'performance', label: 'Performance & Compliance' },
] as const

export type AdminEnablerTabId = (typeof adminEnablerTabs)[number]['id']

export const workflowOverview = [
  { label: 'Completed', value: 48, color: '#16794a' },
  { label: 'In Progress', value: 28, color: '#2563eb' },
  { label: 'Pending', value: 16, color: '#e6a70a' },
  { label: 'Overdue', value: 8, color: '#d64545' },
]

export const requestsByCategory = [
  { label: 'Leader Recognition', count: 214, pct: 17, icon: Crown, color: '#16794a' },
  { label: 'Council Support', count: 186, pct: 15, icon: Building2, color: '#2563eb' },
  { label: 'Document Clearance', count: 162, pct: 13, icon: FileText, color: '#7c3aed' },
  { label: 'Succession Cases', count: 98, pct: 8, icon: GitBranch, color: '#ea580c' },
  { label: 'Circular Circulation', count: 144, pct: 12, icon: ScrollText, color: '#0f766e' },
  { label: 'Other Admin', count: 444, pct: 35, icon: ClipboardList, color: '#64748b' },
]

export const pendingApprovals = [
  { title: 'Chief appointment dossier — Masvingo', priority: 'High' as const, age: '2 days' },
  { title: 'Village boundary gazette notice', priority: 'High' as const, age: '1 day' },
  { title: 'Council allowance schedule Q3', priority: 'Medium' as const, age: '4 days' },
  { title: 'Asset transfer — Makoni district office', priority: 'Medium' as const, age: '5 days' },
  { title: 'Circular 14/2025 endorsement', priority: 'Low' as const, age: '6 days' },
]

export const successionStages = [
  { label: 'Nominations at Village Level', count: 42, color: '#16794a' },
  { label: 'Headman Review', count: 28, color: '#2563eb' },
  { label: 'Chief Endorsement', count: 19, color: '#7c3aed' },
  { label: 'District Verification', count: 14, color: '#e6a70a' },
  { label: 'Provincial Clearance', count: 9, color: '#ea580c' },
  { label: 'Cabinet Approval', count: 5, color: '#d64545' },
]

export const recentRequests = [
  { ref: 'REQ-2025-1142', type: 'Leader Recognition', submitter: 'PA Manicaland', date: '20 May 2025', status: 'In Progress' as const },
  { ref: 'REQ-2025-1138', type: 'Succession Case', submitter: 'DA Makoni', date: '19 May 2025', status: 'Pending' as const },
  { ref: 'REQ-2025-1131', type: 'Document Clearance', submitter: 'TLSS HQ', date: '18 May 2025', status: 'Completed' as const },
  { ref: 'REQ-2025-1124', type: 'Council Support', submitter: 'Chief Nyashanu', date: '17 May 2025', status: 'Overdue' as const },
  { ref: 'REQ-2025-1119', type: 'Circular Circulation', submitter: 'MLGPW Secretariat', date: '16 May 2025', status: 'Completed' as const },
]

export const documentStats = [
  { label: 'Policy & Circulars', value: '318', icon: ScrollText, color: '#16794a' },
  { label: 'Letters & Memos', value: '1,042', icon: Mail, color: '#2563eb' },
  { label: 'Case Files', value: '564', icon: FolderOpen, color: '#7c3aed' },
  { label: 'Gazettes', value: '86', icon: Landmark, color: '#e6a70a' },
]

export const recentDocuments = [
  { name: 'Circular 14/2025 — Allowance Guidelines', type: 'Circular', updated: 'Today' },
  { name: 'Succession Protocol Manual v3.1', type: 'Policy', updated: 'Yesterday' },
  { name: 'TLSS Staff Establishment Memo', type: 'Memo', updated: '2 days ago' },
  { name: 'Makoni Asset Register Export', type: 'Register', updated: '3 days ago' },
]

export const correspondenceStats = [
  { label: 'Incoming', value: '214', icon: Inbox, color: '#2563eb' },
  { label: 'Outgoing', value: '186', icon: Send, color: '#16794a' },
  { label: 'Internal', value: '97', icon: Mail, color: '#7c3aed' },
  { label: 'Acknowledged', value: '312', icon: CheckCircle2, color: '#0f766e' },
]

export const recentCorrespondence = [
  { subject: 'Request for chieftainship verification support', from: 'DA Gutu', direction: 'Incoming', date: '20 May' },
  { subject: 'Cabinet brief — succession batch May 2025', from: 'TLSS Director', direction: 'Outgoing', date: '19 May' },
  { subject: 'Internal routing — circular distribution list', from: 'Registry', direction: 'Internal', date: '19 May' },
]

export const taskStats = [
  { label: 'Total', value: '1,248' },
  { label: 'Completed', value: '892' },
  { label: 'In Progress', value: '268' },
  { label: 'Overdue', value: '88' },
]

export const upcomingTasks = [
  { title: 'Clear 6 high-priority approvals', due: 'Today', tone: 'danger' as const },
  { title: 'Publish Knowledge Circular digest', due: 'Tomorrow', tone: 'gold' as const },
  { title: 'Review succession dossier batch #27', due: '23 May', tone: 'info' as const },
  { title: 'Update district asset inventory', due: '25 May', tone: 'muted' as const },
]

export const knowledgeRecords = [
  { title: 'Drought-resistant seed selection methods', domain: 'Agriculture', custodian: 'Headman Chisvo Council', status: 'Verified' as const },
  { title: 'Restorative mediation for family disputes', domain: 'Conflict Resolution', custodian: 'Chief Nyashanu Court', status: 'Published' as const },
  { title: 'Herbal treatment mapping for seasonal fevers', domain: 'Health & Healing', custodian: 'Village Health Elders', status: 'Review' as const },
  { title: 'Traditional spring recharge conservation', domain: 'Water Management', custodian: 'Ward 12 Cultural Trust', status: 'Published' as const },
]

export const tabIcons: Record<AdminEnablerTabId, LucideIcon> = {
  overview: ClipboardList,
  requests: ClipboardList,
  documents: FileText,
  correspondence: Mail,
  hr: UserRound,
  assets: Package,
  finance: Wallet,
  knowledge: BookOpen,
  succession: GitBranch,
  performance: ShieldCheck,
}
