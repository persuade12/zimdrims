'use client'

import { Panel, Chip, ProgressRow } from '@/components/dare/ui'
import {
  DashboardChrome,
  DataTable,
  DonutChart,
  FeedList,
  MiniBars,
  Pipeline,
  QuickActions,
} from '@/components/dare/dashboard/kit'
import { aaActions, anticipatoryKpis, riskColors } from '@/lib/concept-data'

export function AnticipatoryActionPage() {
  return (
    <DashboardChrome
      title="Anticipatory Action"
      subtitle="Act Early. Reduce Impact. Save Lives & Livelihoods."
      breadcrumbs={[
        { label: 'Home', href: '/ops' },
        { label: 'Anticipation' },
        { label: 'Anticipatory Action' },
      ]}
      kpis={anticipatoryKpis}
    >
      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Panel title="Active Anticipatory Actions">
          <DataTable
            columns={['Hazard', 'Action', 'Trigger', 'Target', 'People', 'Status', 'Progress']}
            rows={aaActions.map(([hazard, action, trigger, target, people, status, progress]) => [
              hazard,
              action,
              <Chip
                key={`${action}-t`}
                tone={trigger === 'Activated' ? 'danger' : trigger === 'Approaching' ? 'gold' : 'muted'}
              >
                {trigger}
              </Chip>,
              target,
              people,
              <Chip key={`${action}-s`} tone={status === 'Active' ? 'info' : status === 'Ready' ? 'green' : 'muted'}>
                {status}
              </Chip>,
              <div key={`${action}-p`} className="min-w-[5rem]">
                <ProgressRow label="" pct={Number(progress)} value={`${progress}%`} />
              </div>,
            ])}
          />
        </Panel>
        <div className="space-y-4">
          <Panel title="Actions by Status">
            <DonutChart
              centerValue="45"
              centerLabel="Actions"
              segments={[
                { label: 'Active', value: 7, color: riskColors.ok },
                { label: 'Ready', value: 18, color: riskColors.info },
                { label: 'Planned', value: 12, color: '#7c3aed' },
                { label: 'On Hold', value: 3, color: riskColors.critical },
                { label: 'Completed', value: 15, color: '#0f766e' },
              ]}
            />
          </Panel>
          <Panel title="Actions by Hazard">
            <MiniBars
              items={[
                { label: 'Drought', value: 14, color: riskColors.major },
                { label: 'Flood', value: 9, color: riskColors.info },
                { label: 'Cyclone', value: 7, color: '#7c3aed' },
                { label: 'Fire', value: 6, color: riskColors.active },
                { label: 'Disease', value: 5, color: riskColors.ok },
                { label: 'Other', value: 4, color: riskColors.muted },
              ]}
            />
          </Panel>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        <Panel title="Action Plan Summary" className="xl:col-span-2">
          <DataTable
            columns={['Hazard', 'Planned', 'Ready', 'Active', 'Done', 'People']}
            rows={[
              ['Drought', '8', '6', '2', '4', '312K'],
              ['Flood', '5', '4', '2', '3', '186K'],
              ['Cyclone', '4', '3', '1', '3', '98K'],
              ['Fire', '3', '3', '1', '2', '41K'],
              ['Disease', '3', '2', '1', '3', '219K'],
            ]}
          />
        </Panel>
        <Panel title="Actions by Location (Top Districts)">
          <DataTable
            columns={['District', 'Ready', 'Active', 'People']}
            rows={[
              ['Buhera', '4', '2', '62K'],
              ['Masvingo', '3', '1', '48K'],
              ['Chipinge', '3', '1', '44K'],
              ['Chiredzi', '2', '1', '39K'],
              ['Gutu', '2', '0', '28K'],
            ]}
          />
        </Panel>
        <Panel title="Resource Allocation">
          <DonutChart
            centerValue="78%"
            centerLabel="Allocated"
            segments={[
              { label: 'Relief Items', value: 28, color: riskColors.ok },
              { label: 'Cash', value: 22, color: riskColors.info },
              { label: 'Fuel & Transport', value: 18, color: riskColors.active },
              { label: 'Personnel', value: 16, color: '#7c3aed' },
              { label: 'Other', value: 16, color: riskColors.muted },
            ]}
          />
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Action Pipeline">
          <Pipeline
            steps={[
              { label: 'Ready for Activation', count: 18, active: true },
              { label: 'Awaiting Decision', count: 7 },
              { label: 'Financing Confirmed', count: 6 },
              { label: 'Active Implementation', count: 7 },
              { label: 'Completed', count: 15 },
            ]}
          />
          <div className="mt-4">
            <FeedList
              items={[
                { title: 'Activate water trucking in Buhera', meta: 'Due 26 Aug · DCP Operations', tone: 'alert' },
                { title: 'Release AA tranche — Masvingo', meta: 'Due 27 Aug · Finance', tone: 'new' },
                { title: 'SOP briefing — provincial EOCs', meta: 'Due 28 Aug · Training', tone: 'info' },
                { title: 'Fodder delivery confirmation', meta: 'Due 29 Aug · Logistics', tone: 'info' },
              ]}
            />
          </div>
        </Panel>
        <Panel title="Quick Actions">
          <QuickActions
            actions={[
              { label: 'Activate Action' },
              { label: 'Assign Resources' },
              { label: 'Release Funds' },
              { label: 'SOP Library', href: '/ops/digital-sops' },
              { label: 'Action Calendar' },
              { label: 'Drought Anticipation', href: '/ops/anticipation/drought' },
            ]}
          />
          <div className="mt-4 grid grid-cols-2 gap-2 text-center text-[11px]">
            {[
              ['Government', '12 Depts'],
              ['UN Agencies', '7'],
              ['NGOs', '24'],
              ['Communities', '350+'],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-border bg-secondary/50 px-2 py-3">
                <p className="font-display text-base font-extrabold text-foreground">{v}</p>
                <p className="text-muted-foreground">{k}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </DashboardChrome>
  )
}
