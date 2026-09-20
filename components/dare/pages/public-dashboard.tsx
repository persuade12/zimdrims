'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AlertTriangle, Bell, CheckCircle2, MapPin, Phone, Shield, Users } from 'lucide-react'
import { Panel, Chip, ProgressRow } from '@/components/dare/ui'
import { DonutChart, FeedList, MiniBars, QuickActions } from '@/components/dare/dashboard/kit'
import { SituationMap } from '@/components/dare/dashboard/situation-map'
import { incidentMarkers, responseProvinceColors, riskColors, kpi } from '@/lib/concept-data'
import { KpiRow } from '@/components/dare/page-primitives'

const riskLegend = [
  { color: '#d64545', label: 'Critical' },
  { color: '#ea580c', label: 'Major' },
  { color: '#e6a70a', label: 'Watch' },
  { color: '#86efac', label: 'Low' },
]

function PublicHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-5 space-y-1">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#16794a]">Public Information</p>
      <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{title}</h1>
      <p className="max-w-3xl text-sm text-muted-foreground">{subtitle}</p>
      <p className="text-[11px] text-muted-foreground">As of 25 Aug 2026 · 15:48 CAT · Demo dataset</p>
    </div>
  )
}

export function PublicHomePage() {
  return (
    <div className="space-y-5">
      <PublicHeader
        title="Stay Informed. Stay Prepared."
        subtitle="Official multi-hazard information from the Department of Civil Protection for communities across Zimbabwe."
      />
      <KpiRow
        items={[
          kpi('14', 'Active Alerts', 'Nationwide', Bell, riskColors.critical),
          kpi('02', 'Critical', 'Take action now', AlertTriangle, riskColors.critical),
          kpi('312K', 'People Advised', 'At elevated risk', Users, riskColors.info),
          kpi('OPERATIONAL', 'National EOC', 'Monitoring 24/7', Shield, riskColors.ok),
        ]}
      />
      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <SituationMap
          title="Multi-Hazard Public Risk Map"
          provinceColors={responseProvinceColors}
          markers={incidentMarkers}
          heightClassName="min-h-[18rem] h-[min(42vh,26rem)]"
          legend={riskLegend}
        />
        <Panel title="What You Should Know">
          <FeedList
            items={[
              { title: 'Flood warning along Save River basin — move to higher ground if advised', meta: 'Critical · Mashonaland West', tone: 'alert' },
              { title: 'Severe weather watch — Mutare District', meta: 'Warning · Manicaland', tone: 'new' },
              { title: 'Drought outlook — conserve water in Matabeleland North', meta: 'Watch · Ongoing', tone: 'info' },
            ]}
          />
          <div className="mt-4">
            <QuickActions
              actions={[
                { label: 'View Active Alerts', href: '/alerts' },
                { label: 'Report an Incident', href: '/report-incident' },
                { label: 'Preparedness Tips', href: '/preparedness' },
                { label: 'Public Resources', href: '/resources' },
              ]}
            />
          </div>
        </Panel>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { title: 'Current Situation', href: '/situation', body: 'National overview of active hazards and response posture.' },
          { title: 'Public Statistics', href: '/statistics', body: 'Transparent figures on alerts, assistance and recovery.' },
          { title: 'Recovery & Resilience', href: '/recovery', body: 'How communities are rebuilding and reducing future risk.' },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border border-border bg-card p-4 transition hover:border-[#16794a]/40 hover:shadow-sm"
          >
            <h2 className="font-display text-sm font-bold text-foreground">{card.title}</h2>
            <p className="mt-1 text-[12px] text-muted-foreground">{card.body}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function PublicAlertsPage() {
  return (
    <div className="space-y-5">
      <PublicHeader title="Active Alerts" subtitle="Official alerts and advisories currently in force." />
      <KpiRow
        items={[
          kpi('02', 'Critical', 'Immediate action', AlertTriangle, riskColors.critical),
          kpi('03', 'Warning', 'Take action', AlertTriangle, riskColors.major),
          kpi('04', 'Watch', 'Be prepared', Bell, riskColors.active),
          kpi('05', 'Advisory', 'Stay informed', CheckCircle2, riskColors.info),
        ]}
      />
      <Panel title="Alert List">
        <ul className="divide-y divide-border">
          {[
            ['Flood Warning — Save River Basin', 'Critical', 'Mashonaland West', '24–48 hrs'],
            ['Severe Weather — Mutare', 'Warning', 'Manicaland', '12–24 hrs'],
            ['Drought Watch — Matabeleland North', 'Watch', 'Matabeleland North', '1–3 months'],
            ['Wildfire Advisory — Shurugwi', 'Advisory', 'Midlands', '72 hrs'],
            ['Cholera Health Alert — Gutu', 'Warning', 'Masvingo', 'Ongoing'],
          ].map(([title, level, place, window]) => (
            <li key={title} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
              <div>
                <p className="font-semibold text-foreground">{title}</p>
                <p className="text-[11px] text-muted-foreground">
                  {place} · Impact window {window}
                </p>
              </div>
              <Chip tone={level === 'Critical' ? 'danger' : level === 'Warning' ? 'gold' : 'info'}>{level}</Chip>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}

export function PublicRiskMapPage() {
  return (
    <div className="space-y-5">
      <PublicHeader title="Multi-Hazard Risk Map" subtitle="Province-level view of current multi-hazard risk for the public." />
      <SituationMap
        title="Public Risk Map"
        provinceColors={responseProvinceColors}
        markers={incidentMarkers}
        heightClassName="min-h-[22rem] h-[min(60vh,36rem)]"
        legend={riskLegend}
      />
      <Panel title="How to read this map">
        <p className="text-sm text-muted-foreground">
          Colours indicate relative risk. Follow local authority instructions for your ward. This map is a public summary and
          does not replace official evacuation orders.
        </p>
      </Panel>
    </div>
  )
}

export function PublicSituationPage() {
  return (
    <div className="space-y-5">
      <PublicHeader title="Current Situation" subtitle="National summary of hazards, impacts and public guidance." />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Situation Snapshot">
          <div className="space-y-3">
            <ProgressRow label="Flood response" pct={68} />
            <ProgressRow label="Drought monitoring" pct={72} />
            <ProgressRow label="Health surveillance" pct={54} />
            <ProgressRow label="Public messaging" pct={81} />
          </div>
        </Panel>
        <Panel title="Guidance">
          <FeedList
            items={[
              { title: 'Keep emergency contacts ready and charged phones', meta: 'Preparedness', tone: 'info' },
              { title: 'Do not cross flooded bridges or low-lying roads', meta: 'Flood safety', tone: 'alert' },
              { title: 'Report cholera symptoms early to nearest clinic', meta: 'Health', tone: 'new' },
            ]}
          />
        </Panel>
      </div>
    </div>
  )
}

export function PublicStatisticsPage() {
  return (
    <div className="space-y-5">
      <PublicHeader title="Public Statistics" subtitle="Transparent national figures for awareness and accountability." />
      <KpiRow
        items={[
          kpi('856K', 'People Affected', 'Current cycle', Users, riskColors.info),
          kpi('268K', 'People Assisted', 'Response', CheckCircle2, riskColors.ok),
          kpi('72K', 'Sheltered', 'Safe sites', MapPin, '#7c3aed'),
          kpi('14', 'Active Alerts', 'All hazards', Bell, riskColors.critical),
        ]}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Alerts by Level">
          <DonutChart
            centerValue="14"
            centerLabel="Alerts"
            segments={[
              { label: 'Critical', value: 2, color: riskColors.critical },
              { label: 'Warning', value: 3, color: riskColors.major },
              { label: 'Watch', value: 4, color: riskColors.active },
              { label: 'Advisory', value: 5, color: riskColors.info },
            ]}
          />
        </Panel>
        <Panel title="Assistance Coverage">
          <MiniBars
            items={[
              { label: 'Food', value: 72 },
              { label: 'Water', value: 64 },
              { label: 'Shelter', value: 58 },
              { label: 'Health', value: 61 },
            ]}
          />
        </Panel>
      </div>
    </div>
  )
}

export function PublicRecoveryPage() {
  return (
    <div className="space-y-5">
      <PublicHeader
        title="Recovery & Resilience"
        subtitle="How communities are recovering and building back better after disasters."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Recovery Progress">
          <div className="space-y-3">
            <ProgressRow label="Housing repairs" pct={54} />
            <ProgressRow label="Infrastructure" pct={46} />
            <ProgressRow label="Livelihoods" pct={62} />
            <ProgressRow label="Community resilience" pct={71} />
          </div>
        </Panel>
        <Panel title="Community Actions">
          <FeedList
            items={[
              { title: 'Watershed restoration underway in Chipinge', meta: 'Resilience', tone: 'info' },
              { title: 'Housing repair phase 1 — Buhera', meta: 'Recovery', tone: 'new' },
              { title: 'School safety plans updated in Makoni', meta: 'Preparedness', tone: 'info' },
            ]}
          />
        </Panel>
      </div>
    </div>
  )
}

export function PublicPreparednessPage() {
  return (
    <div className="space-y-5">
      <PublicHeader title="Preparedness & Safety" subtitle="Practical steps families and communities can take before hazards strike." />
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ['Floods', 'Know evacuation routes, move valuables high, never drive through floodwater.'],
          ['Drought', 'Store water safely, protect livestock feed, follow district water schedules.'],
          ['Cyclone / Storms', 'Secure roofs, prepare a go-bag, heed evacuation orders early.'],
          ['Fire', 'Clear firebreaks, store fuel safely, report veld fires immediately.'],
          ['Health', 'Use safe water, practice hygiene, seek care early for cholera symptoms.'],
          ['General', 'Keep DCP / local authority contacts; share alerts with neighbours.'],
        ].map(([title, body]) => (
          <Panel key={title} title={title}>
            <p className="text-sm text-muted-foreground">{body}</p>
          </Panel>
        ))}
      </div>
    </div>
  )
}

export function PublicReportsPage() {
  return (
    <div className="space-y-5">
      <PublicHeader title="Public Reports" subtitle="Publicly releasable bulletins and situation summaries." />
      <Panel title="Available Reports">
        <ul className="divide-y divide-border text-sm">
          {[
            ['Public Weather & Hazard Bulletin', '25 Aug 2026', 'PDF'],
            ['Community Flood Advisory — Save Basin', '24 Aug 2026', 'PDF'],
            ['Weekly National Summary (Public)', '22 Aug 2026', 'PDF'],
            ['Drought Outlook — Southern Provinces', '18 Aug 2026', 'PDF'],
          ].map(([title, date, type]) => (
            <li key={title} className="flex items-center justify-between gap-3 py-3">
              <div>
                <p className="font-semibold">{title}</p>
                <p className="text-[11px] text-muted-foreground">{date}</p>
              </div>
              <span className="rounded-md bg-secondary px-2 py-1 text-[10px] font-bold">{type}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}

export function PublicResourcesPage() {
  return (
    <div className="space-y-5">
      <PublicHeader title="Public Resources" subtitle="Contacts, hotlines and preparedness materials." />
      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="Emergency Contacts">
          <ul className="space-y-3 text-sm">
            {[
              ['DCP EOC Hotline', '+263 242 700 000'],
              ['Met Services', '+263 242 778 000'],
              ['WhatsApp Alerts', '+263 77 000 0000'],
              ['Helpdesk Email', 'helpdesk@dcp.gov.zw'],
            ].map(([label, value]) => (
              <li key={label} className="flex items-center justify-between gap-2 border-b border-border/70 pb-2">
                <span className="text-muted-foreground">{label}</span>
                <span className="inline-flex items-center gap-1 font-semibold">
                  <Phone className="size-3.5 text-[#16794a]" />
                  {value}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Downloads">
          <QuickActions
            actions={[
              { label: 'Household Preparedness Checklist' },
              { label: 'Flood Safety Flyer' },
              { label: 'Drought Water Tips' },
              { label: 'Cholera Prevention Card' },
            ]}
          />
        </Panel>
      </div>
    </div>
  )
}

export function PublicIncidentReportPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="space-y-5">
      <PublicHeader
        title="Report an Incident"
        subtitle="Share what you are seeing with DCP. This demo form does not transmit live data."
      />
      {submitted ? (
        <Panel title="Thank you">
          <div className="flex flex-col items-start gap-3 py-4">
            <CheckCircle2 className="size-10 text-[#16794a]" />
            <p className="text-sm text-foreground">
              Your incident report was recorded in this demo. In production, it would route to the Call Centre / EOC queue.
            </p>
            <button
              type="button"
              className="rounded-lg bg-[#16794a] px-4 py-2 text-sm font-semibold text-white"
              onClick={() => setSubmitted(false)}
            >
              Submit another
            </button>
          </div>
        </Panel>
      ) : (
        <Panel title="Incident Details">
          <form
            className="grid gap-3 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
          >
            <label className="space-y-1 text-[12px] sm:col-span-2">
              <span className="font-semibold">What happened?</span>
              <textarea
                required
                className="min-h-24 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                placeholder="Describe the incident..."
              />
            </label>
            <label className="space-y-1 text-[12px]">
              <span className="font-semibold">Hazard type</span>
              <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" defaultValue="Flood">
                {['Flood', 'Weather', 'Fire', 'Health', 'Drought', 'Other'].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
            <label className="space-y-1 text-[12px]">
              <span className="font-semibold">Province</span>
              <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" defaultValue="Manicaland">
                {['Harare', 'Bulawayo', 'Manicaland', 'Masvingo', 'Midlands', 'Mashonaland West'].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
            <label className="space-y-1 text-[12px]">
              <span className="font-semibold">District / area</span>
              <input required className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="e.g. Buhera" />
            </label>
            <label className="space-y-1 text-[12px]">
              <span className="font-semibold">Your phone (optional)</span>
              <input className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="+263 ..." />
            </label>
            <div className="sm:col-span-2">
              <button type="submit" className="rounded-lg bg-[#16794a] px-4 py-2.5 text-sm font-bold text-white hover:opacity-90">
                Submit Report
              </button>
            </div>
          </form>
        </Panel>
      )}
    </div>
  )
}
