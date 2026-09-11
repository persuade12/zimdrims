'use client'

import { Panel, Chip, Gauge } from '@/components/dare/ui'
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
  callCentreKpis,
  callProvinceColors,
  riskColors,
} from '@/lib/concept-data'

export function CallCentrePage() {
  return (
    <DashboardChrome
      title="Call Centre"
      subtitle="Safer Communities. Stronger Together."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Response', href: '/response' },
        { label: 'Call Centre' },
      ]}
      kpis={callCentreKpis}
      primaryAction="Generate Call Report"
      filters={[
        { id: 'view', label: 'View', type: 'select', options: ['National', 'Provincial'], placeholder: 'National' },
        {
          id: 'timeframe',
          label: 'Timeframe',
          type: 'select',
          options: ['Last 24 Hours', 'Last 7 Days'],
          placeholder: 'Last 24 Hours',
        },
      ]}
      asOf="25 Aug 2026 · 15:48 CAT"
    >
      <div className="grid gap-4 xl:grid-cols-[1.2fr_1.2fr_1fr]">
        <Panel title="Call Volume Trend (24h)">
          <div className="flex h-40 items-end gap-1.5 px-1">
            {[40, 55, 48, 62, 70, 85, 78, 92, 88, 95, 80, 72, 68, 74, 90, 96, 84, 70, 58, 50].map((h, i) => (
              <div key={i} className="flex flex-1 flex-col justify-end gap-1">
                <div className="rounded-t bg-primary/80" style={{ height: `${h * 0.55}%` }} />
                <div className="rounded-t bg-info/70" style={{ height: `${h * 0.25}%` }} />
              </div>
            ))}
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">Green: incoming · Blue: outgoing · 00:00–20:00</p>
        </Panel>
        <SituationMap
          title="Calls by Province"
          provinceColors={callProvinceColors}
          markers={[
            { id: 'c1', position: [-17.83, 31.05], value: 210, color: '#d64545', label: 'Harare' },
            { id: 'c2', position: [-18.9, 32.6], value: 118, color: '#ea580c', label: 'Manicaland' },
            { id: 'c3', position: [-20.1, 30.8], value: 96, color: '#ea580c', label: 'Masvingo' },
            { id: 'c4', position: [-20.15, 28.58], value: 42, color: '#16a34a', label: 'Bulawayo' },
          ]}
          heightClassName="min-h-[16rem] h-[min(36vh,22rem)]"
          legend={[
            { color: '#86efac', label: '< 50' },
            { color: '#fde047', label: '51–100' },
            { color: '#ea580c', label: '101–150' },
            { color: '#d64545', label: '> 150' },
          ]}
        />
        <Panel title="Call Categories">
          <DonutChart
            centerValue="1,248"
            centerLabel="Calls"
            segments={[
              { label: 'Food Security', value: 24, color: riskColors.ok },
              { label: 'Health', value: 18, color: riskColors.critical },
              { label: 'WASH', value: 16, color: '#0f766e' },
              { label: 'Protection', value: 12, color: '#7c3aed' },
              { label: 'Shelter & NFI', value: 11, color: riskColors.info },
              { label: 'Education', value: 7, color: riskColors.active },
              { label: 'Logistics', value: 6, color: riskColors.major },
              { label: 'Other', value: 6, color: riskColors.muted },
            ]}
          />
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <Panel title="Live Call Feed">
          <FeedList
            items={[
              { title: '+263 77 212 4501 — Food assistance needed in Chiredzi', meta: '2 min ago', tone: 'new' },
              { title: '+263 71 884 2209 — Flooded homestead, Buhera', meta: '6 min ago', tone: 'alert' },
              { title: '+263 78 441 9033 — Medical referral request, Mutare', meta: '11 min ago', tone: 'info' },
              { title: '+263 77 100 5566 — Shelter inquiry, Chipinge', meta: '18 min ago', tone: 'info' },
              { title: '+263 73 667 8812 — Missing person report, Murehwa', meta: '24 min ago', tone: 'alert' },
            ]}
          />
        </Panel>
        <Panel title="Recent Incidents Reported">
          <DataTable
            columns={['ID', 'Incident', 'Province', 'Severity', 'Time']}
            rows={[
              ['INC-0012', 'Flooded homes', 'Manicaland', <Chip key="a" tone="danger">High</Chip>, '15:42'],
              ['INC-0011', 'Food shortage', 'Masvingo', <Chip key="b" tone="gold">Medium</Chip>, '15:28'],
              ['INC-0010', 'Cholera suspect', 'Harare', <Chip key="c" tone="danger">High</Chip>, '15:05'],
              ['INC-0009', 'Road blocked', 'Midlands', <Chip key="d" tone="info">Low</Chip>, '14:51'],
              ['INC-0008', 'Fire outbreak', 'Mat. North', <Chip key="e" tone="gold">Medium</Chip>, '14:20'],
            ]}
          />
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Call Volume by Sector">
          <MiniBars
            items={[
              { label: 'Food Security', value: 24, suffix: '24%', color: riskColors.ok },
              { label: 'Health', value: 18, suffix: '18%', color: riskColors.critical },
              { label: 'WASH', value: 16, suffix: '16%', color: '#0f766e' },
              { label: 'Protection', value: 12, suffix: '12%', color: '#7c3aed' },
              { label: 'Shelter', value: 11, suffix: '11%', color: riskColors.info },
            ]}
          />
        </Panel>
        <Panel title="Top Reported Issues">
          <MiniBars
            items={[
              { label: 'Food shortages', value: 412, color: riskColors.ok },
              { label: 'Flooding', value: 276, color: riskColors.info },
              { label: 'Health concerns', value: 198, color: riskColors.critical },
              { label: 'Shelter needs', value: 154, color: '#7c3aed' },
              { label: 'Missing persons', value: 88, color: riskColors.major },
            ]}
          />
        </Panel>
        <Panel title="Service Levels">
          <div className="grid grid-cols-2 gap-3">
            <Gauge value={92} label="<30s Answered" size={110} />
            <Gauge value={88} label="1st Contact Resolve" size={110} color={riskColors.info} />
            <Gauge value={6} label="Abandoned" size={110} color={riskColors.critical} />
            <Gauge value={4} label="Transferred" size={110} color={riskColors.active} />
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr_0.9fr]">
        <Panel title="Call Outcomes">
          <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
            {[
              ['Provided Info', '486'],
              ['Referred', '312'],
              ['Incident Logged', '312'],
              ['Follow-up', '138'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-border bg-secondary/40 px-2 py-3">
                <p className="font-display text-xl font-extrabold text-foreground">{value}</p>
                <p className="text-[10px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Call Centre Agents">
          <DataTable
            columns={['Agent', 'Status', 'Handled']}
            rows={[
              ['T. Ncube', <Chip key="1" tone="green">Available</Chip>, '86'],
              ['R. Moyo', <Chip key="2" tone="info">On Call</Chip>, '74'],
              ['S. Dube', <Chip key="3" tone="gold">Break</Chip>, '61'],
              ['A. Chikafu', <Chip key="4" tone="green">Available</Chip>, '92'],
            ]}
          />
        </Panel>
        <Panel title="Quick Actions">
          <QuickActions
            actions={[
              { label: 'Log New Incident' },
              { label: 'Search Caller Records' },
              { label: 'Manage Call Queues' },
              { label: 'Search & Rescue', href: '/search-rescue' },
            ]}
          />
        </Panel>
      </div>
    </DashboardChrome>
  )
}
