import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { OPS_SESSION_COOKIE, decodeSession, type OpsSession } from '@/lib/ops-auth'
import { ZimdrimsApiError } from '@/lib/zimdrims/client'

export async function readSession(): Promise<OpsSession | null> {
  const jar = await cookies()
  return decodeSession(jar.get(OPS_SESSION_COOKIE)?.value)
}

export function isSession(value: OpsSession | NextResponse): value is OpsSession {
  return !(value instanceof NextResponse)
}

export async function requireUser(): Promise<OpsSession | NextResponse> {
  const session = await readSession()
  if (!session) return NextResponse.json({ error: 'Sign in required' }, { status: 401 })
  return session
}

export async function requireAdmin(): Promise<OpsSession | NextResponse> {
  const session = await requireUser()
  if (!isSession(session)) return session
  if (!session.isAdmin) {
    return NextResponse.json({ error: 'Administrator access required' }, { status: 403 })
  }
  return session
}

export function upstreamError(error: unknown) {
  if (error instanceof ZimdrimsApiError) {
    const status = error.status && error.status >= 400 && error.status < 500 ? error.status : 502
    return NextResponse.json({ error: error.message }, { status })
  }
  return NextResponse.json({ error: 'ZIMDRIMS API is unreachable' }, { status: 502 })
}
