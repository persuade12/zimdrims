import { flag, num, str } from '@/lib/zimdrims/format'
import { asList, isRecord } from '@/lib/zimdrims/normalize'
import type {
  CommandUserRecord,
  DistrictRecord,
  HazardCategoryRecord,
  HazardItemRecord,
  HazardRecord,
  ProvinceRecord,
  UserExistsRecord,
} from '@/lib/zimdrims/types'

function rowList(data: unknown): Record<string, unknown>[] {
  return asList(data).filter(isRecord)
}

function firstNumber(row: Record<string, unknown>, keys: string[]): number {
  for (const key of keys) {
    if (row[key] != null && row[key] !== '') return num(row[key])
  }
  return 0
}

function firstString(row: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = str(row[key])
    if (value) return value
  }
  return ''
}

export function mapProvinces(data: unknown): ProvinceRecord[] {
  return rowList(data)
    .map((row) => {
      const name = firstString(row, ['name', 'province_name', 'province', 'ProvinceName'])
      if (!name) return null
      return {
        id: firstNumber(row, ['id', 'province_id', 'ProvinceID']),
        name,
        code: firstString(row, ['code', 'province_code', 'ProvinceCode']),
        male: firstNumber(row, ['male', 'male_population', 'males']),
        female: firstNumber(row, ['female', 'female_population', 'females']),
        total: firstNumber(row, ['total', 'total_population', 'population']),
      }
    })
    .filter((row): row is ProvinceRecord => row !== null)
}

export function mapDistricts(data: unknown): DistrictRecord[] {
  return rowList(data)
    .map((row) => {
      const name = firstString(row, ['name', 'district_name', 'district', 'DistrictName'])
      if (!name) return null
      const provinceId = firstNumber(row, ['province_id', 'provinceId', 'ProvinceID'])
      return {
        id: firstNumber(row, ['id', 'district_id', 'DistrictID']),
        name,
        code: firstString(row, ['code', 'district_code', 'DistrictCode']),
        provinceId: provinceId || null,
        provinceName: firstString(row, ['province_name', 'province', 'ProvinceName']),
        male: firstNumber(row, ['male', 'male_population', 'males']),
        female: firstNumber(row, ['female', 'female_population', 'females']),
        total: firstNumber(row, ['total', 'total_population', 'population']),
      }
    })
    .filter((row): row is DistrictRecord => row !== null)
}

export function mapHazards(data: unknown): HazardRecord[] {
  return rowList(data)
    .map((row) => {
      const name = firstString(row, ['name', 'hazard_name', 'hazard', 'HazardName'])
      if (!name) return null
      return {
        id: firstNumber(row, ['id', 'hazard_id', 'HazardID']),
        code: firstString(row, ['code', 'hazard_code', 'HazardCode']),
        name,
        iconName: firstString(row, ['icon_name', 'iconName', 'icon']),
        color: firstString(row, ['color', 'colour']),
        descr: firstString(row, ['descr', 'description', 'desc']),
      }
    })
    .filter((row): row is HazardRecord => row !== null)
}

export function mapHazardCategories(data: unknown): HazardCategoryRecord[] {
  return rowList(data)
    .map((row) => {
      const name = firstString(row, ['name', 'category_name', 'category', 'descr', 'description'])
      if (!name) return null
      return {
        id: firstNumber(row, ['id', 'category_id', 'hazard_category_id']),
        name,
        code: firstString(row, ['code', 'category_code']),
      }
    })
    .filter((row): row is HazardCategoryRecord => row !== null)
}

export function mapCommandUsers(data: unknown): CommandUserRecord[] {
  return rowList(data).map((row) => {
    const roleValue = row.role ?? row.role_name ?? row.systemRole ?? row.system_role
    let role = 'User'
    let systemRole: number | null = null
    if (typeof roleValue === 'number') {
      systemRole = roleValue
      role = `Role ${roleValue}`
    } else if (typeof roleValue === 'string' && roleValue.trim()) {
      role = roleValue.trim()
    } else if (isRecord(roleValue)) {
      role = firstString(roleValue, ['name', 'role_name', 'label']) || role
      const id = firstNumber(roleValue, ['id', 'role_id', 'systemRole'])
      systemRole = id || null
    }
    const explicitRole = firstNumber(row, ['systemRole', 'system_role', 'role_id'])
    if (explicitRole) systemRole = explicitRole
    const named = firstString(row, ['role_name', 'roleName'])
    if (named) role = named

    return {
      userId: firstNumber(row, ['user_id', 'userId', 'id']),
      forename: firstString(row, ['forename', 'first_name', 'firstName']),
      surname: firstString(row, ['surname', 'last_name', 'lastName']),
      email: firstString(row, ['email', 'username']),
      mobile: firstString(row, ['mobile', 'phone', 'msisdn']),
      role,
      systemRole,
      isEnabled: flag(row.is_enabled ?? row.isEnabled ?? row.enabled),
    }
  })
}

export function mapHazardItems(data: unknown): HazardItemRecord[] {
  return rowList(data).map((row) => ({
    mappingId: firstNumber(row, ['mapping_id', 'mappingId', 'id']),
    hazardId: firstNumber(row, ['hazard_id', 'hazardId']),
    itemNameId: firstNumber(row, ['item_name_id', 'itemNameId']),
    itemName: firstString(row, ['item_name', 'itemName', 'name']),
    hazardName: firstString(row, ['hazard_name', 'hazardName', 'hazard']),
    isActive: flag(row.is_active ?? row.isActive ?? row.active),
  }))
}

export function mapUserExists(data: unknown): UserExistsRecord {
  const row = rowList(data)[0]
  if (!row) return { userExists: false, hasPassword: false }
  return {
    userExists: flag(row.user_exists ?? row.userExists) === true,
    hasPassword: flag(row.has_password ?? row.hasPassword) === true,
  }
}

export function accessIds(value: unknown): number[] {
  let current = value
  if (typeof current === 'string') {
    const trimmed = current.trim()
    if (!trimmed) return []
    if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
      try {
        current = JSON.parse(trimmed)
      } catch {
        return []
      }
    } else if (trimmed.includes(',')) {
      return trimmed
        .split(',')
        .map((part) => Number(part.trim()))
        .filter((id) => Number.isFinite(id))
    } else {
      const id = Number(trimmed)
      return Number.isFinite(id) ? [id] : []
    }
  }

  if (typeof current === 'number' && Number.isFinite(current)) return [current]
  if (isRecord(current)) {
    const id = firstNumber(current, ['id', 'province_id', 'district_id', 'hazard_id', 'dept_id', 'stage_id'])
    return id ? [id] : []
  }
  if (!Array.isArray(current)) return []

  const ids: number[] = []
  for (const item of current) {
    if (typeof item === 'number' && Number.isFinite(item)) ids.push(item)
    else if (typeof item === 'string' && item.trim() && Number.isFinite(Number(item))) ids.push(Number(item))
    else if (isRecord(item)) {
      const id = firstNumber(item, ['id', 'province_id', 'district_id', 'hazard_id', 'dept_id', 'stage_id'])
      if (id) ids.push(id)
    }
  }
  return ids
}

export function readAccess(row: Record<string, unknown>, camel: string, snake: string): number[] {
  if (camel in row) return accessIds(row[camel])
  if (snake in row) return accessIds(row[snake])
  return []
}

export function roleIsAdmin(role: string): boolean {
  return role.toLowerCase().includes('admin')
}
