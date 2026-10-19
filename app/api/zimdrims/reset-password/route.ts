import { NextResponse } from 'next/server'
import { resetPassword } from '@/lib/zimdrims/client'
import { num } from '@/lib/zimdrims/format'
import { isSession, requireAdmin, upstreamError } from '@/lib/zimdrims/guard'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const session = await requireAdmin()
  if (!isSession(session)) return session

  let body: { user_id?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const userId = num(body.user_id)
  if (!userId) return NextResponse.json({ error: 'A user id is required' }, { status: 400 })

  try {
    const result = await resetPassword(userId)
    return NextResponse.json({ ok: true, result })
  } catch (error) {
    return upstreamError(error)
  }
}
