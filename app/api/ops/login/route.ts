import { NextResponse } from 'next/server'
import { OPS_SESSION_COOKIE, encodeSession, verifyCredentials } from '@/lib/ops-auth'
import { zimdrimsAuthMode } from '@/lib/zimdrims/auth-mode'
import { ZimdrimsApiError } from '@/lib/zimdrims/client'
import { loginWithApi } from '@/lib/zimdrims/login'

export async function POST(request: Request) {
  let body: { username?: string; email?: string; password?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const identifier = (body.email ?? body.username ?? '').trim()
  const password = body.password ?? ''
  if (!identifier || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  try {
    const session =
      zimdrimsAuthMode() === 'demo'
        ? verifyCredentials(identifier, password)
        : await loginWithApi(identifier, password)

    if (!session) {
      const message =
        zimdrimsAuthMode() === 'demo' ? 'Invalid username or password' : 'Invalid email or password'
      return NextResponse.json({ error: message }, { status: 401 })
    }

    const response = NextResponse.json({
      ok: true,
      user: {
        username: session.username,
        displayName: session.displayName,
        role: session.role,
        isAdmin: session.isAdmin === true,
      },
    })
    response.cookies.set(OPS_SESSION_COOKIE, encodeSession(session), {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 12,
    })
    return response
  } catch (error) {
    const message = error instanceof ZimdrimsApiError ? error.message : 'ZIMDRIMS API is unreachable'
    return NextResponse.json({ error: message }, { status: 503 })
  }
}
