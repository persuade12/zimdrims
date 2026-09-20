import {
  incidentMarkers,
  responseProvinceColors,
  droughtProvinceColors,
} from '@/lib/concept-data'

export const riskLegend = [
  { color: '#d64545', label: 'Critical / High' },
  { color: '#ea580c', label: 'Major / Warning' },
  { color: '#e6a70a', label: 'Watch' },
  { color: '#86efac', label: 'Low / Clear' },
]

export const recoveryProvinceColors: Record<string, string> = {
  Harare: '#86efac',
  Bulawayo: '#bbf7d0',
  Manicaland: '#ea580c',
  'Mashonaland Central': '#fde047',
  'Mashonaland East': '#fdba74',
  'Mashonaland West': '#fca5a5',
  Masvingo: '#fdba74',
  'Matabeleland North': '#86efac',
  'Matabeleland South': '#16a34a',
  Midlands: '#fde047',
}

export const anticipationProvinceColors = droughtProvinceColors

export const coordinationProvinceColors: Record<string, string> = {
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

export const knowledgeProvinceColors: Record<string, string> = {
  Harare: '#93c5fd',
  Bulawayo: '#bfdbfe',
  Manicaland: '#2563eb',
  'Mashonaland Central': '#60a5fa',
  'Mashonaland East': '#3b82f6',
  'Mashonaland West': '#2563eb',
  Masvingo: '#1d4ed8',
  'Matabeleland North': '#93c5fd',
  'Matabeleland South': '#bfdbfe',
  Midlands: '#60a5fa',
}

export type MapStory = {
  headline: string
  beats: string[]
}

export type MapBlock = {
  title: string
  provinceColors: Record<string, string>
  markers?: typeof incidentMarkers
  legend?: { color: string; label: string }[]
  story?: MapStory
  provinceStories?: Record<string, string>
}

export const storyMarkers = incidentMarkers

export const provinceStoryBeats: Record<string, string> = {
  Harare: 'Urban density elevates health and flood flash-risk; call centre volume is highest here.',
  Bulawayo: 'Stable baseline with pockets of water stress — monitoring drought indicators.',
  Manicaland: 'Eastern Highlands remain the national hotspot for flood, cyclone and recovery caseload.',
  'Mashonaland Central': 'Watch posture — rainfall anomalies and river rises under review.',
  'Mashonaland East': 'Warning corridor linking Harare catchments to rural flood plains.',
  'Mashonaland West': 'Save River basin drives critical flood warnings and evacuation readiness.',
  Masvingo: 'Southern drought and health alerts overlap — anticipatory action priority.',
  'Matabeleland North': 'Seasonal drought watch with fire risk in Hwange corridor.',
  'Matabeleland South': 'Lower residual risk — resilience and recovery programmes advancing.',
  Midlands: 'Mixed hazard picture — wildfire advisory and logistics staging province.',
}

export function storyMap(
  title: string,
  story: MapStory,
  colors: Record<string, string> = responseProvinceColors,
  opts?: { markers?: boolean; legend?: boolean },
): MapBlock {
  return {
    title,
    provinceColors: colors,
    markers: opts?.markers === false ? undefined : storyMarkers,
    legend: opts?.legend === false ? undefined : riskLegend,
    story,
    provinceStories: provinceStoryBeats,
  }
}

/** Preset stories aligned to the Aug 2026 concept package modules */
export const mapStories = {
  neoc: storyMap('National Situation Map', {
    headline: 'National picture: flood critical in the east and west, drought watch in the south.',
    beats: [
      'NEOC is tracking 14 active alerts across 7 provinces.',
      'Manicaland and Mashonaland West concentrate the highest-impact incidents.',
      'Tap a province to zoom into local risk and population exposure.',
    ],
  }),
  earlyWarning: storyMap('Multi-Hazard Alert Map', {
    headline: 'Early warning is concentrated along river basins and the drought corridor.',
    beats: [
      'Flood and severe weather dominate the 24–72 hour outlook.',
      'Drought remains a slow-onset watch in Matabeleland and Masvingo.',
      'Selecting a province opens the local alert story.',
    ],
  }),
  risk: storyMap('Composite Risk Map', {
    headline: 'Composite risk peaks where exposure, vulnerability and active hazards overlap.',
    beats: [
      'Buhera, Chipinge and Chiredzi lead the hotspot register.',
      'Risk layers combine flood, drought, cyclone and health signals.',
      'Use the explorer to drill from province to ward-level indicators.',
    ],
  }),
  impact: storyMap('Impact Footprint', {
    headline: 'Impact is heaviest where people, livelihoods and infrastructure collide with hazard.',
    beats: [
      'People in need cluster in Manicaland and the southern drought belt.',
      'Crop and livestock losses track the same southern corridor.',
      'Click a province to see who is affected where.',
    ],
  }),
  needs: storyMap(
    'Needs Geography',
    {
      headline: 'Unmet needs follow the response gap — not only where the hazard hit hardest.',
      beats: [
        'Food, WASH and shelter gaps remain largest in Buhera and Chiredzi.',
        'Partner coverage is denser near Harare than in remote districts.',
        'Map selection guides prioritisation for the next allocation cycle.',
      ],
    },
    coordinationProvinceColors,
  ),
  anticipation: storyMap(
    'Anticipation Outlook',
    {
      headline: 'Triggers are approaching in the drought corridor while flood AA stays on watch.',
      beats: [
        'SPI thresholds are nearing activation for southern priority districts.',
        'Pre-positioned actions and finance windows are linked to these geographies.',
        'Select a province to see lead time and readiness context.',
      ],
    },
    anticipationProvinceColors,
  ),
  trigger: storyMap(
    'Trigger Geography',
    {
      headline: 'Where thresholds are closest to firing — and where AA can still get ahead of impact.',
      beats: [
        'Save Basin flood trigger is already active; drought SPI is approaching.',
        'Cyclone track risk remains offshore — watch Chimanimani / Chipinge.',
        'Province focus shows which SOP and finance windows are armed.',
      ],
    },
    anticipationProvinceColors,
  ),
  financing: storyMap(
    'Financing Windows Map',
    {
      headline: 'Pre-arranged finance is mapped to the same trigger geographies as AA plans.',
      beats: [
        'CERF and national contingency cover the drought corridor first.',
        'Flood AA finance is live for eastern river basins.',
        'Gaps appear where triggers exist but instruments are still pipeline.',
      ],
    },
    anticipationProvinceColors,
  ),
  incidentCommand: storyMap('ICS Command Footprint', {
    headline: 'Six active command posts cover the national incident set.',
    beats: [
      'Flood ICS dominate Mashonaland West and Manicaland.',
      'Health and drought commands hold Harare and Masvingo.',
      'Click a province to see which command posture applies.',
    ],
  }),
  shelters: storyMap('Shelters & Evacuation Map', {
    headline: 'Shelter load follows evacuation orders along flood corridors.',
    beats: [
      'Highest occupancy sits in Buhera, Chipinge and Makonde catchments.',
      'Host communities absorb overflow where formal sites are stressed.',
      'Select a province for occupancy and WASH stress context.',
    ],
  }),
  coordination: storyMap(
    'Partner Presence Map',
    {
      headline: 'Who is where — government, UN, NGO and SADC presence across provinces.',
      beats: [
        'Partner density peaks in Harare and Manicaland response theatres.',
        '5W coverage still thins in parts of Matabeleland South.',
        'Tap a province to read the coordination story.',
      ],
    },
    coordinationProvinceColors,
  ),
  government: storyMap(
    'Government Coordination Map',
    {
      headline: 'Provincial EOCs are reporting — uneven completeness shows where ICC follow-up is needed.',
      beats: [
        'All ten provinces are linked; reporting rate varies.',
        'Transport and health actions lag in western flood zones.',
        'Province select highlights ministry action focus.',
      ],
    },
    coordinationProvinceColors,
  ),
  sadc: storyMap(
    'SADC Cross-Border Watch',
    {
      headline: 'Regional hazards do not stop at borders — Limpopo, drought and cholera links.',
      beats: [
        'Southern and eastern provinces face shared basin and health risks.',
        'Mutual aid and information exchange track these corridors.',
        'Select a border-facing province for the regional angle.',
      ],
    },
    coordinationProvinceColors,
  ),
  recovery: storyMap(
    'Recovery Landscape',
    {
      headline: 'Recovery progress is furthest where damage was lighter — eastern rebuild still leads the backlog.',
      beats: [
        'Buhera and Chipinge carry the largest BBB and housing pipeline.',
        'Makonde infrastructure works are advancing faster than eastern peers.',
        'Click a province to see recovery posture.',
      ],
    },
    recoveryProvinceColors,
  ),
  damage: storyMap(
    'Loss & Damage Concentration',
    {
      headline: 'Damage clusters where flood and drought footprints overlapped this season.',
      beats: [
        'Housing and bridge losses concentrate in Manicaland and Mashonaland West.',
        'Agricultural loss dominates the southern drought belt.',
        'Province view links verified assessments to cost estimates.',
      ],
    },
    recoveryProvinceColors,
  ),
  bbb: storyMap(
    'Build Back Better Footprint',
    {
      headline: 'BBB projects are planted where the same hazard is likely to return.',
      beats: [
        'Flood-elevated housing and cyclone roofing kits target the east.',
        'Drought-resilient WASH points track Masvingo and Matabeleland.',
        'Select a province to see which standard is being applied.',
      ],
    },
    recoveryProvinceColors,
  ),
  resilience: storyMap(
    'Community Resilience Map',
    {
      headline: 'Resilience investments thicken where communities already face recurring risk.',
      beats: [
        'EW committees and watershed work lean into Manicaland and Chipinge.',
        'Social protection + DRR combinations show in the drought south.',
        'Tap a province for the local resilience story.',
      ],
    },
    recoveryProvinceColors,
  ),
  iks: storyMap(
    'IKS Contribution Map',
    {
      headline: 'Indigenous knowledge is being documented where communities already read the land and sky.',
      beats: [
        'Matabeleland drought signs and Save basin flood lore are priority entries.',
        'Validated IKS is being linked into early warning practice.',
        'Select a province to see contribution focus.',
      ],
    },
    knowledgeProvinceColors,
  ),
  analytics: storyMap(
    'Analytics Coverage Map',
    {
      headline: 'Live boards are densest where data feeds and operational demand meet.',
      beats: [
        'Alert and 5W analytics light up eastern and central ops theatres.',
        'Recovery burn-rate views trail in lower-caseload provinces.',
        'Province select shows where analysts are watching closest.',
      ],
    },
    knowledgeProvinceColors,
  ),
  publicAlerts: storyMap('Where Alerts Are Active', {
    headline: 'Public alerts are concentrated in flood basins, drought south and health clusters.',
    beats: [
      'Critical flood messaging focuses on Mashonaland West and Manicaland.',
      'Drought watch continues in Matabeleland North.',
      'Tap your province for the local public message.',
    ],
  }),
  publicSituation: storyMap('National Situation at a Glance', {
    headline: 'The country is in a multi-hazard posture — respond in the east, anticipate in the south.',
    beats: [
      'Flood response operations remain the most visible activity.',
      'Drought anticipation and health surveillance run in parallel.',
      'Select a province to understand what it means for families there.',
    ],
  }),
  publicStats: storyMap('Assistance & Impact Map', {
    headline: 'Assistance is reaching people — but coverage still tracks the hardest-hit provinces.',
    beats: [
      'People assisted concentrate where partners and shelters are scaled.',
      'Gaps remain visible in parts of the drought corridor.',
      'Province view connects statistics to place.',
    ],
  }),
  publicRecovery: storyMap(
    'Public Recovery Map',
    {
      headline: 'Recovery is underway — communities rebuilding with an eye on the next season.',
      beats: [
        'Eastern districts still carry the heaviest reconstruction load.',
        'Resilience actions (watersheds, drills, school plans) are spreading.',
        'Tap a province to see the public recovery story.',
      ],
    },
    recoveryProvinceColors,
  ),
  publicPreparedness: storyMap('Preparedness Priority Map', {
    headline: 'Preparedness advice is universal — urgency is highest where active alerts sit.',
    beats: [
      'Flood and storm provinces need go-bags and evacuation awareness now.',
      'Drought provinces should prioritise water storage and livestock care.',
      'Select your province for hazard-specific safety focus.',
    ],
  }),
  anticipatoryAction: storyMap(
    'Anticipatory Action Geography',
    {
      headline: 'AA portfolios are staged where forecasts say impact will arrive first.',
      beats: [
        'Drought AA ready in Chiredzi / Buhera; flood cash AA active in Chipinge.',
        'Financing and people-to-benefit figures track these same districts.',
        'Select a province to see the local AA story.',
      ],
    },
    anticipationProvinceColors,
  ),
  response: storyMap('Response Situation Map', {
    headline: 'Response operations concentrate where incidents and people in need overlap.',
    beats: [
      '23 active incidents span seven provinces — Manicaland and Mashonaland West lead.',
      'Assistance coverage still trails need in several southern districts.',
      'Tap a province to read the local response story.',
    ],
  }),
  emergency: storyMap('Situation Map (All Hazards)', {
    headline: 'EOC ops picture — severity, deployment and priority needs on one national canvas.',
    beats: [
      'Critical and major incidents drive the eastern and western flood theatres.',
      'Resource deployment and SITREP cycles track these same footprints.',
      'Select a province for the local operational story.',
    ],
  }),
  logistics: storyMap('Logistics & Deployment Map', {
    headline: 'Stock and convoys move toward the same provinces carrying the heaviest caseload.',
    beats: [
      'Available stock is strongest near staging hubs; gaps show in remote drought districts.',
      'On-the-move assets are feeding Manicaland and Mashonaland West first.',
      'Click a province for logistics posture.',
    ],
  }),
  searchRescue: storyMap('Search, Rescue & Recovery Map', {
    headline: 'SAR effort follows floodwater and collapsed access — not only population density.',
    beats: [
      'Ongoing operations cluster where riverine flooding stranded communities.',
      'Missing-person caseloads remain highest in the eastern response belt.',
      'Select a province for the local SAR story.',
    ],
  }),
  callCentre: storyMap('Call Centre Incident Map', {
    headline: 'Calls and reported incidents light up the same corridors as public alerts.',
    beats: [
      'Harare volume is high; severity spikes follow Mashonaland West flood reports.',
      'Resolution rates improve where provincial EOCs are fully staffed.',
      'Tap a province for the local contact story.',
    ],
  }),
  partners: storyMap(
    'Partners & Stakeholders Map',
    {
      headline: 'Partner presence is densest where coordination theatres are hottest.',
      beats: [
        'UN and NGO footprints concentrate in Harare and Manicaland.',
        'Private sector and development partners fill national and southern gaps.',
        'Select a province for the stakeholder story.',
      ],
    },
    coordinationProvinceColors,
  ),
  fiveW: storyMap(
    '5W Coverage Map',
    {
      headline: 'Who is doing what, where — and where coverage still thins.',
      beats: [
        'Intervention density tracks food, WASH and shelter clusters in the east.',
        'Matabeleland South still shows thinner 5W reporting.',
        'Tap a province to see the local 5W story.',
      ],
    },
    coordinationProvinceColors,
  ),
  drought: storyMap(
    'Drought Risk Map',
    {
      headline: 'Drought anticipation story — SPI falling, lead time still open in the south.',
      beats: [
        'Chiredzi, Buhera and Matabeleland corridors approach trigger thresholds.',
        'AA financing and water actions are pre-staged against this map.',
        'Select a province for local drought context.',
      ],
    },
    anticipationProvinceColors,
  ),
}
