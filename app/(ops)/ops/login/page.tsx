import { Suspense } from 'react'
import { OpsLoginForm } from '@/components/dare/ops-login'
import { zimdrimsAuthMode } from '@/lib/zimdrims/auth-mode'

export default function OpsLoginPage() {
  const authMode = zimdrimsAuthMode()
  return (
    <Suspense fallback={<div className="flex min-h-dvh items-center justify-center bg-[#071a11] text-white">Loading…</div>}>
      <OpsLoginForm authMode={authMode} />
    </Suspense>
  )
}
