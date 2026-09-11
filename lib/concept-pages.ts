import type { ComponentType } from 'react'
import { AnticipatoryActionPage } from '@/components/dare/pages/anticipatory-action'
import { CallCentrePage } from '@/components/dare/pages/call-centre'
import { Coordination5WPage } from '@/components/dare/pages/coordination-5w'
import { DroughtAnticipationPage } from '@/components/dare/pages/drought-anticipation'
import { EmergencyOperationsPage } from '@/components/dare/pages/emergency-operations'
import { LogisticsResourcesPage } from '@/components/dare/pages/logistics-resources'
import { PartnersStakeholdersPage } from '@/components/dare/pages/partners-stakeholders'
import { ResponseOverviewPage } from '@/components/dare/pages/response-overview'
import { SearchRescuePage } from '@/components/dare/pages/search-rescue'

export const conceptPages: Record<string, ComponentType> = {
  'anticipation/drought': DroughtAnticipationPage,
  'anticipatory-action': AnticipatoryActionPage,
  response: ResponseOverviewPage,
  'emergency-operations': EmergencyOperationsPage,
  'logistics-resources': LogisticsResourcesPage,
  'coordination/5w': Coordination5WPage,
  'coordination/partners': PartnersStakeholdersPage,
  'call-centre': CallCentrePage,
  'search-rescue': SearchRescuePage,
}

export function resolveConceptPage(slug: string[] | undefined) {
  if (!slug?.length) return null
  const key = slug.join('/')
  return conceptPages[key] ?? null
}
