import { NextResponse } from 'next/server'
import { fetchCommandUsers, upsertCommandUser } from '@/lib/zimdrims/client'
import { num } from '@/lib/zimdrims/format'
import { isSession, requireAdmin, requireUser, upstreamError } from '@/lib/zimdrims/guard'
import { accessIds } from '@/lib/zimdrims/map-rows'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const session = await requireUser()
  if (!isSession(session)) return session

  const url = new URL(request.url)
  const userId = Number(url.searchParams.get('user_id') ?? '')
  const roleId = Number(url.searchParams.get('role_id') ?? '')

  try {
    const users = await fetchCommandUsers({
      userId: Number.isFinite(userId) && userId > 0 ? userId : undefined,
      roleId: Number.isFinite(roleId) && roleId > 0 ? roleId : undefined,
    })
    return NextResponse.json({ users })
  } catch (error) {
    return upstreamError(error)
  }
}

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
  const systemRole = num(body.systemRole)
  if (!forename || !surname || !email || !systemRole) {
    return NextResponse.json({ error: 'Name, email, and system role are required' }, { status: 400 })
  }

  const payload: Record<string, unknown> = {
    forename,
    surname,
    email,
    mobile: String(body.mobile ?? '').trim(),
    systemRole,
    depts: accessIds(body.depts),
    stageAccess: accessIds(body.stageAccess),
    hazardAccess: accessIds(body.hazardAccess),
    provinceAccess: accessIds(body.provinceAccess),
    districtAccess: accessIds(body.districtAccess),
  }
  const userId = num(body.user_id)
  if (userId > 0) payload.user_id = userId

  try {
    const result = await upsertCommandUser(payload)
    return NextResponse.json({ ok: true, result })
  } catch (error) {
    return upstreamError(error)
  }
}
