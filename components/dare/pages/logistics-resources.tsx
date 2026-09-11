'use client'

import { Panel, Chip, Gauge, ProgressRow } from '@/components/dare/ui'
import {
  DashboardChrome,
  DataTable,
  DonutChart,
  MiniBars,
  Pipeline,
  QuickActions,
} from '@/components/dare/dashboard/kit'
import { SituationMap } from '@/components/dare/dashboard/situation-map'
import {
  incidentMarkers,
  logisticsKpis,
  logisticsProvinceColors,
  partners,
  riskColors,
} from '@/lib/concept-data'

export function LogisticsResourcesPage() {
  return (
    <DashboardChrome
      title="Logistics & Resources"
      subtitle="Right resources. Right place. Right time."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Response', href: '/response' },
        { label: 'Logistics & Resources' },
      ]}
      kpis={logisticsKpis}
    >
      <div className="grid gap-4 xl:grid-cols-[1.35fr_1fr]">
        <SituationMap
          title="Resource Availability Map"
          provinceColors={logisticsProvinceColors}
          markers={incidentMarkers}
          heightClassName="min-h-[20rem] h-[min(46vh,28rem)]"
          legend={[
            { color: '#16a34a', label: 'High 70–100%' },
            { color: '#e6a70a', label: 'Moderate 40–69%' },
            { color: '#ea580c', label: 'Low 10–39%' },
            { color: '#d64545', label: 'Critical 0–9%' },
          ]}
        />
        <Panel title="Resource Inventory Overview">
          <DataTable
            columns={['Category', 'Total', 'Deployed', 'Available', 'Utilisation']}
            rows={[
              ['Personnel', '842', '612', '230', <ProgressRow key="p" label="" pct={73} value="73%" />],
              ['Vehicles', '412', '286', '126', <ProgressRow key="v" label="" pct={69} value="69%" />],
              ['Medical Kits', '1,240', '860', '380', <ProgressRow key="m" label="" pct={69} value="69%" />],
              ['Shelter Items', '980', '540', '440', <ProgressRow key="s" label="" pct={55} value="55%" />],
              ['WASH Kits', '720', '410', '310', <ProgressRow key="w" label="" pct={57} value="57%" />],
              ['Food Rations', '1,560', '1,120', '440', <ProgressRow key="f" label="" pct={72} value="72%" />],
            ]}
          />
        </Panel>
      </div>

      <Panel title="Logistics Pipeline">
        <Pipeline
          steps={[
            { label: 'Requested', count: 156 },
            { label: 'Approved', count: 118 },
            { label: 'In Transit', count: 214, active: true },
            { label: 'At Staging', count: 87 },
            { label: 'Deployed', count: 1934 },
          ]}
        />
      </Panel>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Resource Requests Summary">
          <DonutChart
            centerValue="156"
            centerLabel="Requests"
            segments={[
              { label: 'Pending', value: 31, color: riskColors.active },
              { label: 'Approved', value: 24, color: riskColors.info },
              { label: 'In Transit', value: 26, color: riskColors.ok },
              { label: 'Delivered', value: 16, color: '#0f766e' },
              { label: 'Rejected', value: 3, color: riskColors.critical },
            ]}
          />
        </Panel>
        <Panel title="Staging Areas Status">
          <ul className="space-y-3">
            {[
              ['Mutare Hub', 82, 'Active'],
              ['Masvingo Hub', 74, 'Active'],
              ['Harare Central', 61, 'Active'],
              ['Bulawayo Depot', 38, 'Standby'],
              ['Hwange Node', 29, 'Standby'],
            ].map(([name, pct, status]) => (
              <li key={String(name)}>
                <div className="mb-1 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-foreground">{name}</span>
                  <Chip tone={status === 'Active' ? 'green' : 'gold'}>{String(status)}</Chip>
                </div>
                <ProgressRow label="Capacity" pct={Number(pct)} />
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Transport & Fuel Status">
          <div className="flex flex-wrap justify-around gap-4">
            <Gauge value={69} label="Active Vehicles %" color={riskColors.info} size={130} />
            <Gauge value={45} label="Fuel Available %" color={riskColors.active} size={130} />
          </div>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            286 / 412 vehicles · 83,470 L / 186,250 L fuel
          </p>
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title="Resource Deployment by District (Top 10)">
          <DataTable
            columns={['District', 'Requested', 'Deployed', 'Gap', 'Fulfilment']}
            rows={[
              ['Buhera', '186', '142', '44', <ProgressRow key="b" label="" pct={76} value="76%" />],
              ['Chipinge', '154', '121', '33', <ProgressRow key="c" label="" pct={79} value="79%" />],
              ['Chiredzi', '132', '98', '34', <ProgressRow key="ch" label="" pct={74} value="74%" />],
              ['Gutu', '110', '86', '24', <ProgressRow key="g" label="" pct={78} value="78%" />],
              ['Hwange', '96', '61', '35', <ProgressRow key="h" label="" pct={64} value="64%" />],
            ]}
          />
        </Panel>
        <Panel title="Resource Gap Analysis">
          <DataTable
            columns={['Item', 'Required', 'Available', 'Gap', 'Priority']}
            rows={[
              ['Shelter kits', '2,400', '1,560', '840', <Chip key="s" tone="danger">High</Chip>],
              ['Medical kits', '1,800', '1,240', '560', <Chip key="m" tone="gold">Medium</Chip>],
              ['Water bladders', '420', '280', '140', <Chip key="w" tone="danger">High</Chip>],
              ['Tarpaulins', '6,000', '4,850', '1,150', <Chip key="t" tone="gold">Medium</Chip>],
              ['Fuel (litres)', '120,000', '83,470', '36,530', <Chip key="f" tone="danger">High</Chip>],
            ]}
          />
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Recent Resource Movements">
          <DataTable
            columns={['When', 'Item', 'From → To', 'Qty', 'Status']}
            rows={[
              ['25 Aug 14:20', 'Water trucks', 'Harare → Buhera', '12', <Chip key="a" tone="info">In Transit</Chip>],
              ['25 Aug 12:05', 'Medical kits', 'Mutare Hub → Chipinge', '240', <Chip key="b" tone="green">Delivered</Chip>],
              ['25 Aug 10:40', 'Shelter NFIs', 'Masvingo → Chiredzi', '860', <Chip key="c" tone="info">In Transit</Chip>],
              ['24 Aug 18:15', 'Food rations', 'Harare → Gutu', '1,200', <Chip key="d" tone="green">Delivered</Chip>],
            ]}
          />
        </Panel>
        <Panel title="Key Partners Supporting Logistics">
          <MiniBars
            items={partners.slice(0, 6).map((p, i) => ({
              label: p,
              value: 90 - i * 10,
              suffix: `${12 - i} shipments`,
              color: i % 2 === 0 ? riskColors.ok : riskColors.info,
            }))}
          />
          <div className="mt-4">
            <QuickActions
              actions={[
                { label: 'Create Request' },
                { label: 'Dispatch Convoy' },
                { label: 'Emergency Ops', href: '/emergency-operations' },
              ]}
            />
          </div>
        </Panel>
      </div>
    </DashboardChrome>
  )
}
