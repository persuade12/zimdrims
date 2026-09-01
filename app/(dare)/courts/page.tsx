import { Donut } from '@/components/dare/donut'
import { Chip, LegendItem, Panel, ProgressRow } from '@/components/dare/ui'
import {
  FilterBar,
  KpiRow,
  PageHeader,
  SimpleTable,
} from '@/components/dare/page-primitives'
import { provinces } from '@/lib/dare-data'
import {
  appealOutcomes,
  caseCategories,
  casesByProvince,
  courtCaseColumns,
  courtCases,
  courtKpis,
  mediation,
} from '@/lib/pages/courts'

export default function CourtsPage() {
  const maxCases = Math.max(...casesByProvince.map((p) => p.cases))

  return (
    <>
      <PageHeader
        title="Traditional Courts Overview"
        subtitle="Case management and justice performance"
        meta="23 May 2025 · 11:30 AM"
      />
      <KpiRow items={courtKpis} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Panel title="Case categories">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Donut size={140} segments={caseCategories.map((c) => ({ value: c.value, color: c.color }))}>
              <span className="font-display text-lg font-extrabold">318k</span>
              <span className="text-[10px] text-muted-foreground">Total cases</span>
            </Donut>
            <div className="w-full space-y-1.5">
              {caseCategories.map((c) => (
                <LegendItem key={c.label} color={c.color} label={c.label} value={`${c.value}%`} />
              ))}
            </div>
          </div>
        </Panel>
        <Panel title="Appeal outcomes">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Donut size={140} segments={appealOutcomes.map((c) => ({ value: c.value, color: c.color }))}>
              <span className="font-display text-lg font-extrabold">4,126</span>
              <span className="text-[10px] text-muted-foreground">Appeals</span>
            </Donut>
            <div className="w-full space-y-1.5">
              {appealOutcomes.map((c) => (
                <LegendItem key={c.label} color={c.color} label={c.label} value={`${c.value}%`} />
              ))}
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Panel title="Cases by province" className="lg:col-span-2">
          <div className="space-y-2">
            {casesByProvince.map((p) => (
              <ProgressRow
                key={p.province}
                label={p.province}
                pct={Math.round((p.cases / maxCases) * 100)}
                value={p.cases.toLocaleString()}
                valueClassName="w-16"
              />
            ))}
          </div>
        </Panel>
        <Panel title="Mediation performance">
          <div className="space-y-3">
            <p className="font-display text-3xl font-extrabold">{mediation.cases}</p>
            <p className="text-xs text-muted-foreground">Mediation cases</p>
            <div className="flex items-center justify-between">
              <span className="text-sm">Successful</span>
              <Chip tone="green">
                {mediation.successful} · {mediation.successfulPct}
              </Chip>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Unsuccessful</span>
              <Chip tone="danger">
                {mediation.unsuccessful} · {mediation.unsuccessfulPct}
              </Chip>
            </div>
          </div>
        </Panel>
      </div>

      <FilterBar
        fields={[
          { id: 'id', label: 'Case ID', placeholder: 'Search cases' },
          {
            id: 'category',
            label: 'Category',
            type: 'select',
            options: caseCategories.map((c) => c.label),
          },
          { id: 'province', label: 'Province', type: 'select', options: provinces },
          { id: 'status', label: 'Status', type: 'select', options: ['Pending', 'In Mediation', 'Closed', 'Appeal'] },
        ]}
      />
      <SimpleTable columns={courtCaseColumns} rows={courtCases} caption="Recent cases" />
    </>
  )
}
