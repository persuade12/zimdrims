import { ConceptSlugPage } from '@/components/dare/concept-slug-page'

export default async function OpsModuleRoutePage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  return <ConceptSlugPage slug={slug} />
}
