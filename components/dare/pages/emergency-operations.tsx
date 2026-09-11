'use client'

import { Panel, Chip, ProgressRow } from '@/components/dare/ui'
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
  emergencyKpis,
  immediateActions,
  incidentMarkers,
  responseProvinceColors,
  riskColors,
} from '@/lib/concept-data'

export function EmergencyOperationsPage() {
  return (
    <DashboardChrome
      title="Emergency Operations"
      subtitle="Coordinate. Respond. Save Lives."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Response', href: '/response' },
        { label: 'Emergency Operations' },
      ]}
      kpis={emergencyKpis}
      primaryAction="Generate SITREP"
    >
      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <SituationMap
          title="Situation Map (All Hazards)"
          provinceColors={responseProvinceColors}
          markers={incidentMarkers}
          heightClassName="min-h-[20rem] h-[min(46vh,28rem)]"
          legend={[
            { color: '#d64545', label: 'Critical' },
            { color: '#ea580c', label: 'Major' },
            { color: '#e6a70a', label: 'Active' },
            { color: '#fde047', label: 'Monitoring' },
          ]}
        />
        <div className="space-y-4">
          <Panel title="Incidents by Severity">
            <DonutChart
              centerValue="23"
              centerLabel="Total"
              segments={[
                { label: 'Critical', value: 4, color: riskColors.critical },
                { label: 'Major', value: 6, color: riskColors.major },
                { label: 'Active', value: 7, color: riskColors.active },
                { label: 'Monitoring', value: 6, color: riskColors.watch },
              ]}
            />
          </Panel>
          <Panel title="Operational Status">
            <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
              {[
                ['Incident Command', '6'],
                ['Field Operations', '14'],
                ['Search & Rescue', '8'],
                ['Evacuations', '5'],
                ['Medical Response', '9'],
                ['Assessments', '11'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-border bg-secondary/40 px-2 py-3">
                  <p className="font-display text-lg font-extrabold text-foreground">{value}</p>
                  <p className="text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Response Progress">
          <div className="space-y-3">
            {[
              ['Search & Rescue', 72],
              ['Logistics & Supply', 66],
              ['Shelter Management', 58],
              ['Health Response', 71],
              ['WASH', 64],
              ['Protection', 53],
            ].map(([label, pct]) => (
              <ProgressRow key={String(label)} label={String(label)} pct={Number(pct)} />
            ))}
          </div>
        </Panel>
        <Panel title="Immediate Priority Needs">
          <ul className="space-y-2">
            {immediateActions.map((a) => (
              <li key={a.label} className="flex items-center justify-between gap-2 text-[12px]">
                <span>{a.label}</span>
                <span className="rounded-full bg-danger/15 px-2 py-0.5 text-[10px] font-bold text-danger">
                  {a.count}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Panel title="Active Incidents">
          <DataTable
            columns={['Hazard', 'Location', 'Severity', 'Start', 'Affected', 'Status']}
            rows={[
              ['Flood', 'Buhera, Manicaland', <Chip key="1" tone="danger">Critical</Chip>, '22 Aug', '86,400', <Chip key="1s" tone="info">Active</Chip>],
              ['Drought', 'Chiredzi, Masvingo', <Chip key="2" tone="gold">Major</Chip>, '10 Aug', '124,000', <Chip key="2s" tone="info">Active</Chip>],
              ['Disease', 'Harare South', <Chip key="3" tone="gold">Major</Chip>, '18 Aug', '12,800', <Chip key="3s" tone="gold">Watch</Chip>],
              ['Fire', 'Hwange Rural', <Chip key="4" tone="info">Active</Chip>, '24 Aug', '3,200', <Chip key="4s" tone="green">Contained</Chip>],
              ['Flood', 'Chipinge', <Chip key="5" tone="gold">Major</Chip>, '23 Aug', '41,500', <Chip key="5s" tone="info">Active</Chip>],
            ]}
          />
        </Panel>
        <Panel title="Resource Deployment">
          <DonutChart
            centerValue="68%"
            centerLabel="Deployed"
            segments={[
              { label: 'Personnel', value: 30, color: riskColors.ok },
              { label: 'Vehicles', value: 22, color: riskColors.info },
              { label: 'Medical', value: 18, color: riskColors.major },
              { label: 'Shelter', value: 16, color: '#7c3aed' },
              { label: 'Other', value: 14, color: riskColors.muted },
            ]}
          />
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="SITREP Snapshot">
          <ul className="space-y-2 text-[12px] text-foreground">
            <li>• 2 new flood incidents opened in Manicaland (last 24h).</li>
            <li>• +18,400 people newly affected; caseload rising in Buhera.</li>
            <li>• Daily expenditure: USD 186K (fuel, water trucking, NFIs).</li>
            <li>• Air assets on standby at Harare and Mutare staging.</li>
          </ul>
        </Panel>
        <Panel title="Weather & Hazard Outlook">
          <MiniBars
            items={[
              { label: 'Flood watch — Save Basin', value: 90, suffix: 'High', color: riskColors.critical },
              { label: 'Drought — Masvingo South', value: 75, suffix: 'High', color: riskColors.major },
              { label: 'Severe storms — Midlands', value: 55, suffix: 'Moderate', color: riskColors.active },
              { label: 'Fire risk — Mat. North', value: 40, suffix: 'Moderate', color: riskColors.watch },
            ]}
          />
        </Panel>
        <Panel title="Communications">
          <FeedList
            items={[
              { title: 'National EOC briefing complete', meta: '15:30 CAT', tone: 'info' },
              { title: 'Partner telecom bridge opened', meta: '14:10 CAT', tone: 'new' },
              { title: 'Public advisory #7 published', meta: '12:45 CAT', tone: 'alert' },
            ]}
          />
          <div className="mt-3">
            <QuickActions
              actions={[
                { label: 'Response Overview', href: '/response' },
                { label: 'Incident Command', href: '/incident-command' },
              ]}
            />
          </div>
        </Panel>
      </div>
    </DashboardChrome>
  )
}
