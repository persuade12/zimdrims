import { Donut } from '@/components/dare/donut'
import { LegendItem, Panel, ProgressRow } from '@/components/dare/ui'
import {
  FilterBar,
  KpiRow,
  PageHeader,
  SimpleTable,
} from '@/components/dare/page-primitives'
import { provinces } from '@/lib/dare-data'
import {
  ageDistribution,
  genderDistribution,
  leaderColumns,
  leaderKpis,
  leaderRegister,
  leaderRows,
  leadersByProvince,
} from '@/lib/pages/leaders'

export default function LeadersPage() {
  const maxVillageHeads = Math.max(...leadersByProvince.map((p) => p.villageHeads))

  return (
    <>
      <PageHeader
        title="Traditional Leaders Registry"
        subtitle="National register of traditional leadership"
        meta="23 May 2025 · 10:30 AM"
      />
      <KpiRow items={leaderKpis} />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_1fr]">
        <Panel title="Distribution by Province">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-[10px] uppercase tracking-wide text-muted-foreground">
                  <th className="pb-2 font-bold">Province</th>
                  <th className="pb-2 font-bold">Chiefs</th>
                  <th className="pb-2 font-bold">Headmen</th>
                  <th className="pb-2 font-bold">Village Heads</th>
                  <th className="pb-2 font-bold">Vacancies</th>
                </tr>
              </thead>
              <tbody>
                {leadersByProvince.map((row) => (
                  <tr key={row.province} className="border-b border-border last:border-0">
                    <td className="py-2 font-medium">{row.province}</td>
                    <td className="py-2">{row.chiefs}</td>
                    <td className="py-2">{row.headmen}</td>
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted sm:w-28">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${(row.villageHeads / maxVillageHeads) * 100}%` }}
                          />
                        </div>
                        {row.villageHeads.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-2 text-danger">{row.vacancies}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-1">
          <Panel title="Gender Distribution">
            <div className="flex items-center gap-4">
              <Donut
                size={110}
                segments={genderDistribution.map((g) => ({ value: g.value, color: g.color }))}
              >
                <span className="font-display text-lg font-extrabold">35.9k</span>
                <span className="text-[10px] text-muted-foreground">Leaders</span>
              </Donut>
              <div className="space-y-2">
                {genderDistribution.map((g) => (
                  <LegendItem key={g.label} color={g.color} label={g.label} value={`${g.value}%`} />
                ))}
              </div>
            </div>
          </Panel>
          <Panel title="Age Distribution">
            <div className="space-y-2">
              {ageDistribution.map((a) => (
                <ProgressRow key={a.label} label={a.label} pct={a.pct} />
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <FilterBar
        fields={[
          { id: 'name', label: 'Name', placeholder: 'Search by name' },
          { id: 'role', label: 'Role', type: 'select', options: ['Chief', 'Headman', 'Village Head'] },
          { id: 'province', label: 'Province', type: 'select', options: provinces },
          { id: 'district', label: 'District', type: 'select', options: ['Makoni', 'Mutare', 'Gutu', 'Hwange'] },
          { id: 'status', label: 'Status', type: 'select', options: ['Active', 'Acting', 'Vacant'] },
        ]}
      />

      <SimpleTable
        caption="Search leaders"
        columns={leaderColumns}
        rows={leaderRows(leaderRegister)}
      />
    </>
  )
}
