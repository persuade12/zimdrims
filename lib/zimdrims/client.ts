import { zimdrimsApiBaseUrl } from '@/lib/zimdrims/auth-mode'
import {
  mapCommandUsers,
  mapDistricts,
  mapHazardCategories,
  mapHazardItems,
  mapHazards,
  mapProvinces,
  mapUserExists,
} from '@/lib/zimdrims/map-rows'
import { asRecord, normalizeJson } from '@/lib/zimdrims/normalize'
import type {
  CommandUserRecord,
  DistrictRecord,
  HazardCategoryRecord,
  HazardItemRecord,
  HazardRecord,
  ProvinceRecord,
  UserExistsRecord,
} from '@/lib/zimdrims/types'

const TIMEOUT_MS = 20_000
const ZIMDRIMS_DB = process.env.ZIMDRIMS_DB_NAME?.trim() || 'zimdrims_db'
/** Three-part name: zimdrimsdb.dbo.<procedure>. The pool's default database does not contain these procedures. */
const PROCEDURE_SCHEMA = 'zimdrimsdb.dbo'

export class ZimdrimsApiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ZimdrimsApiError'
    this.status = status
  }
}

type ProcedureKind = 'read' | 'admin'

async function callProcedure(kind: ProcedureKind, spName: string, payload: Record<string, unknown> = {}) {
  const path = kind === 'read' ? '/getJSONData' : '/getAdminJSONData'
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(`${zimdrimsApiBaseUrl()}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ schema: `${ZIMDRIMS_DB}.dbo`, spName, payload: [payload] }),
      cache: 'no-store',
      signal: controller.signal,
    })
    const text = await response.text()
    if (!response.ok) {
      throw new ZimdrimsApiError(text.trim() || `ZIMDRIMS API returned ${response.status}`, response.status)
    }
    if (!text.trim()) return null
    try {
      return normalizeJson(JSON.parse(text))
    } catch {
      return normalizeJson(text)
    }
  } catch (error) {
    if (error instanceof ZimdrimsApiError) throw error
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ZimdrimsApiError('ZIMDRIMS API timed out')
    }
    throw new ZimdrimsApiError('ZIMDRIMS API is unreachable')
  } finally {
    clearTimeout(timer)
  }
}

export function getJSONData(spName: string, payload: Record<string, unknown> = {}) {
  return callProcedure('read', spName, payload)
}

export function getAdminJSONData(spName: string, payload: Record<string, unknown> = {}) {
  return callProcedure('admin', spName, payload)
}

export async function fetchProvinces(): Promise<ProvinceRecord[]> {
  return mapProvinces(await getJSONData('select_provinces', {}))
}

export async function fetchDistricts(input: {
  provinceId?: number
  provinceIds?: number[]
} = {}): Promise<DistrictRecord[]> {
  const payload: Record<string, unknown> = {}
  if (input.provinceId) payload.province_id = input.provinceId
  if (input.provinceIds?.length) payload.provinceIds = input.provinceIds
  return mapDistricts(await getJSONData('select_districts', payload))
}

export async function fetchHazards(): Promise<HazardRecord[]> {
  return mapHazards(await getJSONData('select_hazards', {}))
}

export async function fetchHazardCategories(): Promise<HazardCategoryRecord[]> {
  return mapHazardCategories(await getJSONData('select_hazard_categories', {}))
}

export async function fetchCommandUsers(input: { userId?: number; roleId?: number } = {}): Promise<CommandUserRecord[]> {
  const payload: Record<string, unknown> = {}
  if (input.userId) payload.user_id = input.userId
  if (input.roleId) payload.role_id = input.roleId
  return mapCommandUsers(await getJSONData('sp_get_command_users', payload))
}

export async function fetchUserExists(email: string): Promise<UserExistsRecord> {
  return mapUserExists(await getJSONData('select_user_exists', { email }))
}

export async function fetchHazardItems(hazardId?: number): Promise<HazardItemRecord[]> {
  const payload: Record<string, unknown> = {}
  if (hazardId) payload.hazard_id = hazardId
  return mapHazardItems(await getJSONData('select_all_hazard_items', payload))
}

export async function fetchLogin(email: string, password: string) {
  return getJSONData('select_login', { email, password })
}

export async function upsertCommandUser(payload: Record<string, unknown>) {
  return asRecord(await getAdminJSONData('sp_upsert_command_user', payload))
}

export async function upsertAaContact(payload: Record<string, unknown>) {
  return asRecord(await getAdminJSONData('sp_upsert_aa_contact', payload))
}

export async function resetPassword(userId: number) {
  return asRecord(await getAdminJSONData('reset_password', { user_id: userId }))
}

export async function upsertHazardItem(payload: Record<string, unknown>) {
  return asRecord(await getAdminJSONData('sp_upsert_hazard_item', payload))
}
