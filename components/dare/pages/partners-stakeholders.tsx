'use client'

import { Panel, Chip, Gauge } from '@/components/dare/ui'
import {
  DashboardChrome,
  DonutChart,
  FeedList,
  MiniBars,
  QuickActions,
} from '@/components/dare/dashboard/kit'
import { SituationMap } from '@/components/dare/dashboard/situation-map'
import {
  incidentMarkers,
  partnerProvinceColors,
  partnersKpis,
  riskColors,
} from '@/lib/concept-data'

const sectors = [
  ['WASH', 42, '#0f766e'],
  ['Health', 38, '#d64545'],
  ['Food Security', 51, '#16794a'],
  ['Shelter', 29, '#2563eb'],
  ['Education', 24, '#7c3aed'],
  ['Protection', 33, '#ea580c'],
  ['Logistics', 19, '#e6a70a'],
  ['Nutrition', 21, '#16a34a'],
] as const

export function PartnersStakeholdersPage() {
  return (
    <DashboardChrome
      title="Partners & Stakeholders"
      subtitle="Together for a Safer, More Resilient Zimbabwe."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Coordination' },
        { label: 'Partners & Stakeholders' },
      ]}
      kpis={partnersKpis}
      primaryAction="Invite Partner"
      filters={[
        { id: 'view', label: 'View', type: 'select', options: ['National', 'Provincial'], placeholder: 'National' },
        {
          id: 'sector',
          label: 'Sectors / Clusters',
          type: 'select',
          options: ['Food Security', 'Health', 'WASH', 'Shelter', 'Protection'],
          placeholder: 'All Sectors',
        },
        {
          id: 'type',
          label: 'Partner Type',
          type: 'select',
          options: ['UN', 'INGO', 'NGO', 'Government', 'Private Sector'],
          placeholder: 'All Types',
        },
        {
          id: 'location',
          label: 'Location',
          type: 'select',
          options: ['Harare', 'Manicaland', 'Masvingo', 'Midlands'],
          placeholder: 'All Locations',
        },
      ]}
    >
      <div className="grid gap-4 xl:grid-cols-3">
        <Panel title="Sector / UN Cluster Coverage">
          <DonutChart
            centerValue="15"
            centerLabel="Clusters"
            segments={[
              { label: 'Food Security', value: 13, color: riskColors.ok },
              { label: 'Health', value: 12, color: riskColors.critical },
              { label: 'WASH', value: 11, color: '#0f766e' },
              { label: 'Shelter', value: 10, color: riskColors.info },
              { label: 'Protection', value: 9, color: '#7c3aed' },
              { label: 'Other', value: 45, color: riskColors.muted },
            ]}
          />
        </Panel>
        <Panel title="Partners by Type">
          <MiniBars
            items={[
              { label: 'International NGOs', value: 64, color: riskColors.info },
              { label: 'National NGOs', value: 48, color: riskColors.ok },
              { label: 'Private Sector', value: 58, color: riskColors.active },
              { label: 'Development Partners', value: 47, color: '#7c3aed' },
              { label: 'Government', value: 28, color: riskColors.ok },
              { label: 'UN Agencies', value: 18, color: riskColors.critical },
            ]}
          />
        </Panel>
        <Panel title="Key Partners">
          <ul className="space-y-2">
            {[
              ['UNICEF', 'WASH', 'Harare'],
              ['WFP', 'Food Security', 'National'],
              ['WHO', 'Health', 'Harare'],
              ['FAO', 'Agriculture', 'National'],
              ['IOM', 'Displacement', 'Manicaland'],
              ['IFRC / ZRCS', 'Shelter', 'National'],
            ].map(([name, cluster, loc]) => (
              <li key={name} className="flex items-center justify-between gap-2 border-b border-border/60 pb-2 text-[12px] last:border-0">
                <div>
                  <p className="font-semibold text-foreground">{name}</p>
                  <p className="text-[10px] text-muted-foreground">{cluster}</p>
                </div>
                <Chip tone="muted">{loc}</Chip>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <SituationMap
          title="Geographic Distribution"
          provinceColors={partnerProvinceColors}
          markers={incidentMarkers.map((m, i) => ({
            ...m,
            value: [40, 26, 32, 22, 18][i] ?? 12,
            color: '#16794a',
          }))}
          heightClassName="min-h-[20rem] h-[min(46vh,28rem)]"
          legend={[
            { color: '#bbf7d0', label: 'Low density' },
            { color: '#4ade80', label: 'Medium' },
            { color: '#16794a', label: 'High density' },
          ]}
        />
        <Panel title="Sectors / UN Clusters">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-2">
            {sectors.map(([name, count, color]) => (
              <div key={name} className="rounded-xl border border-border p-3 text-center">
                <span
                  className="mx-auto mb-2 flex size-9 items-center justify-center rounded-lg text-[11px] font-bold text-white"
                  style={{ backgroundColor: color }}
                >
                  {count}
                </span>
                <p className="text-[11px] font-semibold text-foreground">{name}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Active Response Partners">
          <DonutChart
            centerValue="247"
            centerLabel="Partners"
            segments={[
              { label: 'On Site', value: 34, color: riskColors.ok },
              { label: 'Remote', value: 37, color: riskColors.info },
              { label: 'Standby', value: 12, color: riskColors.active },
              { label: 'Planned', value: 3, color: riskColors.muted },
            ]}
          />
        </Panel>
        <Panel title="Stakeholder Engagement">
          <div className="flex flex-wrap justify-around gap-2">
            <Gauge value={78} label="Engaged" size={110} color={riskColors.ok} />
            <Gauge value={14} label="Pending" size={110} color={riskColors.active} />
            <Gauge value={8} label="Inactive" size={110} color={riskColors.muted} />
          </div>
        </Panel>
        <Panel title="Recent Coordination Activities">
          <FeedList
            items={[
              { title: 'Sector coordination meeting — Health', meta: '25 Aug · Meeting', tone: 'new' },
              { title: 'NGO field assessment — Buhera', meta: '24 Aug · Assessment', tone: 'info' },
              { title: 'Partner SITREP shared', meta: '24 Aug · Update', tone: 'info' },
              { title: 'Private sector pledges confirmed', meta: '23 Aug · Update', tone: 'alert' },
            ]}
          />
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="National vs Sub-National">
          <p className="font-display text-3xl font-extrabold text-foreground">247</p>
          <p className="text-[12px] text-muted-foreground">Total partners nationwide</p>
          <div className="mt-3 space-y-2 text-[12px]">
            <div className="flex justify-between"><span>Manicaland</span><span className="font-semibold">32</span></div>
            <div className="flex justify-between"><span>Harare</span><span className="font-semibold">40</span></div>
            <div className="flex justify-between"><span>Masvingo</span><span className="font-semibold">28</span></div>
          </div>
        </Panel>
        <Panel title="5W Integration">
          <p className="text-[12px] text-muted-foreground">
            Link partner presence to Who / What / Where / When / How reporting for live coordination.
          </p>
          <div className="mt-4">
            <QuickActions actions={[{ label: 'Open 5W Matrix', href: '/coordination/5w' }]} />
          </div>
        </Panel>
        <Panel title="Quick Actions" className="bg-primary text-primary-foreground">
          <div className="grid gap-2 p-1">
            {['Invite Partner', 'Share Situation Report', 'Request Support', 'Export Directory'].map((label) => (
              <button
                key={label}
                type="button"
                className="rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-[11px] font-semibold hover:bg-white/15"
              >
                {label}
              </button>
            ))}
          </div>
        </Panel>
      </div>
    </DashboardChrome>
  )
}
