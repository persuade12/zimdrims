import { notFound } from 'next/navigation'
import { ModulePage } from '@/components/dare/module-page'
import { resolveModuleSlug } from '@/lib/pages/modules'

export default async function ModuleRoutePage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const moduleSlug = resolveModuleSlug(slug)
  if (!moduleSlug) notFound()
  return <ModulePage slug={moduleSlug} />
}
