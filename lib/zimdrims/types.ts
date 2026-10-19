export type ProvinceRecord = {
  id: number
  name: string
  code: string
  male: number
  female: number
  total: number
}

export type DistrictRecord = {
  id: number
  name: string
  code: string
  provinceId: number | null
  provinceName: string
  male: number
  female: number
  total: number
}

export type HazardRecord = {
  id: number
  code: string
  name: string
  iconName: string
  color: string
  descr: string
}

export type HazardCategoryRecord = {
  id: number
  name: string
  code: string
}

export type CommandUserRecord = {
  userId: number
  forename: string
  surname: string
  email: string
  mobile: string
  role: string
  systemRole: number | null
  isEnabled: boolean | null
}

export type HazardItemRecord = {
  mappingId: number
  hazardId: number
  itemNameId: number
  itemName: string
  hazardName: string
  isActive: boolean | null
}

export type UserExistsRecord = {
  userExists: boolean
  hasPassword: boolean
}

export type ReferenceSource = 'live' | 'static'

export type ReferenceLookups = {
  provinces: ProvinceRecord[]
  provincesSource: ReferenceSource
  hazards: HazardRecord[]
  hazardsSource: ReferenceSource
  categories: HazardCategoryRecord[]
  categoriesSource: ReferenceSource
}
