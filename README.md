# ZIM-DRIMS

Zimbabwe Integrated Multi-Hazard Disaster Risk Management System — a Next.js platform for the Department of Civil Protection, Government of Zimbabwe.

**Saving Lives, Protecting Livelihoods, Building Resilience**

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the **public portal**.

Staff ops platform: [http://localhost:3000/ops](http://localhost:3000/ops) (login required).

Ops login uses the ZIMDRIMS registry (`select_login`) unless `ZIMDRIMS_AUTH_MODE=demo`. Copy `.env.example` to `.env.local` to choose the mode. The browser talks only to this Next.js app; the app calls `https://dcp.dikarabo.co.za`.

### Demo ops credentials

Used when `ZIMDRIMS_AUTH_MODE=demo`. Also shown on the login page at `/ops/login` in that mode.

| Username | Password | Role |
|----------|----------|------|
| `wonder.mufunda` | `Dcp@2026` | DCP Administrator |
| `neoc.officer` | `Ops@2026` | NEOC Officer |

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

Concept reference designs are in `public/concept/`. Alerts, forecasts, and other operational dashboards still use static datasets. Provinces, districts, hazards, command users, anticipatory-action contacts, and hazard items are loaded from the ZIMDRIMS registry when it responds, and fall back to the static lists when it does not.

**Analytics partner:** Centre for Humanitarian Analytics (CHA) — logo at `public/cha.png`.
