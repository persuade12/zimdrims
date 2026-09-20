import { notFound } from 'next/navigation'
import {
  PublicAlertsPage,
  PublicIncidentReportPage,
  PublicPreparednessPage,
  PublicRecoveryPage,
  PublicReportsPage,
  PublicResourcesPage,
  PublicRiskMapPage,
  PublicSituationPage,
  PublicStatisticsPage,
} from '@/components/dare/pages/public-dashboard'

const pages: Record<string, () => React.ReactNode> = {
  alerts: () => <PublicAlertsPage />,
  'risk-map': () => <PublicRiskMapPage />,
  situation: () => <PublicSituationPage />,
  statistics: () => <PublicStatisticsPage />,
  recovery: () => <PublicRecoveryPage />,
  preparedness: () => <PublicPreparednessPage />,
  reports: () => <PublicReportsPage />,
  'report-incident': () => <PublicIncidentReportPage />,
  resources: () => <PublicResourcesPage />,
}

export default async function PublicSlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const key = slug?.join('/')
  if (key === 'ops' || key?.startsWith('ops/')) notFound()
  const Page = key ? pages[key] : null
  if (!Page) notFound()
  return Page()
}
