import { NextResponse } from 'next/server'
import { upsertAaContact } from '@/lib/zimdrims/client'
import { num } from '@/lib/zimdrims/format'
import { isSession, requireAdmin, upstreamError } from '@/lib/zimdrims/guard'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const session = await requireAdmin()
  if (!isSession(session)) return session

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const forename = String(body.forename ?? '').trim()
  const surname = String(body.surname ?? '').trim()
  const email = String(body.email ?? '').trim()
  if (!forename || !surname || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }

  const payload: Record<string, unknown> = {
    forename,
    surname,
    email,
    mobile: String(body.mobile ?? '').trim(),
    role_id: num(body.role_id),
    department_id: num(body.department_id),
    province_id: num(body.province_id),
    district_id: num(body.district_id),
    hazard_id: num(body.hazard_id),
  }
  const id = num(body.id)
  if (id > 0) payload.id = id

  try {
    const result = await upsertAaContact(payload)
    return NextResponse.json({ ok: true, result })
  } catch (error) {
    return upstreamError(error)
  }
}
