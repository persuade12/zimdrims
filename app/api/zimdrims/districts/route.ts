import { NextResponse } from 'next/server'
import { fetchDistricts } from '@/lib/zimdrims/client'

export const dynamic = 'force-dynamic'

function idsFrom(value: string | null): number[] {
  if (!value) return []
  return value
    .split(',')
    .map((part) => Number(part.trim()))
    .filter((id) => Number.isFinite(id) && id > 0)
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const provinceId = Number(url.searchParams.get('province_id') ?? '')
  const provinceIds = idsFrom(url.searchParams.get('province_ids'))

  try {
    const districts = await fetchDistricts({
      provinceId: Number.isFinite(provinceId) && provinceId > 0 ? provinceId : undefined,
      provinceIds: provinceIds.length ? provinceIds : undefined,
    })
    return NextResponse.json({ source: 'live', districts })
  } catch {
    return NextResponse.json({ source: 'static', districts: [] })
  }
}
