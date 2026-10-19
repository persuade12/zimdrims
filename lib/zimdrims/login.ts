import type { OpsSession } from '@/lib/ops-auth'
import { fetchLogin } from '@/lib/zimdrims/client'
import { str } from '@/lib/zimdrims/format'
import { readAccess, roleIsAdmin } from '@/lib/zimdrims/map-rows'
import { asList, isRecord } from '@/lib/zimdrims/normalize'

function roleFrom(row: Record<string, unknown>): { role: string; systemRole?: number } {
  const roleValue = row.role ?? row.role_name ?? row.systemRole ?? row.system_role
  if (typeof roleValue === 'string' && roleValue.trim()) return { role: roleValue.trim() }
  if (typeof roleValue === 'number') return { role: `Role ${roleValue}`, systemRole: roleValue }
  if (isRecord(roleValue)) {
    const role = str(roleValue.name ?? roleValue.role_name ?? roleValue.label) || 'User'
    const systemRole = Number(roleValue.id ?? roleValue.role_id)
    return { role, systemRole: Number.isFinite(systemRole) ? systemRole : undefined }
  }
  return { role: 'User' }
}

export function sessionFromLoginPayload(data: unknown, email: string): OpsSession | null {
  const rows = asList(data).filter(isRecord)
  const row = rows[0]
  if (!row) return null

  const status = str(row.status ?? row.Status).toLowerCase()
  if (status && ['fail', 'failed', 'invalid', 'error', 'denied'].some((token) => status.includes(token))) {
    return null
  }
  if (row.user_exists === 0 || row.user_exists === '0') return null

  const userId = Number(row.user_id ?? row.userId ?? row.id)
  const rowEmail = str(row.email)
  const hasIdentity =
    (Number.isFinite(userId) && userId > 0) ||
    Boolean(rowEmail) ||
    Boolean(str(row.forename ?? row.first_name ?? row.firstName))
  if (!hasIdentity) return null
  const resolvedEmail = rowEmail || email

  const { role, systemRole } = roleFrom(row)
  const explicitRole = Number(row.systemRole ?? row.system_role ?? row.role_id)
  const forename = str(row.forename ?? row.first_name ?? row.firstName)
  const surname = str(row.surname ?? row.last_name ?? row.lastName)
  const displayName = [forename, surname].filter(Boolean).join(' ') || resolvedEmail

  return {
    username: resolvedEmail,
    displayName,
    role,
    userId: Number.isFinite(userId) && userId > 0 ? userId : undefined,
    isAdmin: roleIsAdmin(role),
    systemRole: Number.isFinite(explicitRole) && explicitRole > 0 ? explicitRole : systemRole,
    stageAccess: readAccess(row, 'stageAccess', 'stage_access'),
    deptAccess: readAccess(row, 'deptAccess', 'dept_access'),
    hazardAccess: readAccess(row, 'hazardAccess', 'hazard_access'),
    provinceAccess: readAccess(row, 'provinceAccess', 'province_access'),
    districtAccess: readAccess(row, 'districtAccess', 'district_access'),
  }
}

export async function loginWithApi(email: string, password: string): Promise<OpsSession | null> {
  const payload = await fetchLogin(email, password)
  return sessionFromLoginPayload(payload, email)
}
