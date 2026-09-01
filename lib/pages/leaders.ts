import { Crown, UserRound, Users, AlertTriangle, ClipboardList } from 'lucide-react'
import type { KpiItem, TableColumn, TableCell } from '@/components/dare/page-primitives'

export const leaderKpis: KpiItem[] = [
  { value: '286', label: 'Chiefs', sub: '+12 this month', icon: Crown, color: '#2563eb' },
  { value: '482', label: 'Headmen', sub: '+10 this month', icon: UserRound, color: '#16794a' },
  { value: '35,124', label: 'Village Heads', sub: '+312 this month', icon: Users, color: '#7c3aed' },
  { value: '116', label: 'Vacant Positions', sub: '-4 this month', icon: AlertTriangle, color: '#d64545' },
  { value: '38', label: 'Pending Appointments', sub: 'Under Review', icon: ClipboardList, color: '#e6a70a' },
]

export const leadersByProvince = [
  { province: 'Harare', chiefs: 8, headmen: 14, villageHeads: 412, vacancies: 4 },
  { province: 'Bulawayo', chiefs: 6, headmen: 11, villageHeads: 368, vacancies: 3 },
  { province: 'Manicaland', chiefs: 42, headmen: 68, villageHeads: 4821, vacancies: 16 },
  { province: 'Mashonaland Central', chiefs: 31, headmen: 54, villageHeads: 3912, vacancies: 12 },
  { province: 'Mashonaland East', chiefs: 36, headmen: 61, villageHeads: 4441, vacancies: 14 },
  { province: 'Mashonaland West', chiefs: 34, headmen: 57, villageHeads: 4108, vacancies: 13 },
  { province: 'Midlands', chiefs: 38, headmen: 63, villageHeads: 4602, vacancies: 15 },
  { province: 'Masvingo', chiefs: 41, headmen: 71, villageHeads: 5014, vacancies: 18 },
  { province: 'Matabeleland North', chiefs: 26, headmen: 43, villageHeads: 3221, vacancies: 11 },
  { province: 'Matabeleland South', chiefs: 24, headmen: 40, villageHeads: 4225, vacancies: 10 },
]

export const genderDistribution = [
  { label: 'Male', value: 82, color: '#2563eb' },
  { label: 'Female', value: 18, color: '#7c3aed' },
]

export const ageDistribution = [
  { label: '25–30', pct: 1 },
  { label: '31–40', pct: 6 },
  { label: '41–50', pct: 22 },
  { label: '51–60', pct: 48 },
  { label: '61–70', pct: 18 },
  { label: '71+', pct: 5 },
]

export type LeaderRole = 'Chief' | 'Headman' | 'Village Head'

export type LeaderRecord = {
  id: string
  name: string
  role: LeaderRole
  province: string
  district: string
  area: string
  status: 'Active' | 'Acting' | 'Vacant'
  years: number
}

export const leaderRegister: LeaderRecord[] = [
  {
    id: 'CHR-MAK-001',
    name: 'Chief Makoni',
    role: 'Chief',
    province: 'Manicaland',
    district: 'Makoni',
    area: 'Makoni Chieftainship',
    status: 'Active',
    years: 18,
  },
  {
    id: 'HDN-CHM-014',
    name: 'Headman Chimwewe',
    role: 'Headman',
    province: 'Manicaland',
    district: 'Makoni',
    area: 'Chimwewe Headmanship',
    status: 'Active',
    years: 11,
  },
  {
    id: 'VH-CHT-087',
    name: 'Bvepfepfe Onias',
    role: 'Village Head',
    province: 'Manicaland',
    district: 'Makoni',
    area: 'Chitora Village',
    status: 'Active',
    years: 22,
  },
  {
    id: 'CHR-MSV-004',
    name: 'Chief Masvingo',
    role: 'Chief',
    province: 'Masvingo',
    district: 'Masvingo',
    area: 'Masvingo Chiefdom',
    status: 'Active',
    years: 14,
  },
  {
    id: 'VH-MBH-112',
    name: 'VH Nyoni',
    role: 'Village Head',
    province: 'Masvingo',
    district: 'Gutu',
    area: 'Mabhena Village',
    status: 'Active',
    years: 9,
  },
  {
    id: 'HDN-CHG-022',
    name: 'Headman Chigubu',
    role: 'Headman',
    province: 'Masvingo',
    district: 'Gutu',
    area: 'Chigubu Headmanship',
    status: 'Active',
    years: 16,
  },
  {
    id: 'CHR-MUT-009',
    name: 'Chief Mutasa',
    role: 'Chief',
    province: 'Manicaland',
    district: 'Mutasa',
    area: 'Mutasa Chieftainship',
    status: 'Acting',
    years: 3,
  },
  {
    id: 'VH-MND-201',
    name: 'Village Head Ncube',
    role: 'Village Head',
    province: 'Matabeleland North',
    district: 'Hwange',
    area: 'Mandiya Village',
    status: 'Active',
    years: 7,
  },
  {
    id: 'HDN-MHR-031',
    name: 'Headman Mhondoro',
    role: 'Headman',
    province: 'Mashonaland West',
    district: 'Mhondoro-Ngezi',
    area: 'Mhondoro Headmanship',
    status: 'Vacant',
    years: 0,
  },
  {
    id: 'CHR-GOK-012',
    name: 'Chief Nhema',
    role: 'Chief',
    province: 'Midlands',
    district: 'Shurugwi',
    area: 'Nhema Chieftainship',
    status: 'Active',
    years: 21,
  },
]

