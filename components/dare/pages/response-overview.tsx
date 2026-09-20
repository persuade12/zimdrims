'use client'

import { Panel, Chip, ProgressRow } from '@/components/dare/ui'
import {
  DashboardChrome,
  DonutChart,
  FeedList,
  MiniBars,
  Pipeline,
  QuickActions,
} from '@/components/dare/dashboard/kit'
import { SituationMap } from '@/components/dare/dashboard/situation-map'
import { mapStories } from '@/lib/concept/map-stories'
import {
  immediateActions,
  incidentMarkers,
  priorityIncidents,
  resourceBars,
  responseKpis,
  responseProvinceColors,
  riskColors,
} from '@/lib/concept-data'

const toneMap = {
  Critical: 'danger',
  Major: 'gold',
  Active: 'info',
} as const

export function ResponseOverviewPage() {
  return (
    <DashboardChrome
      title="Response Overview"
      subtitle="Respond. Save Lives. Protect Livelihoods."
      breadcrumbs={[
        { label: 'Home', href: '/ops' },
        { label: 'Response' },
        { label: 'Overview' },
      ]}
      kpis={responseKpis}
      primaryAction="Export Overview"
    >
      <div className="grid gap-4 xl:grid-cols-[1.45fr_1fr]">
        <SituationMap
          title="Response Situation Map"
          provinceColors={responseProvinceColors}
          markers={incidentMarkers}
          heightClassName="min-h-[20rem] h-[min(48vh,28rem)]"
          legend={[
            { color: '#ffffff', label: 'No incident' },
            { color: '#fde047', label: 'Monitoring' },
            { color: '#ea580c', label: 'Active / Major' },
            { color: '#d64545', label: 'Critical' },
            { color: '#86efac', label: 'Resolved' },
          ]}
        
          story={mapStories.response.story}
          provinceStories={mapStories.response.provinceStories}
        />
        <div className="space-y-4">
          <Panel title="Response Pipeline">
            <Pipeline
              steps={[
                { label: 'Alert', count: 31 },
                { label: 'Activation', count: 23, active: true },
                { label: 'Assessment', count: 18 },
                { label: 'Deployment', count: 15 },
                { label: 'Operations', count: 12 },
                { label: 'Reporting', count: 9 },
              ]}
            />
          </Panel>
          <Panel title="Incidents by Status">
            <DonutChart
              centerValue="23"
              centerLabel="Incidents"
              segments={[
                { label: 'Critical', value: 4, color: riskColors.critical },
                { label: 'Major', value: 6, color: riskColors.major },
                { label: 'Active', value: 7, color: riskColors.active },
                { label: 'Monitoring', value: 4, color: riskColors.watch },
                { label: 'Resolved', value: 2, color: riskColors.ok },
              ]}
            />
          </Panel>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Highest Priority Incidents">
          <ul className="space-y-3">
            {priorityIncidents.map((item) => (
              <li key={item.title} className="flex items-start justify-between gap-2 border-b border-border/60 pb-2 last:border-0">
                <div>
                  <p className="text-[12px] font-semibold text-foreground">{item.title}</p>
                  <p className="text-[10px] text-muted-foreground">{item.meta}</p>
                </div>
                <Chip tone={toneMap[item.tone]}>{item.tone}</Chip>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Immediate Actions Required">
          <ul className="space-y-2">
            {immediateActions.map((a) => (
              <li key={a.label} className="flex items-center justify-between gap-2 text-[12px]">
                <span className="text-foreground">{a.label}</span>
                <span className="rounded-full bg-danger/15 px-2 py-0.5 text-[10px] font-bold text-danger">
                  {a.count}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Response Resources Overview">
          <div className="space-y-3">
            {resourceBars.map((r) => (
              <ProgressRow key={r.label} label={r.label} pct={r.value} color={r.color} />
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ['Flood', '8', '312K', '4 provinces'],
          ['Drought', '5', '421K', '6 provinces'],
          ['Cyclone', '3', '98K', '2 provinces'],
          ['Fire', '4', '41K', '3 provinces'],
          ['Disease', '3', '84K', '2 provinces'],
        ].map(([hazard, count, people, area]) => (
          <div key={hazard} className="rounded-xl border border-border bg-card p-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{hazard}</p>
            <p className="mt-1 font-display text-2xl font-extrabold text-foreground">{count}</p>
            <p className="text-[11px] text-muted-foreground">{people} affected</p>
            <p className="text-[10px] text-primary">{area}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Communications & Alerts">
          <FeedList
            items={[
              { title: 'EOC raised to Level 2 for Manicaland floods', meta: '15:40 CAT', tone: 'new' },
              { title: 'SITREP #14 circulated to partners', meta: '14:55 CAT', tone: 'info' },
              { title: 'Fuel convoy cleared for Masvingo staging', meta: '13:20 CAT', tone: 'info' },
              { title: 'Public SMS alert batch sent — Save Basin', meta: '12:05 CAT', tone: 'alert' },
            ]}
          />
        </Panel>
        <Panel title="Key Partners & Actors">
          <MiniBars
            items={[
              { label: 'Government', value: 18, suffix: '18 entities', color: riskColors.ok },
              { label: 'UN Agencies', value: 7, suffix: '7 agencies', color: riskColors.info },
              { label: 'NGOs / INGOs', value: 24, suffix: '24 orgs', color: '#7c3aed' },
              { label: 'Private Sector', value: 9, suffix: '9 firms', color: riskColors.active },
              { label: 'Community Groups', value: 48, suffix: '48 groups', color: riskColors.ok },
            ]}
          />
          <div className="mt-4">
            <QuickActions
              actions={[
                { label: 'Emergency Operations', href: '/ops/emergency-operations' },
                { label: 'Logistics', href: '/ops/logistics-resources' },
                { label: 'Search & Rescue', href: '/ops/search-rescue' },
                { label: 'Call Centre', href: '/ops/call-centre' },
              ]}
            />
          </div>
        </Panel>
      </div>
    </DashboardChrome>
  )
}
