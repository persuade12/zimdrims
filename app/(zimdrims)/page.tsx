import { ModulePage } from '@/components/dare/module-page'
import { Hero } from '@/components/dare/hero'
import { AtAGlance } from '@/components/dare/at-a-glance'
import { QuickAccess } from '@/components/dare/quick-access'
import { ProvincesMap } from '@/components/dare/provinces-map'
import { LatestAlerts } from '@/components/dare/latest-alerts'
import { HazardForecastTimeline } from '@/components/dare/hazard-forecast-timeline'
import { GovernanceDashboard } from '@/components/dare/governance-dashboard'
import { PlatformHealth } from '@/components/dare/platform-health'
import { SdgGoals } from '@/components/dare/sdg-goals'
import { DataMarketplace } from '@/components/dare/data-marketplace'

export default function Page() {
  return (
    <>
      <Hero />

      <AtAGlance />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <LatestAlerts />
        <HazardForecastTimeline />
      </div>

      <ProvincesMap />

      <QuickAccess />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <GovernanceDashboard />
        <SdgGoals />
        <PlatformHealth />
      </div>

      <DataMarketplace />
    </>
  )
}