export const leaderColumns: TableColumn[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Leader' },
  { key: 'role', label: 'Role' },
  { key: 'province', label: 'Province' },
  { key: 'district', label: 'District' },
  { key: 'area', label: 'Jurisdiction' },
  { key: 'status', label: 'Status' },
  { key: 'years', label: 'Years' },
]

export function leaderRows(records: LeaderRecord[]): Record<string, TableCell>[] {
  return records.map((r) => ({
    id: r.id,
    name: { type: 'link', label: r.name, href: `/leaders/${r.id}` },
    role: r.role,
    province: r.province,
    district: r.district,
    area: r.area,
    status: {
      type: 'badge',
      label: r.status,
      tone: r.status === 'Active' ? 'green' : r.status === 'Acting' ? 'gold' : 'danger',
    },
    years: r.years || '—',
  }))
}

export type FamilyTreeMember = {
  id: string
  name: string
  relation: string
  years?: string
  living: boolean
  highlight?: boolean
  badge?: { label: string; tone: 'green' | 'gold' | 'info' | 'muted' | 'danger' }
}

export type FamilyTreeGeneration = {
  members: FamilyTreeMember[]
}

export const leaderProfiles: Record<
  string,
  {
    name: string
    title: string
    location: string
    years: number
    households: number
    status: string
    rating: string
    family: { label: string; value: string }[]
    familyTree: FamilyTreeGeneration[]
    successors: { name: string; relation: string; age: number; standing: string; score: number }[]
    compliance: { label: string; done: boolean }[]
    insights: string[]
  }
