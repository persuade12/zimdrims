'use client'

import { notFound } from 'next/navigation'
import { ModulePage } from '@/components/dare/module-page'
import { resolveConceptPage } from '@/lib/concept-pages'
import { resolveModuleSlug } from '@/lib/pages/modules'

export function ConceptSlugPage({ slug }: { slug: string[] }) {
  const ConceptPage = resolveConceptPage(slug)
  if (ConceptPage) return <ConceptPage />

  const moduleSlug = resolveModuleSlug(slug)
  if (moduleSlug) return <ModulePage slug={moduleSlug} />

  notFound()
}
