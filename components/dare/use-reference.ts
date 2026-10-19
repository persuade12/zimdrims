'use client'

import { useEffect, useState } from 'react'
import { staticReference } from '@/lib/zimdrims/static-reference'
import type { ProvinceRecord, ReferenceLookups } from '@/lib/zimdrims/types'

let cached: Promise<ReferenceLookups> | null = null

function loadReference(): Promise<ReferenceLookups> {
  if (!cached) {
    cached = fetch('/api/zimdrims/lookups')
      .then(async (response) => {
        if (!response.ok) return staticReference
        return (await response.json()) as ReferenceLookups
      })
      .catch(() => staticReference)
  }
  return cached
}

export function useReferenceData(): ReferenceLookups {
  const [data, setData] = useState<ReferenceLookups>(staticReference)

  useEffect(() => {
    let cancelled = false
    loadReference().then((next) => {
      if (!cancelled) setData(next)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return data
}

export function matchProvince(name: string | null | undefined, provinces: ProvinceRecord[]): ProvinceRecord | null {
  if (!name) return null
  const key = name.trim().toLowerCase()
  return provinces.find((province) => province.name.trim().toLowerCase() === key) ?? null
}
