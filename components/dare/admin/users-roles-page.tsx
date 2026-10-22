'use client'

import { useCallback, useEffect, useState } from 'react'
import { PageHeader } from '@/components/dare/page-primitives'
import { RichModulePage } from '@/components/dare/pages/rich-module'
import { Panel } from '@/components/dare/ui'
import { useOpsSession } from '@/components/dare/use-ops-session'
import { useReferenceData } from '@/components/dare/use-reference'
import { usersRolesConfig } from '@/lib/concept/rich-modules'
import type { CommandUserRecord, HazardItemRecord } from '@/lib/zimdrims/types'

const inputClass = 'h-9 w-full rounded-lg border border-border bg-background px-2.5 text-sm text-foreground'

async function errorMessage(response: Response) {
  const data = (await response.json().catch(() => null)) as { error?: string } | null
  return data?.error || `Request failed (${response.status})`
}

function idText(ids: string) {
  if (!ids.trim()) return []
  return ids
    .split(',')
    .map((part) => Number(part.trim()))
    .filter((id) => Number.isFinite(id) && id > 0)
}

export function UsersRolesPage() {
  const session = useOpsSession()
  const reference = useReferenceData()
  const [users, setUsers] = useState<CommandUserRecord[] | null>(null)
  const [usersError, setUsersError] = useState('')
  const [items, setItems] = useState<HazardItemRecord[] | null>(null)
  const [itemsError, setItemsError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const [userResponse, itemResponse] = await Promise.all([
      fetch('/api/zimdrims/command-users'),
      fetch('/api/zimdrims/hazard-items'),
    ])
    if (userResponse.ok) {
      const data = (await userResponse.json()) as { users: CommandUserRecord[] }
      setUsers(data.users)
      setUsersError('')
    } else {
      setUsers(null)
      setUsersError(await errorMessage(userResponse))
    }
    if (itemResponse.ok) {
      const data = (await itemResponse.json()) as { items: HazardItemRecord[] }
      setItems(data.items)
      setItemsError('')
    } else {
      setItems(null)
      setItemsError(await errorMessage(itemResponse))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    let cancelled = false
    load().catch(() => {
      if (!cancelled) setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [load])

  if (!loading && users === null) {
    return (
      <div className="space-y-4">
        <p className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-foreground">
          ZIMDRIMS registry is unreachable. Showing the demonstration access matrix. {usersError}
        </p>
        <RichModulePage config={usersRolesConfig} />
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Access Control — Users & Roles"
        subtitle="Command users and hazard-item mappings from the ZIMDRIMS registry."
        meta={session.status === 'ready' ? session.role : 'Checking session…'}
      />
      <CommandUsersPanel
        users={users ?? []}
        loading={loading}
        isAdmin={session.isAdmin}
        sessionPending={session.status !== 'ready'}
        onChanged={load}
      />
      <HazardItemsPanel
        items={items ?? []}
        error={itemsError}
        loading={loading}
        isAdmin={session.isAdmin}
        sessionPending={session.status !== 'ready'}
        hazards={reference.hazardsSource === 'live' ? reference.hazards : []}
        categories={reference.categoriesSource === 'live' ? reference.categories : []}
        onChanged={load}
      />
    </div>
  )
}

function CommandUsersPanel({
  users,
  loading,
  isAdmin,
  sessionPending,
  onChanged,
}: {
  users: CommandUserRecord[]
  loading: boolean
  isAdmin: boolean
  sessionPending: boolean
  onChanged: () => Promise<void>
}) {
  const [userId, setUserId] = useState('')
  const [forename, setForename] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [systemRole, setSystemRole] = useState('')
  const [depts, setDepts] = useState('')
  const [stageAccess, setStageAccess] = useState('')
  const [hazardAccess, setHazardAccess] = useState('')
  const [provinceAccess, setProvinceAccess] = useState('')
  const [districtAccess, setDistrictAccess] = useState('')
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [formOpen, setFormOpen] = useState(false)

  function clearForm() {
    setUserId('')
    setForename('')
    setSurname('')
    setEmail('')
    setMobile('')
    setSystemRole('')
    setDepts('')
    setStageAccess('')
    setHazardAccess('')
    setProvinceAccess('')
    setDistrictAccess('')
  }

  function startCreate() {
    clearForm()
    setNotice('')
    setError('')
    setFormOpen(true)
  }

  function edit(user: CommandUserRecord) {
    setUserId(user.userId ? String(user.userId) : '')
    setForename(user.forename)
    setSurname(user.surname)
    setEmail(user.email)
    setMobile(user.mobile)
    setSystemRole(user.systemRole ? String(user.systemRole) : '')
    setNotice('')
    setError('')
    setFormOpen(true)
  }

  async function checkEmail() {
    setError('')
    setNotice('')
    const response = await fetch('/api/zimdrims/user-exists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (!response.ok) {
      setError(await errorMessage(response))
      return
    }
    const data = (await response.json()) as { userExists: boolean; hasPassword: boolean }
    setNotice(data.userExists ? `Account exists${data.hasPassword ? ' and has a password' : ''}.` : 'No account for that email.')
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError('')
    setNotice('')
    const label = userId ? `Update command user ${userId}` : `Create command user ${email}`
    if (!window.confirm(`${label} in the ZIMDRIMS registry?`)) return
    setSaving(true)
    try {
      const response = await fetch('/api/zimdrims/command-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: Number(userId) || undefined,
          forename,
          surname,
          email,
          mobile,
          systemRole: Number(systemRole),
          depts: idText(depts),
          stageAccess: idText(stageAccess),
          hazardAccess: idText(hazardAccess),
          provinceAccess: idText(provinceAccess),
          districtAccess: idText(districtAccess),
        }),
      })
      if (!response.ok) {
        setError(await errorMessage(response))
        return
      }
      setNotice(userId ? 'Command user saved.' : 'Command user created.')
      setFormOpen(false)
      clearForm()
      await onChanged()
    } catch {
      setError('Unable to reach the registry')
    } finally {
      setSaving(false)
    }
  }

  async function reset(user: CommandUserRecord) {
    if (!user.userId) return
    if (!window.confirm(`Reset the password for ${user.email || user.userId}?`)) return
    setError('')
    setNotice('')
    const response = await fetch('/api/zimdrims/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.userId }),
    })
    if (!response.ok) {
      setError(await errorMessage(response))
      return
    }
    setNotice(`Password reset requested for user ${user.userId}.`)
  }

  return (
    <Panel
      title="Command users"
      action={
        sessionPending ? null : (
          <button
            type="button"
            className="h-8 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground hover:opacity-90"
            onClick={startCreate}
          >
            Create user
          </button>
        )
      }
    >
      {loading ? <p className="text-sm text-muted-foreground">Loading registry…</p> : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="text-[10px] uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="py-2 pr-3">Name</th>
              <th className="py-2 pr-3">Email</th>
              <th className="py-2 pr-3">Role</th>
              <th className="py-2 pr-3">Enabled</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={`${user.userId}-${user.email}`} className="border-t border-border">
                <td className="py-2 pr-3">{[user.forename, user.surname].filter(Boolean).join(' ') || '—'}</td>
                <td className="py-2 pr-3">{user.email || '—'}</td>
                <td className="py-2 pr-3">{user.role}</td>
                <td className="py-2 pr-3">{user.isEnabled === null ? '—' : user.isEnabled ? 'Yes' : 'No'}</td>
                <td className="py-2">
                  {sessionPending ? null : (
                    <span className="flex gap-3">
                      <button type="button" className="font-semibold text-primary hover:underline" onClick={() => edit(user)}>
                        Edit
                      </button>
                      {isAdmin ? (
                        <button type="button" className="font-semibold text-primary hover:underline" onClick={() => reset(user)}>
                          Reset password
                        </button>
                      ) : null}
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {!loading && users.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-3 text-muted-foreground">
                  No command users returned.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {formOpen ? (
        <form onSubmit={onSubmit} className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <p className="sm:col-span-2 text-sm font-semibold text-foreground">
            {userId ? `Edit user ${userId}` : 'Create user'}
          </p>
          <p className="sm:col-span-2 text-sm text-muted-foreground">
            Access fields take comma-separated ids.
          </p>
          <Field label="User id" value={userId} onChange={setUserId} />
          <Field label="System role" value={systemRole} onChange={setSystemRole} required />
          <Field label="Forename" value={forename} onChange={setForename} required />
          <Field label="Surname" value={surname} onChange={setSurname} required />
          <Field label="Email" value={email} onChange={setEmail} type="email" required />
          <Field label="Mobile" value={mobile} onChange={setMobile} />
          <Field label="Departments" value={depts} onChange={setDepts} />
          <Field label="Stage access" value={stageAccess} onChange={setStageAccess} />
          <Field label="Hazard access" value={hazardAccess} onChange={setHazardAccess} />
          <Field label="Province access" value={provinceAccess} onChange={setProvinceAccess} />
          <Field label="District access" value={districtAccess} onChange={setDistrictAccess} />
          <div className="flex flex-wrap items-end gap-2">
            <button type="button" className="h-9 rounded-lg border border-border px-3 text-sm font-semibold" onClick={checkEmail}>
              Check email
            </button>
            <button
              type="submit"
              disabled={saving}
              className="h-9 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              {saving ? 'Saving…' : userId ? 'Save changes' : 'Create user'}
            </button>
            <button
              type="button"
              className="h-9 rounded-lg border border-border px-3 text-sm font-semibold"
              onClick={() => setFormOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      {notice ? <p className="mt-3 text-sm text-primary">{notice}</p> : null}
    </Panel>
  )
}

function HazardItemsPanel({
  items,
  error,
  loading,
  isAdmin,
  sessionPending,
  hazards,
  categories,
  onChanged,
}: {
  items: HazardItemRecord[]
  error: string
  loading: boolean
  isAdmin: boolean
  sessionPending: boolean
  hazards: { id: number; name: string }[]
  categories: { id: number; name: string }[]
  onChanged: () => Promise<void>
}) {
  const [mappingId, setMappingId] = useState('')
  const [hazardId, setHazardId] = useState('')
  const [itemNameId, setItemNameId] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [notice, setNotice] = useState('')
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!window.confirm('Save this hazard item mapping in the ZIMDRIMS registry?')) return
    setSaving(true)
    setFormError('')
    setNotice('')
    try {
      const response = await fetch('/api/zimdrims/hazard-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mapping_id: Number(mappingId) || undefined,
          hazard_id: Number(hazardId),
          item_name_id: Number(itemNameId),
          is_active: isActive,
        }),
      })
      if (!response.ok) {
        setFormError(await errorMessage(response))
        return
      }
      setNotice('Hazard item saved.')
      await onChanged()
    } catch {
      setFormError('Unable to reach the registry')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Panel title="Hazard items">
      {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}
      {categories.length ? (
        <p className="mb-3 text-sm text-muted-foreground">
          Categories: {categories.map((category) => category.name).join(', ')}
        </p>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="text-[10px] uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="py-2 pr-3">Mapping</th>
              <th className="py-2 pr-3">Hazard</th>
              <th className="py-2 pr-3">Item</th>
              <th className="py-2">Active</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={`${item.mappingId}-${item.hazardId}-${item.itemNameId}`} className="border-t border-border">
                <td className="py-2 pr-3">{item.mappingId || '—'}</td>
                <td className="py-2 pr-3">{item.hazardName || item.hazardId || '—'}</td>
                <td className="py-2 pr-3">{item.itemName || item.itemNameId || '—'}</td>
                <td className="py-2">{item.isActive === null ? '—' : item.isActive ? 'Yes' : 'No'}</td>
              </tr>
            ))}
            {!loading && items.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-3 text-muted-foreground">
                  No hazard items returned.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      {sessionPending ? null : isAdmin ? (
        <form onSubmit={onSubmit} className="mt-4 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <Field label="Mapping id" value={mappingId} onChange={setMappingId} />
          <label className="block text-sm">
            <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Hazard</span>
            {hazards.length ? (
              <select className={inputClass} value={hazardId} onChange={(e) => setHazardId(e.target.value)} required>
                <option value="">Select</option>
                {hazards.filter((hazard) => hazard.id > 0).map((hazard) => (
                  <option key={hazard.id} value={hazard.id}>
                    {hazard.name}
                  </option>
                ))}
              </select>
            ) : (
              <input className={inputClass} value={hazardId} onChange={(e) => setHazardId(e.target.value)} required placeholder="Hazard id" />
            )}
          </label>
          <Field label="Item name id" value={itemNameId} onChange={setItemNameId} required />
          <label className="flex items-end gap-2 text-sm">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
            Active
          </label>
          <div>
            <button
              type="submit"
              disabled={saving}
              className="h-9 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save mapping'}
            </button>
          </div>
        </form>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">Hazard item changes require an administrator session.</p>
      )}
      {formError ? <p className="mt-3 text-sm text-red-600">{formError}</p> : null}
      {notice ? <p className="mt-3 text-sm text-primary">{notice}</p> : null}
    </Panel>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{label}</span>
      <input className={inputClass} type={type} value={value} required={required} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}
