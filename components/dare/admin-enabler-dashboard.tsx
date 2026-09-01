'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Donut } from '@/components/dare/donut'
import { Chip, Gauge, LegendItem, Panel } from '@/components/dare/ui'
import { KpiRow, PageHeader } from '@/components/dare/page-primitives'
import { cn } from '@/lib/utils'
import {
  adminEnablerKpis,
  adminEnablerTabs,
  correspondenceStats,
  documentStats,
  knowledgeRecords,
  pendingApprovals,
  recentCorrespondence,
  recentDocuments,
  recentRequests,
  requestsByCategory,
  successionStages,
  taskStats,
  upcomingTasks,
  workflowOverview,
  type AdminEnablerTabId,
} from '@/lib/pages/admin-enabler'

const statusTone = {
  Completed: 'green',
  'In Progress': 'info',
  Pending: 'gold',
  Overdue: 'danger',
  Verified: 'green',
  Published: 'green',
  Review: 'gold',
} as const

const priorityTone = {
  High: 'danger',
  Medium: 'gold',
  Low: 'muted',
} as const

export function AdminEnablerDashboard() {
  const [tab, setTab] = useState<AdminEnablerTabId>('overview')

  return (
    <>
      <PageHeader
        title="Digital Administrative Enabler"
        subtitle="Traditional Leaders Support Services Department — workflows, records and succession operations."
        meta="23 May 2025 · 10:45 AM"
      />

      <KpiRow items={adminEnablerKpis} />

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <div className="flex min-w-max gap-0.5 p-1.5">
          {adminEnablerTabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-semibold transition-colors',
                tab === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
              )}
            >
              {item.label}
              {'badge' in item && item.badge ? (
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase',
                    tab === item.id ? 'bg-white/20 text-white' : 'bg-primary/15 text-primary',
                  )}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {tab === 'overview' ? <OverviewTab /> : null}
      {tab === 'requests' ? <RequestsTab /> : null}
      {tab === 'documents' ? <DocumentsTab /> : null}
      {tab === 'correspondence' ? <CorrespondenceTab /> : null}
      {tab === 'knowledge' ? <KnowledgeTab /> : null}
      {tab === 'succession' ? <SuccessionTab /> : null}
      {tab === 'hr' || tab === 'assets' || tab === 'finance' || tab === 'performance' ? (
        <Panel title={adminEnablerTabs.find((t) => t.id === tab)?.label}>
          <p className="text-sm text-muted-foreground">
            Module workspace for {adminEnablerTabs.find((t) => t.id === tab)?.label?.toLowerCase()} is connected to
            TLSS registers. Sample operational views are available on Overview, Requests, Documents, Correspondence,
            Knowledge and Succession tabs.
          </p>
        </Panel>
      ) : null}
    </>
  )
}

