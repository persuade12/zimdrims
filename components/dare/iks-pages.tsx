import Link from 'next/link'
import { Panel } from '@/components/dare/ui'
import {
  FilterBar,
  InsightList,
  KpiRow,
  PageHeader,
  SimpleTable,
} from '@/components/dare/page-primitives'
import { iksCategories, iksCategoryList, iksOverviewKpis, type IksCategorySlug } from '@/lib/pages/iks'

export function IksOverviewPage() {
  return (
    <>
      <PageHeader
        title="Indigenous Knowledge Systems (IKS)"
        subtitle="Documented local practices across environment, agriculture and cultural heritage."
        meta="Data year 2025 · Dummy dataset"
      />
      <KpiRow items={iksOverviewKpis} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {iksCategoryList.map((category) => (
          <Link
            key={category.slug}
            href={`/iks/${category.slug}`}
            className="rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary/50"
          >
            <span
              className="flex size-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${category.color}1a`, color: category.color }}
            >
              <category.icon className="size-5" />
            </span>
            <h2 className="mt-3 text-sm font-bold text-foreground">{category.label}</h2>
            <p className="mt-1 text-[12px] leading-snug text-muted-foreground">{category.subtitle}</p>
            <p className="mt-3 text-[11px] font-semibold text-primary">Open category →</p>
          </Link>
        ))}
      </div>

      <Panel title="Notes">
        <InsightList
          items={[
            'Use the sidebar dropdown under Indigenous Knowledge Systems (IKS) to jump directly to a subcategory.',
            'Sensitive entries remain role-restricted and linked to community consent metadata.',
          ]}
        />
      </Panel>
    </>
  )
}

export function IksCategoryPage({ slug }: { slug: IksCategorySlug }) {
  const page = iksCategories[slug]
  return (
    <>
      <PageHeader title={page.title} subtitle={page.subtitle} meta="Data year 2025 · Dummy dataset" />
      <KpiRow items={page.kpis} />
      <FilterBar fields={page.filters} />
      <SimpleTable columns={page.columns} rows={page.rows} caption={`${page.label} IKS register`} />
      {page.notes?.length ? (
        <Panel title="Notes">
          <InsightList items={page.notes} />
        </Panel>
      ) : null}
    </>
  )
}
