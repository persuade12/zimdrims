import { NextResponse } from 'next/server'
import { OPS_SESSION_COOKIE, encodeSession, verifyCredentials } from '@/lib/ops-auth'

export async function POST(request: Request) {
  let body: { username?: string; password?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const session = verifyCredentials(body.username ?? '', body.password ?? '')
  if (!session) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true, user: session })
  response.cookies.set(OPS_SESSION_COOKIE, encodeSession(session), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 12,
  })
  return response
}
