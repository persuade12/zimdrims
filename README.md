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

Ops uses a dual-nav shell: top module switcher + context sidebar of that module’s submenus.

- **PUBLIC** (landing) — alerts, risk map, situation, statistics, preparedness, incident reporting, resources
- **Home / NEOC** — ops home and NEOC Executive Dashboard
- **Early Warning** — overview and hazard-specific dashboards
- **Risk Intelligence** — risk map/explorer, impact intelligence, needs assessment
- **Anticipation** — triggers, hazard anticipation, anticipatory action & financing
- **NET** — National Emergency Telecommunications preparedness
- **Readiness & Preparedness** — plans/SOPs, training, resources, readiness monitoring
- **Response** — emergency operations, incident command, logistics, shelters, search & rescue
- **Coordination** — 5W, partners, government, SADC regional, call centre
- **Recovery** — loss & damage, recovery progress, build back better, resilience
- **Knowledge** — reports, analytics, lessons learned, IKS, repository
- **Administration** — digital SOPs, users & roles, data sources, system admin

Concept reference designs are in `public/concept/`. All module routes use demo/static datasets. Auth is demo-only (cookie session).

**Analytics partner:** Centre for Humanitarian Analytics (CHA) — logo at `public/cha.png`.
