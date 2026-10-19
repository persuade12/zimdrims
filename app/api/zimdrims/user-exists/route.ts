import { NextResponse } from 'next/server'
import { fetchUserExists } from '@/lib/zimdrims/client'
import { isSession, requireAdmin, upstreamError } from '@/lib/zimdrims/guard'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const session = await requireAdmin()
  if (!isSession(session)) return session

  let body: { email?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const email = body.email?.trim() ?? ''
  if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })

  try {
    const result = await fetchUserExists(email)
    return NextResponse.json(result)
  } catch (error) {
    return upstreamError(error)
  }
}
