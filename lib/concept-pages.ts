'use client'

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
import { createRichModulePage } from '@/components/dare/pages/rich-module'
import {
  analyticsConfig,
  anticipationOverviewConfig,
  anticipatoryFinancingConfig,
  buildBackBetterConfig,
  coordinationOverviewConfig,
  damageLossConfig,
  dataSourcesConfig,
  digitalSopsConfig,
  earlyWarningOverviewConfig,
  governmentCoordinationConfig,
  hazardAnticipationConfig,
  hazardEarlyWarningConfig,
  iksConfig,
  impactIntelligenceConfig,
  incidentCommandConfig,
  knowledgeOverviewConfig,
  knowledgeRepositoryConfig,
  lessonsLearnedConfig,
  nationalCopConfig,
  needsAssessmentConfig,
  recoveryOverviewConfig,
  recoveryProgressConfig,
  reportsConfig,
  resilienceConfig,
  riskExplorerConfig,
  riskIntelligenceConfig,
  riskMapConfig,
  sadcCoordinationConfig,
  sheltersEvacuationConfig,
  systemAdminConfig,
  triggerMonitorConfig,
  usersRolesConfig,
} from '@/lib/concept/rich-modules'

const hazardEwPages = {
  'early-warning/all-hazards': createRichModulePage(
    hazardEarlyWarningConfig('all-hazards', 'All Hazards', 'All Hazards', 14, '312,450'),
  ),
  'early-warning/weather': createRichModulePage(
    hazardEarlyWarningConfig('weather', 'Weather', 'Severe Weather', 3, '186,000'),
  ),
  'early-warning/cyclone': createRichModulePage(
    hazardEarlyWarningConfig('cyclone', 'Cyclone', 'Cyclone', 1, '94,000'),
  ),
  'early-warning/flood': createRichModulePage(
    hazardEarlyWarningConfig('flood', 'Flood', 'Flood', 4, '148,200'),
  ),
  'early-warning/drought': createRichModulePage(
    hazardEarlyWarningConfig('drought', 'Drought', 'Drought', 2, '421,000'),
  ),
  'early-warning/fire': createRichModulePage(
    hazardEarlyWarningConfig('fire', 'Fire', 'Wildfire', 2, '28,600'),
  ),
  'early-warning/health': createRichModulePage(
    hazardEarlyWarningConfig('health', 'Health', 'Health', 2, '18,400'),
  ),
  'early-warning/mining': createRichModulePage(
    hazardEarlyWarningConfig('mining', 'Mining', 'Mining', 1, '6,200'),
  ),
  'early-warning/road-traffic': createRichModulePage(
    hazardEarlyWarningConfig('road-traffic', 'Road Traffic', 'Road Traffic', 2, '4,800'),
  ),
  'early-warning/hydrology': createRichModulePage(
    hazardEarlyWarningConfig('hydrology', 'Hydrology', 'Hydrology', 3, '112,000'),
  ),
}

const hazardAnticipationPages = {
  'anticipation/flood': createRichModulePage(hazardAnticipationConfig('flood', 'Flood', 'Flood')),
  'anticipation/cyclone': createRichModulePage(hazardAnticipationConfig('cyclone', 'Cyclone', 'Cyclone')),
  'anticipation/fire': createRichModulePage(hazardAnticipationConfig('fire', 'Fire', 'Fire')),
  'anticipation/disease': createRichModulePage(hazardAnticipationConfig('disease', 'Disease', 'Disease')),
  'anticipation/landslide': createRichModulePage(
    hazardAnticipationConfig('landslide', 'Landslide', 'Landslide'),
  ),
}

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

  'national-cop': createRichModulePage(nationalCopConfig),
  'early-warning': createRichModulePage(earlyWarningOverviewConfig),
  ...hazardEwPages,
  'risk-intelligence': createRichModulePage(riskIntelligenceConfig),
  'risk-intelligence/risk-map': createRichModulePage(riskMapConfig),
  'risk-intelligence/risk-explorer': createRichModulePage(riskExplorerConfig),
  'risk-intelligence/risk-dashboard': createRichModulePage(riskIntelligenceConfig),
  'impact-intelligence': createRichModulePage(impactIntelligenceConfig),
  'needs-assessment': createRichModulePage(needsAssessmentConfig),

  anticipation: createRichModulePage(anticipationOverviewConfig),
  'trigger-monitor': createRichModulePage(triggerMonitorConfig),
  'anticipatory-financing': createRichModulePage(anticipatoryFinancingConfig),
  ...hazardAnticipationPages,

  'incident-command': createRichModulePage(incidentCommandConfig),
  'shelters-evacuation': createRichModulePage(sheltersEvacuationConfig),

  coordination: createRichModulePage(coordinationOverviewConfig),
  'government-coordination': createRichModulePage(governmentCoordinationConfig),
  'sadc-coordination': createRichModulePage(sadcCoordinationConfig),

  'recovery-overview': createRichModulePage(recoveryOverviewConfig),
  'damage-loss': createRichModulePage(damageLossConfig),
  recovery: createRichModulePage(recoveryProgressConfig),
  'build-back-better': createRichModulePage(buildBackBetterConfig),
  resilience: createRichModulePage(resilienceConfig),

  knowledge: createRichModulePage(knowledgeOverviewConfig),
  reports: createRichModulePage(reportsConfig),
  analytics: createRichModulePage(analyticsConfig),
  'lessons-learned': createRichModulePage(lessonsLearnedConfig),
  iks: createRichModulePage(iksConfig),
  'knowledge-repository': createRichModulePage(knowledgeRepositoryConfig),

  'digital-sops': createRichModulePage(digitalSopsConfig),
  'users-roles': createRichModulePage(usersRolesConfig),
  'data-sources': createRichModulePage(dataSourcesConfig),
  'system-administration': createRichModulePage(systemAdminConfig),
}

export function resolveConceptPage(slug: string[] | undefined) {
  if (!slug?.length) return null
  const key = slug.join('/')
  return conceptPages[key] ?? null
}
