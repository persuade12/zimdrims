import { Suspense } from 'react'
import { OpsLoginForm } from '@/components/dare/ops-login'

export default function OpsLoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-dvh items-center justify-center bg-[#071a11] text-white">Loading…</div>}>
      <OpsLoginForm />
    </Suspense>
  )
}
