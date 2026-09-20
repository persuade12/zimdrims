import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { OPS_SESSION_COOKIE, decodeSession } from '@/lib/ops-auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/public')) {
    const dest = pathname === '/public' ? '/' : pathname.replace(/^\/public/, '') || '/'
    return NextResponse.redirect(new URL(dest, request.url))
  }

  if (!pathname.startsWith('/ops')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/ops/login')) {
    const session = decodeSession(request.cookies.get(OPS_SESSION_COOKIE)?.value)
    if (session) {
      return NextResponse.redirect(new URL('/ops', request.url))
    }
    return NextResponse.next()
  }

  const session = decodeSession(request.cookies.get(OPS_SESSION_COOKIE)?.value)
  if (!session) {
    const login = new URL('/ops/login', request.url)
    login.searchParams.set('next', pathname)
    return NextResponse.redirect(login)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/ops', '/ops/:path*', '/public', '/public/:path*'],
}
