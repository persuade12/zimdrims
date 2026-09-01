import { Hero } from '@/components/dare/hero'
import { AtAGlance } from '@/components/dare/at-a-glance'
import { QuickAccess } from '@/components/dare/quick-access'
import { ProvincesMap } from '@/components/dare/provinces-map'
import { GovernanceDashboard } from '@/components/dare/governance-dashboard'
import { PlatformHealth } from '@/components/dare/platform-health'
import { LatestAlerts } from '@/components/dare/latest-alerts'
import { SdgGoals } from '@/components/dare/sdg-goals'
import { DataMarketplace } from '@/components/dare/data-marketplace'
import { DataAtAGlance } from '@/components/dare/data-at-a-glance'
import { ZimvacIndicators } from '@/components/dare/zimvac-indicators'
import { ZimlacServiceDelivery } from '@/components/dare/zimlac-service-delivery'

export default function Page() {
  return (
    <>
      <div className="grid grid-cols-1 gap-5 2xl:grid-cols-[1.9fr_1fr]">
        <Hero />
        <AtAGlance />
      </div>

      <QuickAccess />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_1fr]">
        <ProvincesMap />
        <div className="space-y-5">
          <GovernanceDashboard />
          <PlatformHealth />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <LatestAlerts />
        <SdgGoals />
        <DataMarketplace />
      </div>

      <DataAtAGlance />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ZimvacIndicators />
        <ZimlacServiceDelivery />
      </div>
    </>
  )
}
