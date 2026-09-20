import { PublicShell } from '@/components/dare/public-shell'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <PublicShell>{children}</PublicShell>
}
