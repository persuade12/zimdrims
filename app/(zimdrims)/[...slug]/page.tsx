import { notFound } from 'next/navigation'
import { ModulePage } from '@/components/dare/module-page'
import { resolveConceptPage } from '@/lib/concept-pages'
import { resolveModuleSlug } from '@/lib/pages/modules'

export default async function ModuleRoutePage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params

  const ConceptPage = resolveConceptPage(slug)
  if (ConceptPage) return <ConceptPage />

  const moduleSlug = resolveModuleSlug(slug)
  if (!moduleSlug) notFound()
  return <ModulePage slug={moduleSlug} />
}
