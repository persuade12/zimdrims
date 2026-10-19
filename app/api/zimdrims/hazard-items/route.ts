import { NextResponse } from 'next/server'
import { fetchHazardItems, upsertHazardItem } from '@/lib/zimdrims/client'
import { flag, num } from '@/lib/zimdrims/format'
import { isSession, requireAdmin, requireUser, upstreamError } from '@/lib/zimdrims/guard'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const session = await requireUser()
  if (!isSession(session)) return session

  const hazardId = Number(new URL(request.url).searchParams.get('hazard_id') ?? '')

  try {
    const items = await fetchHazardItems(Number.isFinite(hazardId) && hazardId > 0 ? hazardId : undefined)
    return NextResponse.json({ items })
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

  const hazardId = num(body.hazard_id)
  const itemNameId = num(body.item_name_id)
  const active = flag(body.is_active)
  if (!hazardId || !itemNameId || active === null) {
    return NextResponse.json({ error: 'Hazard, item name, and active flag are required' }, { status: 400 })
  }

  const payload: Record<string, unknown> = {
    hazard_id: hazardId,
    item_name_id: itemNameId,
    is_active: active,
  }
  const mappingId = num(body.mapping_id)
  if (mappingId > 0) payload.mapping_id = mappingId

  try {
    const result = await upsertHazardItem(payload)
    return NextResponse.json({ ok: true, result })
  } catch (error) {
    return upstreamError(error)
  }
}
