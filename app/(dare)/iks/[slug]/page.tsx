import { notFound } from 'next/navigation'
import { IksCategoryPage } from '@/components/dare/iks-pages'
import { iksCategories, type IksCategorySlug } from '@/lib/pages/iks'

export default async function IksCategoryRoutePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!(slug in iksCategories)) notFound()
  return <IksCategoryPage slug={slug as IksCategorySlug} />
}
