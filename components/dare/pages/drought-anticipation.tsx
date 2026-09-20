'use client'

import { Panel, Chip, ProgressRow } from '@/components/dare/ui'
import {
  DashboardChrome,
  DataTable,
  DonutChart,
  MiniBars,
  Pipeline,
  QuickActions,
} from '@/components/dare/dashboard/kit'
import { SituationMap } from '@/components/dare/dashboard/situation-map'
import { mapStories } from '@/lib/concept/map-stories'
import {
  droughtIndicators,
  droughtKpis,
  droughtProvinceColors,
  impactForecast,
  incidentMarkers,
  partners,
  riskColors,
} from '@/lib/concept-data'

export function DroughtAnticipationPage() {
  return (
    <DashboardChrome
      title="Hazard Anticipation — Drought"
      subtitle="Anticipate. Act Early. Save Lives."
      breadcrumbs={[
        { label: 'Home', href: '/ops' },
        { label: 'Anticipation', href: '/ops/anticipatory-action' },
        { label: 'Drought Anticipation' },
      ]}
      kpis={droughtKpis}
      primaryAction="Prepare Activation"
    >
      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <SituationMap
          title="Drought Risk Map (Next 3 Months)"
          provinceColors={droughtProvinceColors}
          markers={incidentMarkers.slice(0, 4)}
          legend={[
            { color: '#86efac', label: 'Very Low' },
            { color: '#e6a70a', label: 'Moderate' },
            { color: '#ea580c', label: 'High' },
            { color: '#d64545', label: 'Very High' },
          ]}
        
          story={mapStories.drought.story}
          provinceStories={mapStories.drought.provinceStories}
        />
        <Panel title="Drought Indicators (Current)">
          <DataTable
            columns={['Indicator', 'Value', 'Trend', 'Threshold', 'Status']}
            rows={droughtIndicators.map(([ind, val, trend, thr, status]) => [
              ind,
              val,
              <span key={ind} className={trend === '↓' ? 'text-danger' : 'text-primary'}>
                {trend}
              </span>,
              thr,
              <Chip
                key={`${ind}-s`}
                tone={status === 'High' || status === 'Approaching' ? 'danger' : status === 'Watch' ? 'gold' : 'green'}
              >
                {status}
              </Chip>,
            ])}
          />
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Drought Trigger Status">
          <Pipeline
            steps={[
              { label: 'Monitoring', count: 'Done' },
              { label: 'Watch', count: 'Passed' },
              { label: 'Approaching', count: 'Current', active: true },
              { label: 'Activation' },
              { label: 'Action' },
            ]}
          />
          <dl className="mt-4 grid grid-cols-2 gap-3 text-[12px]">
            <div>
              <dt className="text-muted-foreground">Trigger probability</dt>
              <dd className="font-display text-xl font-extrabold text-foreground">78%</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Estimated window</dt>
              <dd className="font-semibold text-foreground">15–30 Sep 2026</dd>
            </div>
          </dl>
          <button
            type="button"
            className="mt-4 w-full rounded-lg bg-[#ea580c] px-3 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            Prepare for Activation
          </button>
        </Panel>

        <Panel title="Impact Forecast (If No Action Taken)">
          <DataTable
            columns={['Metric', '1 Month', '2 Months', '3 Months']}
            rows={impactForecast}
          />
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Actions Ready for Activation" className="lg:col-span-2">
          <DataTable
            columns={['Type', 'Target Area', 'Beneficiaries', 'Status']}
            rows={[
              ['Water Trucking', 'Buhera', '42,000', <Chip key="a" tone="green">Ready</Chip>],
              ['Fodder Pre-positioning', 'Chiredzi', '18,500', <Chip key="b" tone="green">Ready</Chip>],
              ['Cash Assistance', 'Mwenezi', '25,000', <Chip key="c" tone="green">Ready</Chip>],
              ['Seed Distribution', 'Gutu', '31,200', <Chip key="d" tone="green">Ready</Chip>],
              ['Borehole Rehabilitation', 'Chipinge', '14,800', <Chip key="e" tone="gold">Standby</Chip>],
              ['Livestock Destocking Support', 'Beitbridge', '9,600', <Chip key="f" tone="green">Ready</Chip>],
            ]}
          />
        </Panel>

        <Panel title="Resource Readiness">
          <DonutChart
            centerValue="72%"
            centerLabel="Overall"
            segments={[
              { label: 'Water Trucks', value: 78, color: riskColors.ok },
              { label: 'Fuel', value: 70, color: riskColors.info },
              { label: 'Personnel', value: 80, color: '#7c3aed' },
              { label: 'Finance', value: 62, color: riskColors.active },
            ]}
          />
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Panel title="Anticipation Timeline">
          <Pipeline
            steps={[
              { label: 'Forecast Issued', count: '5 Aug' },
              { label: 'Watch Declared', count: '12 Aug' },
              { label: 'Trigger Approaching', count: '25 Aug', active: true },
              { label: 'Activation Window', count: 'Sep' },
              { label: 'Review & Learn', count: 'Jan 2027' },
            ]}
          />
        </Panel>
        <Panel title="Key Partners & Next Steps">
          <ul className="mb-4 flex flex-wrap gap-2">
            {partners.slice(0, 6).map((p) => (
              <li key={p}>
                <Chip tone="muted">{p}</Chip>
              </li>
            ))}
          </ul>
          <MiniBars
            items={[
              { label: 'Continue close monitoring', value: 100, suffix: 'Priority', color: riskColors.ok },
              { label: 'Pre-position resources', value: 80, suffix: 'In progress', color: riskColors.info },
              { label: 'Confirm financing drawdown', value: 55, suffix: 'Pending', color: riskColors.active },
              { label: 'Brief provincial EOCs', value: 40, suffix: 'Scheduled', color: riskColors.major },
            ]}
          />
          <div className="mt-4">
            <QuickActions
              actions={[
                { label: 'Open Trigger Monitor', href: '/ops/trigger-monitor' },
                { label: 'Anticipatory Action', href: '/ops/anticipatory-action' },
              ]}
            />
          </div>
        </Panel>
      </div>
    </DashboardChrome>
  )
}