> = {
  'VH-CHT-087': {
    name: 'Bvepfepfe Onias',
    title: 'Village Head — Chitora Village',
    location: 'Village: Chitora · Headmanship: Chimwewe · Chieftainship: Makoni · District: Makoni · Province: Manicaland',
    years: 22,
    households: 31,
    status: 'Stable',
    rating: '4.7 / 5',
    family: [
      { label: 'Family members', value: '27' },
      { label: 'Eligible successors', value: '4' },
      { label: 'Leadership generations', value: '7' },
      { label: 'Living elders', value: '6' },
      { label: 'Youth leaders', value: '3' },
      { label: 'Women leaders', value: '2' },
    ],
    familyTree: [
      {
        members: [
          { id: 'ggf', name: 'Muchengeti Onias', relation: 'Great Grandfather', years: '1890–1923', living: false },
          { id: 'gf', name: 'Chitora Onias', relation: 'Grandfather', years: '1920–1978', living: false },
          { id: 'gu', name: 'Mhlanga Onias', relation: 'Great Uncle', years: '1925–1985', living: false },
        ],
      },
      {
        members: [
          { id: 'father', name: 'Mhlanga Bvepfepfe', relation: 'Father', years: '1948–2019 · Retired', living: false },
        ],
      },
      {
        members: [
          {
            id: 'incumbent',
            name: 'Bvepfepfe Onias',
            relation: 'Village Head',
            years: '2003–present · 22 years',
            living: true,
            highlight: true,
            badge: { label: 'Active', tone: 'green' },
          },
        ],
      },
      {
        members: [
          {
            id: 's1',
            name: 'Tinashe Bvepfepfe',
            relation: 'First Son',
            years: 'Age 41',
            living: true,
            badge: { label: 'Eligible', tone: 'green' },
          },
          {
            id: 's2',
            name: 'Kudzai Bvepfepfe',
            relation: 'Second Son',
            years: 'Age 36',
            living: true,
            badge: { label: 'Eligible', tone: 'green' },
          },
          {
            id: 'd1',
            name: 'Rudo Bvepfepfe',
            relation: 'Daughter',
            years: 'Age 33',
            living: true,
            badge: { label: 'Supporting role', tone: 'gold' },
          },
          {
            id: 'n1',
            name: 'Farai Chimwewe',
            relation: 'Nephew',
            years: 'Age 29',
            living: true,
            badge: { label: 'Pending', tone: 'info' },
          },
          {
            id: 'gd1',
            name: 'Memory Bvepfepfe',
            relation: 'Granddaughter',
            years: 'Age 14',
            living: true,
            badge: { label: 'Future prospect', tone: 'muted' },
          },
        ],
      },
    ],
    successors: [
      { name: 'Tinashe Bvepfepfe', relation: 'Son', age: 41, standing: 'Excellent', score: 95 },
      { name: 'Kudzai Bvepfepfe', relation: 'Son', age: 36, standing: 'Very Good', score: 88 },
      { name: 'Rudo Bvepfepfe', relation: 'Daughter', age: 33, standing: 'Good', score: 74 },
      { name: 'Farai Chimwewe', relation: 'Nephew', age: 29, standing: 'Pending', score: 62 },
    ],
    compliance: [
      { label: 'Family tree verified', done: true },
      { label: 'Chief approved', done: true },
      { label: 'District records updated', done: true },
      { label: 'Succession hearing scheduled', done: false },
    ],
    insights: [
      'Incumbent is 87 years old; likely retirement window is 2–5 years.',
      'Succession readiness score is 84% with 96% model confidence.',
      'Direct-line successor Tinashe Bvepfepfe is eligible and community-supported.',
    ],
  },
  'CHR-MAK-001': {
    name: 'Chief Makoni',
    title: 'Chief — Makoni Chieftainship',
    location: 'Chieftainship: Makoni · District: Makoni · Province: Manicaland',
    years: 18,
    households: 4180,
    status: 'Stable',
    rating: '4.9 / 5',
    family: [
      { label: 'Family members', value: '41' },
      { label: 'Eligible successors', value: '3' },
      { label: 'Leadership generations', value: '9' },
      { label: 'Headmen under jurisdiction', value: '14' },
      { label: 'Village heads supervised', value: '412' },
      { label: 'Council elders', value: '8' },
    ],
    familyTree: [
      {
        members: [
          { id: 'mak-ggf', name: 'Makoni Muchengeti', relation: 'Founding Patriarch', years: '1875–1941', living: false },
          { id: 'mak-gf', name: 'Makoni Chigwedere', relation: 'Grandfather', years: '1908–1982', living: false },
          { id: 'mak-unc', name: 'Makoni Nyamukapa', relation: 'Great Uncle', years: '1912–1990', living: false },
        ],
      },
      {
        members: [
          { id: 'mak-f', name: 'Makoni Chitsa', relation: 'Father · Former Chief', years: '1935–2011 · Served 32 years', living: false },
        ],
      },
      {
        members: [
          {
            id: 'mak-inc',
            name: 'Chief Makoni',
            relation: 'Chief · Makoni Chieftainship',
            years: '2008–present · 18 years',
            living: true,
            highlight: true,
            badge: { label: 'Active', tone: 'green' },
          },
        ],
      },
      {
        members: [
          {
            id: 'mak-s1',
            name: 'Tendai Makoni',
            relation: 'First Son',
            years: 'Age 48',
            living: true,
            badge: { label: 'Eligible', tone: 'green' },
          },
          {
            id: 'mak-s2',
            name: 'Farai Makoni',
            relation: 'Second Son',
            years: 'Age 44',
            living: true,
            badge: { label: 'Eligible', tone: 'green' },
          },
          {
            id: 'mak-n1',
            name: 'Simbarashe Makoni',
            relation: 'Nephew',
            years: 'Age 39',
            living: true,
            badge: { label: 'Pending', tone: 'info' },
          },
          {
            id: 'mak-d1',
            name: 'Rutendo Makoni',
            relation: 'Daughter',
            years: 'Age 42',
            living: true,
            badge: { label: 'Advisory role', tone: 'gold' },
          },
        ],
      },
    ],
    successors: [
      { name: 'Tendai Makoni', relation: 'Son', age: 48, standing: 'Excellent', score: 92 },
      { name: 'Farai Makoni', relation: 'Son', age: 44, standing: 'Very Good', score: 86 },
      { name: 'Simbarashe Makoni', relation: 'Nephew', age: 39, standing: 'Good', score: 78 },
    ],
    compliance: [
      { label: 'Family tree verified', done: true },
      { label: 'Ministry of Local Government confirmed', done: true },
      { label: 'Provincial council ratified', done: true },
      { label: 'Succession register updated', done: true },
    ],
    insights: [
      'Chiefdom succession line is well documented across nine generations.',
      'Direct-line successor Tendai Makoni has completed traditional council training.',
      'No immediate vacancy risk; incumbent age profile suggests 8–12 year horizon.',
    ],
  },
  'HDN-CHM-014': {
    name: 'Headman Chimwewe',
    title: 'Headman — Chimwewe Headmanship',
    location: 'Headmanship: Chimwewe · Chieftainship: Makoni · District: Makoni · Province: Manicaland',
    years: 11,
    households: 186,
    status: 'Stable',
    rating: '4.6 / 5',
    family: [
      { label: 'Family members', value: '32' },
      { label: 'Eligible successors', value: '3' },
      { label: 'Leadership generations', value: '6' },
      { label: 'Village heads supervised', value: '12' },
      { label: 'Living elders', value: '5' },
      { label: 'Women leaders', value: '3' },
    ],
    familyTree: [
      {
        members: [
          { id: 'chm-ggf', name: 'Chimwewe Mhlanga', relation: 'Great Grandfather', years: '1910–1976', living: false },
          { id: 'chm-gf', name: 'Chimwewe Chitora', relation: 'Grandfather', years: '1938–1998', living: false },
        ],
      },
      {
        members: [
          { id: 'chm-f', name: 'Chimwewe Bvepfepfe', relation: 'Father · Former Headman', years: '1960–2018 · Served 24 years', living: false },
        ],
      },
      {
        members: [
          {
            id: 'chm-inc',
            name: 'Headman Chimwewe',
            relation: 'Headman · Chimwewe Headmanship',
            years: '2015–present · 11 years',
            living: true,
            highlight: true,
            badge: { label: 'Active', tone: 'green' },
          },
        ],
      },
      {
        members: [
          {
            id: 'chm-s1',
            name: 'Tapiwa Chimwewe',
            relation: 'First Son',
            years: 'Age 38',
            living: true,
            badge: { label: 'Eligible', tone: 'green' },
          },
          {
            id: 'chm-s2',
            name: 'Blessing Chimwewe',
            relation: 'Second Son',
            years: 'Age 34',
            living: true,
            badge: { label: 'Eligible', tone: 'green' },
          },
          {
            id: 'chm-n1',
            name: 'Bvepfepfe Onias',
            relation: 'Cousin · Village Head',
            years: 'Chitora Village',
            living: true,
            badge: { label: 'Serving', tone: 'info' },
          },
          {
            id: 'chm-d1',
            name: 'Chipo Chimwewe',
            relation: 'Daughter',
            years: 'Age 31',
            living: true,
            badge: { label: 'Supporting role', tone: 'gold' },
          },
        ],
      },
    ],
    successors: [
      { name: 'Tapiwa Chimwewe', relation: 'Son', age: 38, standing: 'Excellent', score: 90 },
      { name: 'Blessing Chimwewe', relation: 'Son', age: 34, standing: 'Very Good', score: 83 },
      { name: 'Chipo Chimwewe', relation: 'Daughter', age: 31, standing: 'Good', score: 71 },
    ],
    compliance: [
      { label: 'Family tree verified', done: true },
      { label: 'Chief Makoni approved', done: true },
      { label: 'District records updated', done: true },
      { label: 'Village head register synced', done: true },
    ],
    insights: [
      'Headmanship supervises 12 village heads including Bvepfepfe Onias at Chitora.',
      'Succession readiness score is 88% with strong community consensus.',
      'Direct-line successor Tapiwa Chimwewe has served on the traditional council for 6 years.',
    ],
  },
}
