'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Shield } from 'lucide-react'
import { OPS_DEMO_USERS } from '@/lib/ops-demo-users'
import { ChaAccreditation } from '@/components/dare/cha-accreditation'

export function OpsLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPath = searchParams.get('next') || '/ops'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/ops/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        setError(data?.error || 'Login failed')
        return
      }
      router.replace(nextPath.startsWith('/ops') ? nextPath : '/ops')
      router.refresh()
    } catch {
      setError('Unable to reach the login service')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#071a11] px-4 py-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 20% 20%, #16794a55, transparent 50%), radial-gradient(ellipse at 80% 80%, #0c2f1eaa, transparent 45%)',
        }}
      />
      <div className="relative z-10 grid w-full max-w-4xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-2xl border border-white/10 bg-[#0c2f1e]/90 p-6 text-white shadow-xl backdrop-blur sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <Image src="/logo.svg" alt="Republic of Zimbabwe" width={44} height={44} className="size-11" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">
                Department of Civil Protection
              </p>
              <h1 className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">
                ZIM-DRIMS Ops Login
              </h1>
            </div>
          </div>
          <p className="mb-6 text-sm text-white/75">
            Staff access to the National DCP operations platform. Demo authentication only — not connected to live
            identity systems.
          </p>
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block space-y-1.5 text-sm">
              <span className="font-semibold text-white/90">Username</span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                className="w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2.5 text-white outline-none ring-[#16794a] placeholder:text-white/40 focus:ring-2"
                placeholder="wonder.mufunda"
              />
            </label>
            <label className="block space-y-1.5 text-sm">
              <span className="font-semibold text-white/90">Password</span>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2.5 pr-10 text-white outline-none ring-[#16794a] placeholder:text-white/40 focus:ring-2"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 text-white/60 hover:text-white"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </label>
            {error ? (
              <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#16794a] px-4 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60"
            >
              <Shield className="size-4" />
              {loading ? 'Signing in…' : 'Sign in to Ops'}
            </button>
          </form>
          <p className="mt-5 text-center text-[12px] text-white/60">
            <Link href="/" className="font-semibold text-[#86efac] hover:underline">
              ← Back to public portal
            </Link>
          </p>
          <div className="mt-6 border-t border-white/10 pt-4">
            <ChaAccreditation variant="full" onDark className="justify-center" />
          </div>
        </section>

        <aside className="rounded-2xl border border-[#16794a]/40 bg-white/95 p-6 text-foreground shadow-xl dark:bg-card">
          <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-[#16794a]">
            Sample credentials
          </h2>
          <p className="mt-1 text-[12px] text-muted-foreground">
            Use either demo account below. Passwords are case-sensitive.
          </p>
          <ul className="mt-4 space-y-3">
            {OPS_DEMO_USERS.map((user) => (
              <li key={user.username} className="rounded-xl border border-border bg-secondary/40 p-3 text-sm">
                <p className="font-semibold text-foreground">{user.displayName}</p>
                <p className="text-[11px] text-muted-foreground">{user.role}</p>
                <dl className="mt-2 space-y-1 font-mono text-[12px]">
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">User</dt>
                    <dd className="font-semibold">{user.username}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Pass</dt>
                    <dd className="font-semibold">{user.password}</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  className="mt-2 text-[11px] font-bold text-[#16794a] hover:underline"
                  onClick={() => {
                    setUsername(user.username)
                    setPassword(user.password)
                  }}
                >
                  Fill form
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}
