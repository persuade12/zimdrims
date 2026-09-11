'use client'

import { Panel, Chip } from '@/components/dare/ui'
import {
  DashboardChrome,
  DataTable,
  DonutChart,
  FeedList,
  MiniBars,
  QuickActions,
} from '@/components/dare/dashboard/kit'
import { SituationMap } from '@/components/dare/dashboard/situation-map'
import {
  fiveWKpis,
  fiveWProvinceColors,
  incidentMarkers,
  riskColors,
} from '@/lib/concept-data'

export function Coordination5WPage() {
  return (
    <DashboardChrome
      title="5W — Coordination"
      subtitle="Who does what, where, when and how."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Coordination' },
        { label: '5W' },
      ]}
      kpis={fiveWKpis}
      primaryAction="Export 5W Matrix"
    >
      <div className="grid gap-4 xl:grid-cols-[1.35fr_1fr]">
        <SituationMap
          title="5W Overview by Province"
          provinceColors={fiveWProvinceColors}
          markers={incidentMarkers.slice(0, 4)}
          heightClassName="min-h-[20rem] h-[min(46vh,28rem)]"
          legend={[
            { color: '#16a34a', label: 'On Track' },
            { color: '#e6a70a', label: 'At Risk' },
            { color: '#ea580c', label: 'Delayed' },
            { color: '#d64545', label: 'Critical' },
          ]}
        />
        <Panel title="5W Summary">
          <div className="grid gap-2">
            {[
              ['Who', '24 agencies · 42 partners'],
              ['What', '156 interventions · 8 sectors'],
              ['Where', '7 provinces · 23 districts'],
              ['When', '89 active · 67 planned'],
              ['How', '78% financial fulfilment'],
            ].map(([title, detail]) => (
              <div key={title} className="rounded-lg border border-border bg-secondary/40 px-3 py-2.5">
                <p className="text-[10px] font-bold uppercase tracking-wide text-primary">{title}</p>
                <p className="text-[12px] font-semibold text-foreground">{detail}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Agencies & Partners">
          <DataTable
            columns={['Organisation', 'Type', 'Focus', 'Status']}
            rows={[
              ['Department of Civil Protection', 'Government', 'Coordination', <Chip key="1" tone="green">Active</Chip>],
              ['WFP', 'UN', 'Food Security', <Chip key="2" tone="green">Active</Chip>],
              ['UNICEF', 'UN', 'WASH / Education', <Chip key="3" tone="green">Active</Chip>],
              ['Zimbabwe Red Cross', 'Movement', 'Shelter / First Aid', <Chip key="4" tone="green">Active</Chip>],
              ['World Vision', 'INGO', 'Protection', <Chip key="5" tone="info">Standby</Chip>],
              ['Ministry of Health', 'Government', 'Health', <Chip key="6" tone="green">Active</Chip>],
            ]}
          />
        </Panel>
        <div className="space-y-4">
          <Panel title="Interventions by Sector">
            <DonutChart
              centerValue="156"
              centerLabel="Total"
              segments={[
                { label: 'Food Security', value: 28, color: riskColors.ok },
                { label: 'Health', value: 22, color: riskColors.critical },
                { label: 'Shelter', value: 18, color: riskColors.info },
                { label: 'WASH', value: 16, color: '#0f766e' },
                { label: 'Protection', value: 12, color: '#7c3aed' },
                { label: 'Other', value: 14, color: riskColors.muted },
              ]}
            />
          </Panel>
          <Panel title="Resources Committed">
            <MiniBars
              items={[
                { label: 'Government', value: 34, suffix: '34%', color: riskColors.ok },
                { label: 'UN', value: 28, suffix: '28%', color: riskColors.info },
                { label: 'NGOs', value: 22, suffix: '22%', color: '#7c3aed' },
                { label: 'Private', value: 10, suffix: '10%', color: riskColors.active },
                { label: 'Other', value: 6, suffix: '6%', color: riskColors.muted },
              ]}
            />
          </Panel>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Panel title="5W Matrix">
          <DataTable
            columns={['Who', 'What', 'Where', 'When', 'Contact', 'Status']}
            rows={[
              ['DCP', 'EOC Coordination', 'National', 'Ongoing', '0242-700-000', <Chip key="a" tone="green">On Track</Chip>],
              ['WFP', 'Food distribution', 'Buhera', '25–30 Aug', '0772-111-222', <Chip key="b" tone="green">On Track</Chip>],
              ['UNICEF', 'Water trucking', 'Chipinge', '26 Aug', '0772-333-444', <Chip key="c" tone="gold">At Risk</Chip>],
              ['MoHCC', 'Cholera response', 'Harare South', 'Ongoing', '0242-555-666', <Chip key="d" tone="info">Active</Chip>],
              ['ZRCS', 'Shelter support', 'Masvingo', '27 Aug', '0772-777-888', <Chip key="e" tone="gold">Delayed</Chip>],
            ]}
          />
        </Panel>
        <Panel title="Geographic Distribution">
          <MiniBars
            items={[
              { label: 'Manicaland', value: 32, color: riskColors.ok },
              { label: 'Masvingo', value: 28, color: riskColors.active },
              { label: 'Harare', value: 22, color: riskColors.info },
              { label: 'Midlands', value: 18, color: riskColors.major },
              { label: 'Mash. East', value: 16, color: riskColors.ok },
              { label: 'Mash. West', value: 14, color: riskColors.watch },
            ]}
          />
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Key Decisions & Actions">
          <DataTable
            columns={['Decision', 'Date', 'Owner', 'Status']}
            rows={[
              ['Scale AA water trucking', '24 Aug', 'DCP', <Chip key="1" tone="green">Completed</Chip>],
              ['Release logistics tranche', '25 Aug', 'MoF', <Chip key="2" tone="info">In Progress</Chip>],
              ['Activate provincial EOCs', '25 Aug', 'DCP', <Chip key="3" tone="green">Completed</Chip>],
              ['Partner 5W refresh', '26 Aug', 'OCHA', <Chip key="4" tone="gold">Pending</Chip>],
            ]}
          />
        </Panel>
        <Panel title="Upcoming Meetings">
          <FeedList
            items={[
              { title: 'National Coordination Meeting', meta: '26 Aug · 09:00 · DCP HQ', tone: 'new' },
              { title: 'Food Security Cluster', meta: '26 Aug · 14:00 · WFP', tone: 'info' },
              { title: 'SADC Regional Brief', meta: '27 Aug · 11:00 · Virtual', tone: 'info' },
              { title: 'Provincial EOC Sync', meta: '28 Aug · 10:00 · Manicaland', tone: 'alert' },
            ]}
          />
          <div className="mt-3">
            <QuickActions
              actions={[
                { label: 'Partners', href: '/coordination/partners' },
                { label: 'Government Coord', href: '/government-coordination' },
              ]}
            />
          </div>
        </Panel>
      </div>
    </DashboardChrome>
  )
}
