import {
  FilterBar,
  KpiRow,
  PageHeader,
  SimpleTable,
} from '@/components/dare/page-primitives'
import { provinces } from '@/lib/dare-data'
import {
  leaderColumns,
  leaderKpis,
  leaderRegister,
  leaderRows,
  type LeaderRole,
} from '@/lib/pages/leaders'

export function LeadersRolePage({
  role,
  title,
  subtitle,
}: {
  role: LeaderRole
  title: string
  subtitle: string
}) {
  const kpiLabels: Record<LeaderRole, string> = {
    Chief: 'Chiefs',
    Headman: 'Headmen',
    'Village Head': 'Village Heads',
  }
  const records = leaderRegister.filter((r) => r.role === role)
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} meta={`${records.length} records in dummy register`} />
      <KpiRow items={leaderKpis.filter((k) => k.label === kpiLabels[role] || k.label === 'Vacant Positions')} />
      <FilterBar
        fields={[
          { id: 'name', label: 'Name', placeholder: 'Search by name' },
          { id: 'province', label: 'Province', type: 'select', options: provinces },
          { id: 'status', label: 'Status', type: 'select', options: ['Active', 'Acting', 'Vacant'] },
        ]}
      />
      <SimpleTable columns={leaderColumns} rows={leaderRows(records)} caption={`${role} register`} />
    </>
  )
}
