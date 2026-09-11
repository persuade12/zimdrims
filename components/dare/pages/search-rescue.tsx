'use client'

import { Panel, Chip, Gauge } from '@/components/dare/ui'
import {
  DashboardChrome,
  DataTable,
  FeedList,
  MiniBars,
  QuickActions,
} from '@/components/dare/dashboard/kit'
import { SituationMap } from '@/components/dare/dashboard/situation-map'
import {
  responseProvinceColors,
  riskColors,
  searchRescueKpis,
} from '@/lib/concept-data'

export function SearchRescuePage() {
  return (
    <DashboardChrome
      title="Search, Rescue & Recovery"
      subtitle="Find. Rescue. Recover. Restore Dignity."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Response', href: '/response' },
        { label: 'Search, Rescue & Recovery' },
      ]}
      kpis={searchRescueKpis}
      primaryAction="Deploy Rescue Team"
    >
      <div className="grid gap-4 xl:grid-cols-[1.45fr_1fr]">
        <SituationMap
          title="Incidents & Search Areas"
          provinceColors={responseProvinceColors}
          markers={[
            { id: 's1', position: [-17.65, 31.6], value: '!', color: '#d64545', label: 'Murehwa' },
            { id: 's2', position: [-19.3, 32.5], value: '4', color: '#ea580c', label: 'Buhera' },
            { id: 's3', position: [-20.1, 30.8], value: '2', color: '#2563eb', label: 'Masvingo' },
            { id: 's4', position: [-18.9, 29.8], value: '3', color: '#16a34a', label: 'Midlands' },
          ]}
          heightClassName="min-h-[20rem] h-[min(48vh,28rem)]"
          legend={[
            { color: '#d64545', label: 'Search & Rescue' },
            { color: '#ea580c', label: 'Missing Persons' },
            { color: '#2563eb', label: 'Rescue Completed' },
            { color: '#16a34a', label: 'Recovery Operation' },
          ]}
        />
        <div className="space-y-4">
          <Panel title="Featured Incident — Flood Rescue Murehwa">
            <div className="rounded-xl bg-gradient-to-br from-primary/15 via-card to-info/10 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-primary">Priority Operation</p>
              <h4 className="mt-1 font-display text-lg font-bold text-foreground">Flood rescue — Murehwa</h4>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="rounded-lg bg-card/80 p-2">
                  <p className="font-display text-lg font-extrabold text-primary">182</p>
                  <p className="text-muted-foreground">Rescued</p>
                </div>
                <div className="rounded-lg bg-card/80 p-2">
                  <p className="font-display text-lg font-extrabold text-danger">34</p>
                  <p className="text-muted-foreground">Missing</p>
                </div>
                <div className="rounded-lg bg-card/80 p-2">
                  <p className="font-display text-lg font-extrabold text-gold-foreground">12</p>
                  <p className="text-muted-foreground">Deceased</p>
                </div>
              </div>
              <button
                type="button"
                className="mt-3 w-full rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
              >
                View Details
              </button>
            </div>
          </Panel>
          <Panel title="Resource Deployment">
            <div className="grid grid-cols-2 gap-2 text-center text-[11px] sm:grid-cols-5 xl:grid-cols-2">
              {[
                ['Rescue Teams', '24'],
                ['Helicopters', '3'],
                ['Boats', '8'],
                ['Vehicles', '42'],
                ['Drones', '5'],
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
        <Panel title="Active Search & Rescue Operations">
          <DataTable
            columns={['Incident', 'Location', 'Status']}
            rows={[
              ['River flash flood', 'Murehwa', <Chip key="1" tone="info">Ongoing</Chip>],
              ['Collapsed dwelling', 'Buhera', <Chip key="2" tone="gold">In Progress</Chip>],
              ['Missing fisherfolk', 'Kariba', <Chip key="3" tone="danger">Ongoing</Chip>],
              ['Landslide search', 'Chimanimani', <Chip key="4" tone="muted">Planned</Chip>],
            ]}
          />
        </Panel>
        <Panel title="Recent Rescue Operations">
          <DataTable
            columns={['When', 'Location', 'Type', 'People', 'Status']}
            rows={[
              ['25 Aug 13:40', 'Chipinge', 'Flood Rescue', '46', <Chip key="a" tone="green">Completed</Chip>],
              ['25 Aug 11:15', 'Gutu', 'Vehicle Rescue', '8', <Chip key="b" tone="green">Completed</Chip>],
              ['24 Aug 22:05', 'Hwange', 'Fire Evacuation', '31', <Chip key="c" tone="info">Ongoing</Chip>],
              ['24 Aug 16:20', 'Masvingo', 'Flood Rescue', '22', <Chip key="d" tone="green">Completed</Chip>],
            ]}
          />
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Missing Persons">
          <DataTable
            columns={['Name', 'Last Seen', 'Status']}
            rows={[
              ['T. Mutasa', '24 Aug', <Chip key="1" tone="danger">Missing</Chip>],
              ['L. Sibanda', '23 Aug', <Chip key="2" tone="danger">Missing</Chip>],
              ['P. Chirwa', '23 Aug', <Chip key="3" tone="green">Found</Chip>],
              ['A. Ndlovu', '22 Aug', <Chip key="4" tone="danger">Missing</Chip>],
            ]}
          />
        </Panel>
        <Panel title="Recovery Progress">
          <div className="grid grid-cols-2 gap-3">
            <Gauge value={78} label="Search & Rescue" size={120} />
            <Gauge value={62} label="Medical Support" size={120} color={riskColors.info} />
            <Gauge value={45} label="Shelter Support" size={120} color={riskColors.active} />
            <Gauge value={31} label="Infrastructure" size={120} color={riskColors.major} />
          </div>
        </Panel>
        <Panel title="Operations by Province">
          <MiniBars
            items={[
              { label: 'Manicaland', value: 18, color: riskColors.ok },
              { label: 'Mash. East', value: 14, color: riskColors.info },
              { label: 'Masvingo', value: 11, color: riskColors.active },
              { label: 'Midlands', value: 8, color: riskColors.major },
              { label: 'Mat. North', value: 5, color: riskColors.critical },
            ]}
          />
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Field Updates">
          <FeedList
            items={[
              { title: 'Boat team reached isolated ward 7 — Murehwa', meta: '15:20 CAT', tone: 'new' },
              { title: 'Drone grid search completed — Buhera north', meta: '14:35 CAT', tone: 'info' },
              { title: 'Air medevac requested for critical patient', meta: '13:50 CAT', tone: 'alert' },
              { title: 'Recovery site established at ward clinic', meta: '12:10 CAT', tone: 'info' },
            ]}
          />
        </Panel>
        <Panel title="Quick Actions">
          <QuickActions
            actions={[
              { label: 'Deploy Rescue Team' },
              { label: 'Log New Incident' },
              { label: 'Request Air Support' },
              { label: 'Update Missing Persons' },
              { label: 'Emergency Operations', href: '/emergency-operations' },
              { label: 'Call Centre', href: '/call-centre' },
            ]}
          />
        </Panel>
      </div>
    </DashboardChrome>
  )
}
