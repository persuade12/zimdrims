'use client'

import { useState } from 'react'
import { Panel } from '@/components/dare/ui'
import { useOpsSession } from '@/components/dare/use-ops-session'
import { useReferenceData } from '@/components/dare/use-reference'

const inputClass = 'h-9 w-full rounded-lg border border-border bg-background px-2.5 text-sm text-foreground'

async function errorMessage(response: Response) {
  const data = (await response.json().catch(() => null)) as { error?: string } | null
  return data?.error || `Request failed (${response.status})`
}

export function AaContactForm() {
  const session = useOpsSession()
  const reference = useReferenceData()
  const [forename, setForename] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [roleId, setRoleId] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [provinceId, setProvinceId] = useState('')
  const [districtId, setDistrictId] = useState('')
  const [hazardId, setHazardId] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  if (session.status !== 'ready') return null
  if (!session.isAdmin) {
    return (
      <Panel title="Anticipatory action contacts">
        <p className="text-sm text-muted-foreground">
          Saving AA contacts to the ZIMDRIMS registry requires an administrator session.
        </p>
      </Panel>
    )
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError('')
    setMessage('')
    const confirmed = window.confirm(`Save ${forename} ${surname} as an anticipatory-action contact in the ZIMDRIMS registry?`)
    if (!confirmed) return
    setSaving(true)
    try {
      const response = await fetch('/api/zimdrims/aa-contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          forename,
          surname,
          email,
          mobile,
          role_id: Number(roleId) || 0,
          department_id: Number(departmentId) || 0,
          province_id: Number(provinceId) || 0,
          district_id: Number(districtId) || 0,
          hazard_id: Number(hazardId) || 0,
        }),
      })
      if (!response.ok) {
        setError(await errorMessage(response))
        return
      }
      const data = (await response.json()) as { result?: { user_id?: number; status?: string } }
      setMessage(`Saved${data.result?.user_id ? ` · user ${data.result.user_id}` : ''}${data.result?.status ? ` · ${data.result.status}` : ''}.`)
    } catch {
      setError('Unable to reach the registry')
    } finally {
      setSaving(false)
    }
  }

  const provinces = reference.provincesSource === 'live' ? reference.provinces : []
  const hazards = reference.hazardsSource === 'live' ? reference.hazards : []

  return (
    <Panel title="Anticipatory action contacts">
      <p className="mb-3 text-sm text-muted-foreground">
        Writes a contact through the registry. This does not replace the public hotline cards.
      </p>
      <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Forename</span>
          <input className={inputClass} value={forename} onChange={(e) => setForename(e.target.value)} required />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Surname</span>
          <input className={inputClass} value={surname} onChange={(e) => setSurname(e.target.value)} required />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Email</span>
          <input type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Mobile</span>
          <input className={inputClass} value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </label>
        <NumberField label="Role id" value={roleId} onChange={setRoleId} />
        <NumberField label="Department id" value={departmentId} onChange={setDepartmentId} />
        <IdSelect label="Province" value={provinceId} onChange={setProvinceId} options={provinces.map((item) => ({ id: item.id, label: item.name }))} />
        <NumberField label="District id" value={districtId} onChange={setDistrictId} />
        <IdSelect label="Hazard" value={hazardId} onChange={setHazardId} options={hazards.map((item) => ({ id: item.id, label: item.name }))} />
        <div className="flex items-end">
          <button
            type="submit"
            disabled={saving}
            className="h-9 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save contact'}
          </button>
        </div>
      </form>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      {message ? <p className="mt-3 text-sm text-primary">{message}</p> : null}
    </Panel>
  )
}

function NumberField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{label}</span>
      <input inputMode="numeric" className={inputClass} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}

function IdSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { id: number; label: string }[]
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{label}</span>
      {options.length ? (
        <select className={inputClass} value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select</option>
          {options.filter((option) => option.id > 0).map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input inputMode="numeric" className={inputClass} value={value} onChange={(e) => onChange(e.target.value)} placeholder="Id" />
      )}
    </label>
  )
}
