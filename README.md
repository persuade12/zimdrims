# ZIM-DRIMS

Zimbabwe Integrated Multi-Hazard Disaster Risk Management System — a Next.js platform for the Department of Civil Protection, Government of Zimbabwe.

**Saving Lives, Protecting Livelihoods, Building Resilience**

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the **public portal**.

Staff ops platform: [http://localhost:3000/ops](http://localhost:3000/ops) (login required).

### Demo ops credentials

| Username | Password | Role |
|----------|----------|------|
| `wonder.mufunda` | `Dcp@2026` | DCP Administrator |
| `neoc.officer` | `Ops@2026` | NEOC Officer |

Also shown on the login page at `/ops/login`.

## Platform Modules

- **PUBLIC** (landing) — alerts, risk map, situation, statistics, preparedness, incident reporting, resources
- **COMMAND** — National COP, Early Warning, Risk & Impact Intelligence, Needs Assessment
- **ANTICIPATION** — Trigger Monitor, Hazard Anticipation, Anticipatory Action & Financing
- **RESPONSE** — Emergency Operations, Incident Command, Logistics, Shelters, Search & Rescue
- **COORDINATION** — 5W, Partners, Government, SADC Regional, Call Centre
- **RECOVERY** — Loss & Damage, Recovery Progress, Build Back Better, Resilience
- **KNOWLEDGE** — Reports, Analytics, Lessons Learned, IKS, Knowledge Repository
- **ADMINISTRATION** — Digital SOPs, Users & Roles (Access Control demo), Data Sources, System Admin

Concept reference designs are in `public/concept/`. All module routes use demo/static datasets. Auth is demo-only (cookie session).
