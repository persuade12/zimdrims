'use client'

import { Shield, Phone, Mail } from 'lucide-react'
import { useLocale } from '@/components/dare/locale-provider'

export function SiteFooter() {
  const { t } = useLocale()

  return (
    <footer className="rounded-xl bg-sidebar px-3 py-2.5 text-sidebar-foreground sm:px-4">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex items-center gap-2">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/10">
            <Shield className="size-3.5 text-sidebar-primary" />
          </div>
          <div className="leading-tight">
            <p className="text-[10px] font-bold text-white">{t.footer.tagline}</p>
            <p className="hidden text-[9px] text-sidebar-foreground/70 sm:block">{t.footer.copyright}</p>
          </div>
        </div>

        <p className="hidden text-center text-[10px] font-semibold text-white/90 lg:block">{t.footer.motto}</p>

        <div className="flex items-center gap-3">
          <a href={`mailto:${t.footer.email}`} className="flex items-center gap-1.5 text-[10px] text-sidebar-foreground/80 hover:text-white">
            <Mail className="size-3" />
            <span className="hidden sm:inline">{t.footer.email}</span>
          </a>
          <a href={`tel:${t.footer.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 text-[10px] text-sidebar-foreground/80 hover:text-white">
            <Phone className="size-3" />
            <span>{t.footer.phone}</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
