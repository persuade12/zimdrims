import { Panel } from '@/components/dare/ui'
import {
  FilterBar,
  InsightList,
  KpiRow,
  PageHeader,
  SimpleTable,
} from '@/components/dare/page-primitives'
import { modulePages } from '@/lib/pages/modules'

export function ModulePage({ slug }: { slug: keyof typeof modulePages }) {
  const page = modulePages[slug]
  return (
    <>
      <PageHeader title={page.title} subtitle={page.subtitle} meta="25 Aug 2026 · Dummy dataset · DCP" />
      <KpiRow items={page.kpis} />
      <FilterBar fields={page.filters} />
      <SimpleTable columns={page.columns} rows={page.rows} caption={`${page.title} register`} />
      {page.notes?.length ? (
        <Panel title="Notes">
          <InsightList items={page.notes} />
        </Panel>
      ) : null}
    </>
  )
}
