import { notFound } from 'next/navigation'
import { Chip, Panel, ProgressRow, StatTile } from '@/components/dare/ui'
import { FamilyTree } from '@/components/dare/family-tree'
import { InsightList, PageHeader, SimpleTable } from '@/components/dare/page-primitives'
import { leaderProfiles, leaderRegister } from '@/lib/pages/leaders'
import { Crown, Home, ShieldCheck, Star } from 'lucide-react'

export default async function LeaderProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const profile = leaderProfiles[id]
  const record = leaderRegister.find((r) => r.id === id)

  if (!profile && !record) notFound()

  const name = profile?.name ?? record!.name
  const title = profile?.title ?? `${record!.role} — ${record!.area}`
  const location = profile?.location ?? `${record!.area} · ${record!.district} · ${record!.province}`

  return (
    <>
      <PageHeader title={title} subtitle={location} meta={`ID ${id} · Verified traditional leader`} />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,10rem),1fr))] gap-3">
        <StatTile icon={Crown} value={`${profile?.years ?? record?.years ?? 0}`} label="Years in office" color="#16794a" />
        <StatTile icon={Home} value={`${profile?.households ?? '—'}`} label="Households served" color="#2563eb" />
        <StatTile icon={ShieldCheck} value={profile?.status ?? record?.status ?? 'Active'} label="Community status" color="#0f766e" />
        <StatTile icon={Star} value={profile?.rating ?? '—'} label="Leadership rating" color="#e6a70a" />
      </div>

      {profile ? (
        <>
          <Panel title="Family tree & succession pathway">
            <FamilyTree generations={profile.familyTree} />
          </Panel>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <Panel title="Family statistics">
              <div className="grid grid-cols-2 gap-3">
                {profile.family.map((f) => (
                  <div key={f.label} className="rounded-lg border border-border bg-background p-3">
                    <p className="font-display text-lg font-extrabold">{f.value}</p>
                    <p className="text-[11px] text-muted-foreground">{f.label}</p>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel title="Succession readiness" className="lg:col-span-2">
              <SimpleTable
                columns={[
                  { key: 'name', label: 'Candidate' },
                  { key: 'relation', label: 'Relation' },
                  { key: 'age', label: 'Age' },
                  { key: 'standing', label: 'Standing' },
                  { key: 'score', label: 'Score' },
                ]}
                rows={profile.successors.map((s) => ({
                  name: s.name,
                  relation: s.relation,
                  age: s.age,
                  standing: {
                    type: 'badge' as const,
                    label: s.standing,
                    tone: s.score >= 85 ? ('green' as const) : s.score >= 70 ? ('gold' as const) : ('muted' as const),
                  },
                  score: { type: 'progress' as const, pct: s.score },
                }))}
              />
            </Panel>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Panel title="Succession compliance">
              <ul className="space-y-2">
                {profile.compliance.map((c) => (
                  <li key={c.label} className="flex items-center justify-between gap-2 text-sm">
                    <span>{c.label}</span>
                    <Chip tone={c.done ? 'green' : 'gold'}>{c.done ? 'Complete' : 'Pending'}</Chip>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel title="AI Tarisai succession analysis">
              <InsightList items={profile.insights} />
              <div className="mt-4">
                <ProgressRow label="Readiness" pct={84} />
              </div>
            </Panel>
          </div>
        </>
      ) : (
        <Panel title="Profile summary">
          <p className="text-sm text-muted-foreground">
            Full digital profiles are available for sample leaders Chief Makoni (CHR-MAK-001), Headman Chimwewe
            (HDN-CHM-014), and Bvepfepfe Onias (VH-CHT-087). This record is part of the dummy national register.
          </p>
        </Panel>
      )}
    </>
  )
}
