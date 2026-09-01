'use client'

import { BarChart3, Users, Building2, Landmark, Lock } from 'lucide-react'
import { useLocale } from '@/components/dare/locale-provider'
import { cn } from '@/lib/utils'

export function SiteFooter() {
  const { t } = useLocale()

  return (
    <footer className="rounded-xl bg-sidebar px-3 py-2 text-sidebar-foreground sm:px-4">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex items-center gap-2">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/10">
            <BarChart3 className="size-3.5 text-sidebar-primary" />
          </div>
          <div className="leading-tight">
            <p className="text-[10px] font-bold uppercase tracking-wide text-white">{t.footer.poweredBy}</p>
            <p className="hidden text-[9px] text-sidebar-foreground/70 sm:block">{t.footer.cha}</p>
          </div>
        </div>

        <FooterItem className="hidden lg:flex" icon={Users} title={t.footer.evidenceTitle} sub={t.footer.evidenceSub} />
        <FooterItem className="hidden lg:flex" icon={Building2} title={t.footer.villageTitle} sub={t.footer.villageSub} />
        <FooterItem className="hidden xl:flex" icon={Landmark} title={t.footer.ministryTitle} sub={t.footer.ministrySub} />

        <div className="flex items-center gap-2">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/10">
            <Lock className="size-3.5 text-sidebar-primary" />
          </div>
          <div className="leading-tight">
            <p className="text-[10px] font-bold text-white">{t.footer.secureTitle}</p>
            <p className="hidden text-[9px] text-sidebar-foreground/70 sm:block">{t.footer.secureSub}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterItem({
  icon: Icon,
  title,
  sub,
  className,
}: {
  icon: typeof Users
  title: string
  sub: string
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/10">
        <Icon className="size-3.5 text-sidebar-primary" />
      </div>
      <div className="leading-tight">
        <p className="text-[10px] font-bold text-white">{title}</p>
        <p className="text-[9px] text-sidebar-foreground/70">{sub}</p>
      </div>
    </div>
  )
}
