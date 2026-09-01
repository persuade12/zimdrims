'use client'

import { Phone, MessageCircle } from 'lucide-react'
import { keyContacts } from '@/lib/zimdrims-data'
import { useLocale } from '@/components/dare/locale-provider'

export function DataMarketplace() {
  const { t } = useLocale()

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">{t.home.keyContacts}</h2>
      <ul className="mt-3 space-y-3">
        {keyContacts.map((contact) => (
          <li key={contact.name} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2.5">
            <div>
              <p className="text-[13px] font-semibold text-foreground">{contact.name}</p>
              <p className="text-[12px] tabular-nums text-muted-foreground">{contact.number}</p>
            </div>
            {contact.type === 'whatsapp' ? (
              <MessageCircle className="size-4 shrink-0 text-primary" />
            ) : (
              <Phone className="size-4 shrink-0 text-primary" />
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
