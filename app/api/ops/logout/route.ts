import { NextResponse } from 'next/server'
import { OPS_SESSION_COOKIE } from '@/lib/ops-auth'

export async function POST() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(OPS_SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
  })
  return response
}
