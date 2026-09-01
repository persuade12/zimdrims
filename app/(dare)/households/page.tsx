import { Donut } from '@/components/dare/donut'
import { Chip, LegendItem, Panel } from '@/components/dare/ui'
import {
  FilterBar,
  GeoFilterBar,
  KpiRow,
  PageHeader,
  SimpleTable,
} from '@/components/dare/page-primitives'
import {
  householdColumns,
  householdKpis,
  householdRows,
  selectedHousehold,
  vulnerabilityBars,
} from '@/lib/pages/households'

export default function HouseholdsPage() {
  return (
    <>
      <PageHeader
        title="Household Register & Profile"
        subtitle="Chitora Village household intelligence"
        meta="Data year 2025"
      />
      <GeoFilterBar />
      <KpiRow items={householdKpis} />

      <FilterBar
        fields={[
          { id: 'q', label: 'Search', placeholder: 'Name or household ID' },
          { id: 'vulnerability', label: 'Vulnerability', type: 'select', options: ['Low', 'Medium', 'High'] },
          { id: 'livelihood', label: 'Livelihood', type: 'select', options: ['Crop Farming', 'Livestock Rearing', 'Informal Business', 'Remittances'] },
          { id: 'protection', label: 'Social protection', type: 'select', options: ['BEAM', 'HCT', 'Food Aid'] },
          { id: 'zimvac', label: 'ZimVAC', type: 'select', options: ['Acceptable', 'Moderate', 'Poor'] },
        ]}
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.6fr_1fr]">
        <SimpleTable columns={householdColumns} rows={householdRows} caption="Household register" />
        <Panel title="Households by vulnerability">
          <div className="mb-4 flex justify-center">
            <Donut
              size={130}
              segments={vulnerabilityBars.map((v) => ({ value: v.count, color: v.color }))}
            >
              <span className="font-display text-lg font-extrabold">856</span>
              <span className="text-[10px] text-muted-foreground">Households</span>
            </Donut>
          </div>
          <div className="space-y-2">
            {vulnerabilityBars.map((v) => (
              <LegendItem key={v.label} color={v.color} label={`${v.label} · ${v.count}`} value={`${v.pct}%`} />
            ))}
          </div>
        </Panel>
      </div>

      <Panel title={`Selected household · ${selectedHousehold.name} (${selectedHousehold.id})`}>
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <span>{selectedHousehold.age} yrs · {selectedHousehold.gender}</span>
          <span className="text-muted-foreground">{selectedHousehold.phone}</span>
          <Chip tone="danger">{selectedHousehold.vulnerability}</Chip>
          <Chip tone="gold">{selectedHousehold.zimvac}</Chip>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Composition</p>
            {selectedHousehold.members.map((m) => (
              <LegendItem key={m.label} color={m.color} label={m.label} value={`${m.value}`} />
            ))}
          </div>
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Livelihoods</p>
            {selectedHousehold.livelihoods.map((m) => (
              <LegendItem key={m.label} color={m.color} label={m.label} value={`${m.value}%`} />
            ))}
          </div>
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Social protection</p>
            <ul className="space-y-1 text-sm">
              {selectedHousehold.protection.map((p) => (
                <li key={p.label} className="flex justify-between">
                  {p.label}
                  <Chip tone={p.on ? 'green' : 'muted'}>{p.on ? 'Yes' : 'No'}</Chip>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">ZimVAC</p>
            <ul className="space-y-1 text-sm">
              {selectedHousehold.zimvacIndicators.map((z) => (
                <li key={z.code} className="flex justify-between">
                  <span>{z.code}</span>
                  <span className="font-semibold">{z.value} · {z.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Panel>
    </>
  )
}
