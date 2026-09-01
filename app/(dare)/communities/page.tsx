import { Donut } from '@/components/dare/donut'
import { Chip, Gauge, LegendItem, Panel, ProgressRow } from '@/components/dare/ui'
import {
  GeoFilterBar,
  InsightList,
  KpiRow,
  PageHeader,
  SimpleTable,
} from '@/components/dare/page-primitives'
import {
  communityKpis,
  hazards,
  householdCategories,
  livelihoods,
  projectColumns,
  resilience,
  villageInsights,
  villageMeta,
  villageProjects,
  zimlacVillage,
  zimvacVillage,
} from '@/lib/pages/communities'

export default function CommunitiesPage() {
  return (
    <>
      <PageHeader
        title="Village Register & Community Intelligence"
        subtitle={`${villageMeta.name} · ${villageMeta.breadcrumb}`}
        meta={`${villageMeta.gps} · ${villageMeta.area}`}
      />
      <GeoFilterBar />
      <KpiRow items={communityKpis} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Panel title="Household overview">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Donut
              size={130}
              segments={householdCategories.map((c) => ({ value: c.value, color: c.color }))}
            >
              <span className="font-display text-lg font-extrabold">856</span>
              <span className="text-[10px] text-muted-foreground">HHs</span>
            </Donut>
            <div className="w-full space-y-1.5">
              {householdCategories.slice(0, 5).map((c) => (
                <LegendItem key={c.label} color={c.color} label={c.label} value={`${c.value}%`} />
              ))}
            </div>
          </div>
        </Panel>
        <Panel title="Village resilience">
          <div className="flex flex-col items-center gap-3">
            <Gauge value={79} label="Overall" />
            <div className="w-full space-y-2">
              {resilience.map((r) => (
                <ProgressRow
                  key={r.label}
                  label={r.label}
                  pct={r.pct}
                  color={r.pct < 55 ? 'var(--danger)' : r.pct < 75 ? 'var(--gold)' : 'var(--primary)'}
                />
              ))}
            </div>
          </div>
        </Panel>
        <Panel title="Hazard intelligence">
          <ul className="space-y-2">
            {hazards.map((h) => (
              <li key={h.label} className="flex items-center justify-between text-sm">
                <span>{h.label}</span>
                <Chip tone={h.tone}>{h.level}</Chip>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Panel title="Livelihoods">
          <div className="space-y-1.5">
            {livelihoods.map((l) => (
              <LegendItem key={l.label} color={l.color} label={l.label} value={`${l.value}%`} />
            ))}
          </div>
        </Panel>
        <Panel title="ZimVAC scorecard">
          <ul className="space-y-2 text-sm">
            {zimvacVillage.map((z) => (
              <li key={z.label} className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">{z.label}</span>
                <span className="font-semibold">
                  {z.value} · {z.status}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="ZimLAC governance">
          <div className="space-y-2">
            {zimlacVillage.map((z) => (
              <ProgressRow key={z.label} label={z.label} pct={z.pct} />
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
        <SimpleTable columns={projectColumns} rows={villageProjects} caption="Development projects" />
        <Panel title="AI village insights">
          <InsightList items={villageInsights} />
        </Panel>
      </div>
    </>
  )
}
