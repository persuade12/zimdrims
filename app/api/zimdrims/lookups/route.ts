import { NextResponse } from 'next/server'
import { fetchHazardCategories, fetchHazards, fetchProvinces } from '@/lib/zimdrims/client'
import { staticHazards, staticProvinces } from '@/lib/zimdrims/static-reference'
import type { ReferenceLookups } from '@/lib/zimdrims/types'

export const dynamic = 'force-dynamic'

export async function GET() {
  const [provinces, hazards, categories] = await Promise.allSettled([
    fetchProvinces(),
    fetchHazards(),
    fetchHazardCategories(),
  ])

  const body: ReferenceLookups = {
    provinces: provinces.status === 'fulfilled' && provinces.value.length ? provinces.value : staticProvinces,
    provincesSource: provinces.status === 'fulfilled' && provinces.value.length ? 'live' : 'static',
    hazards: hazards.status === 'fulfilled' && hazards.value.length ? hazards.value : staticHazards,
    hazardsSource: hazards.status === 'fulfilled' && hazards.value.length ? 'live' : 'static',
    categories: categories.status === 'fulfilled' ? categories.value : [],
    categoriesSource: categories.status === 'fulfilled' ? 'live' : 'static',
  }

  return NextResponse.json(body)
}
