import { OPS_DEMO_USERS, type OpsDemoUser } from '@/lib/ops-demo-users'

export { OPS_DEMO_USERS }
export type { OpsDemoUser }

export const OPS_SESSION_COOKIE = 'zimdrims_ops_session'

export type OpsSession = {
  username: string
  displayName: string
  role: string
  userId?: number
  isAdmin?: boolean
  systemRole?: number
  stageAccess?: number[]
  deptAccess?: number[]
  hazardAccess?: number[]
  provinceAccess?: number[]
  districtAccess?: number[]
}

export function verifyCredentials(username: string, password: string): OpsSession | null {
  const user = OPS_DEMO_USERS.find(
    (u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password,
  )
  if (!user) return null
  return {
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    isAdmin: user.role.toLowerCase().includes('admin'),
  }
}

function toBase64Url(input: string): string {
  const bytes = new TextEncoder().encode(input)
  let binary = ''
  for (const b of bytes) binary += String.fromCharCode(b)
  const base64 = btoa(binary)
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(value: string): string {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4))
  const binary = atob(padded + pad)
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function encodeSession(session: OpsSession): string {
  return toBase64Url(JSON.stringify(session))
}

function idList(value: unknown): number[] | undefined {
  if (!Array.isArray(value)) return undefined
  const ids = value.filter((item): item is number => typeof item === 'number' && Number.isFinite(item))
  return ids
}

export function decodeSession(value: string | undefined | null): OpsSession | null {
  if (!value) return null
  try {
    const parsed = JSON.parse(fromBase64Url(value)) as OpsSession
    if (!parsed?.username || !parsed?.displayName || !parsed?.role) return null
    return {
      username: parsed.username,
      displayName: parsed.displayName,
      role: parsed.role,
      userId: typeof parsed.userId === 'number' ? parsed.userId : undefined,
      isAdmin: parsed.isAdmin === true,
      systemRole: typeof parsed.systemRole === 'number' ? parsed.systemRole : undefined,
      stageAccess: idList(parsed.stageAccess),
      deptAccess: idList(parsed.deptAccess),
      hazardAccess: idList(parsed.hazardAccess),
      provinceAccess: idList(parsed.provinceAccess),
      districtAccess: idList(parsed.districtAccess),
    }
  } catch {
    return null
  }
}
