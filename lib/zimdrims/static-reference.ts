import { hazardFilters, provinces } from '@/lib/zimdrims-data'
import type { HazardRecord, ProvinceRecord, ReferenceLookups } from '@/lib/zimdrims/types'

export const staticProvinces: ProvinceRecord[] = provinces.map((name) => ({
  id: 0,
  name,
  code: '',
  male: 0,
  female: 0,
  total: 0,
}))

export const staticHazards: HazardRecord[] = hazardFilters
  .filter((name) => name !== 'All Hazards')
  .map((name) => ({
    id: 0,
    code: '',
    name,
    iconName: '',
    color: '',
    descr: '',
  }))

export const staticReference: ReferenceLookups = {
  provinces: staticProvinces,
  provincesSource: 'static',
  hazards: staticHazards,
  hazardsSource: 'static',
  categories: [],
  categoriesSource: 'static',
}