function OverviewTab() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <Panel title="Administrative Workflow Overview">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Donut size={120} segments={workflowOverview.map((s) => ({ value: s.value, color: s.color }))}>
              <span className="font-display text-lg font-extrabold">100%</span>
              <span className="text-[10px] text-muted-foreground">Load</span>
            </Donut>
            <div className="w-full space-y-1.5">
              {workflowOverview.map((s) => (
                <LegendItem key={s.label} color={s.color} label={s.label} value={`${s.value}%`} />
              ))}
            </div>
          </div>
        </Panel>

        <Panel title="Requests by Category">
          <ul className="space-y-2.5">
            {requestsByCategory.map((r) => (
              <li key={r.label} className="flex items-center gap-2.5">
                <span
                  className="flex size-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${r.color}1a`, color: r.color }}
                >
                  <r.icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[12px] font-medium text-foreground">{r.label}</p>
                    <p className="text-[12px] font-semibold tabular-nums text-foreground">{r.count}</p>
                  </div>
                  <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full" style={{ width: `${r.pct}%`, backgroundColor: r.color }} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Pending Approvals">
          <ul className="space-y-2.5">
            {pendingApprovals.map((item) => (
              <li key={item.title} className="rounded-lg border border-border bg-background px-2.5 py-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[12px] font-medium leading-snug text-foreground">{item.title}</p>
                  <Chip tone={priorityTone[item.priority]}>{item.priority}</Chip>
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground">Waiting {item.age}</p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="SLA Performance">
          <div className="flex flex-col items-center justify-center py-2">
            <Gauge value={92} label="Compliance" color="#7c3aed" size={160} />
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Target 90% · National TLSS average
            </p>
          </div>
        </Panel>
      </div>

      <SuccessionTracker />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Panel
          title="Recent Requests"
          action={
            <button type="button" className="text-[11px] font-semibold text-primary hover:underline">
              View all
            </button>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-[10px] uppercase tracking-wide text-muted-foreground">
                  <th className="pb-2 font-bold">Reference</th>
                  <th className="pb-2 font-bold">Type</th>
                  <th className="pb-2 font-bold">Submitter</th>
                  <th className="pb-2 font-bold">Date</th>
                  <th className="pb-2 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((row) => (
                  <tr key={row.ref} className="border-b border-border last:border-0">
                    <td className="py-2 font-medium tabular-nums">{row.ref}</td>
                    <td className="py-2">{row.type}</td>
                    <td className="py-2 text-muted-foreground">{row.submitter}</td>
                    <td className="py-2 text-muted-foreground">{row.date}</td>
                    <td className="py-2">
                      <Chip tone={statusTone[row.status]}>{row.status}</Chip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Panel title="Document Management">
            <div className="grid grid-cols-2 gap-2">
              {documentStats.map((d) => (
                <div key={d.label} className="rounded-lg border border-border bg-background p-2.5">
                  <d.icon className="size-4" style={{ color: d.color }} />
                  <p className="mt-1.5 font-display text-base font-extrabold tabular-nums">{d.value}</p>
                  <p className="text-[10px] leading-snug text-muted-foreground">{d.label}</p>
                </div>
              ))}
            </div>
            <ul className="mt-3 space-y-2 border-t border-border pt-3">
              {recentDocuments.slice(0, 3).map((doc) => (
                <li key={doc.name} className="text-[12px]">
                  <p className="font-medium text-foreground">{doc.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {doc.type} · {doc.updated}
                  </p>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Tasks & Activities">
            <div className="grid grid-cols-2 gap-2">
              {taskStats.map((t) => (
                <div key={t.label} className="rounded-lg bg-secondary/60 px-2.5 py-2">
                  <p className="font-display text-base font-extrabold tabular-nums">{t.value}</p>
                  <p className="text-[10px] text-muted-foreground">{t.label}</p>
                </div>
              ))}
            </div>
            <p className="mb-2 mt-3 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              My Upcoming Tasks
            </p>
            <ul className="space-y-2">
              {upcomingTasks.map((task) => (
                <li key={task.title} className="flex items-start justify-between gap-2 text-[12px]">
                  <span className="text-foreground">{task.title}</span>
                  <Chip tone={task.tone}>{task.due}</Chip>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="Correspondence Tracker">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {correspondenceStats.map((c) => (
              <div key={c.label} className="rounded-lg border border-border bg-background p-2.5 text-center">
                <c.icon className="mx-auto size-4" style={{ color: c.color }} />
                <p className="mt-1 font-display text-base font-extrabold tabular-nums">{c.value}</p>
                <p className="text-[10px] text-muted-foreground">{c.label}</p>
              </div>
            ))}
          </div>
          <ul className="mt-3 space-y-2 border-t border-border pt-3">
            {recentCorrespondence.map((c) => (
              <li key={c.subject} className="text-[12px]">
                <p className="font-medium text-foreground">{c.subject}</p>
                <p className="text-[10px] text-muted-foreground">
                  {c.from} · {c.direction} · {c.date}
                </p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Indigenous Knowledge Systems (IKS)">
          <p className="mb-3 text-[12px] text-muted-foreground">
            Curated practices linked from Knowledge &amp; Circulars across IKS subcategories.
          </p>
          <ul className="space-y-2">
            {knowledgeRecords.slice(0, 3).map((k) => (
              <li key={k.title} className="rounded-lg border border-border bg-background px-2.5 py-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[12px] font-medium text-foreground">{k.title}</p>
                  <Chip tone={statusTone[k.status]}>{k.status}</Chip>
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {k.domain} · {k.custodian}
                </p>
              </li>
            ))}
          </ul>
          <Link
            href="/iks"
            className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-primary hover:underline"
          >
            Open IKS
            <ArrowRight className="size-3.5" />
          </Link>
        </Panel>
      </div>
    </>
  )
}

function SuccessionTracker() {
  return (
    <Panel title="Traditional Leadership Succession Protocols Tracker">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
        {successionStages.map((stage, index) => (
          <div key={stage.label} className="flex flex-1 items-stretch gap-2">
            <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-border bg-background p-3">
              <div
                className="mb-2 flex size-8 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{ backgroundColor: stage.color }}
              >
                {index + 1}
              </div>
              <p className="text-[12px] font-semibold leading-snug text-foreground">{stage.label}</p>
              <p className="mt-auto pt-2 font-display text-xl font-extrabold tabular-nums" style={{ color: stage.color }}>
                {stage.count}
              </p>
              <p className="text-[10px] text-muted-foreground">Active cases</p>
            </div>
            {index < successionStages.length - 1 ? (
              <ChevronRight className="mt-8 hidden size-4 shrink-0 text-muted-foreground lg:block" />
            ) : null}
          </div>
        ))}
      </div>
    </Panel>
  )
}

function RequestsTab() {
  return (
    <Panel title="Requests & Workflows register">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-[10px] uppercase tracking-wide text-muted-foreground">
              <th className="pb-2 font-bold">Reference</th>
              <th className="pb-2 font-bold">Type</th>
              <th className="pb-2 font-bold">Submitter</th>
              <th className="pb-2 font-bold">Date</th>
              <th className="pb-2 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentRequests.map((row) => (
              <tr key={row.ref} className="border-b border-border last:border-0">
                <td className="py-2.5 font-medium">{row.ref}</td>
                <td className="py-2.5">{row.type}</td>
                <td className="py-2.5 text-muted-foreground">{row.submitter}</td>
                <td className="py-2.5 text-muted-foreground">{row.date}</td>
                <td className="py-2.5">
                  <Chip tone={statusTone[row.status]}>{row.status}</Chip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}

function DocumentsTab() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.2fr]">
      <Panel title="Document volumes">
        <div className="grid grid-cols-2 gap-3">
          {documentStats.map((d) => (
            <div key={d.label} className="rounded-xl border border-border bg-background p-3">
              <d.icon className="size-5" style={{ color: d.color }} />
              <p className="mt-2 font-display text-2xl font-extrabold tabular-nums">{d.value}</p>
              <p className="text-[12px] text-muted-foreground">{d.label}</p>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Recent documents">
        <ul className="space-y-2.5">
          {recentDocuments.map((doc) => (
            <li key={doc.name} className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2.5">
              <div>
                <p className="text-sm font-medium text-foreground">{doc.name}</p>
                <p className="text-[11px] text-muted-foreground">{doc.type}</p>
              </div>
              <span className="text-[11px] text-muted-foreground">{doc.updated}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}

function CorrespondenceTab() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.4fr]">
      <Panel title="Correspondence volumes">
        <div className="grid grid-cols-2 gap-3">
          {correspondenceStats.map((c) => (
            <div key={c.label} className="rounded-xl border border-border bg-background p-3 text-center">
              <c.icon className="mx-auto size-5" style={{ color: c.color }} />
              <p className="mt-2 font-display text-2xl font-extrabold tabular-nums">{c.value}</p>
              <p className="text-[12px] text-muted-foreground">{c.label}</p>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Recent correspondence">
        <ul className="space-y-2.5">
          {recentCorrespondence.map((c) => (
            <li key={c.subject} className="rounded-lg border border-border px-3 py-2.5">
              <p className="text-sm font-medium text-foreground">{c.subject}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {c.from} · {c.direction} · {c.date}
              </p>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}

function KnowledgeTab() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
      <Panel title="Knowledge & Circulars">
        <ul className="space-y-2.5">
          {knowledgeRecords.map((k) => (
            <li key={k.title} className="rounded-lg border border-border px-3 py-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-foreground">{k.title}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {k.domain} · {k.custodian}
                  </p>
                </div>
                <Chip tone={statusTone[k.status]}>{k.status}</Chip>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="IKS access">
        <p className="text-sm text-muted-foreground">
          Full Indigenous Knowledge Systems (IKS) with subcategory filters and consent tracking lives under Reports
          &amp; Insights.
        </p>
        <Link
          href="/iks"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-95"
        >
          Open Indigenous Knowledge Systems (IKS)
          <ArrowRight className="size-4" />
        </Link>
      </Panel>
    </div>
  )
}

function SuccessionTab() {
  return <SuccessionTracker />
}
