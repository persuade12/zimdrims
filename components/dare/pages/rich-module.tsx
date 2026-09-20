'use client'

import { Panel, Chip, ProgressRow } from '@/components/dare/ui'
import {
  DashboardChrome,
  DataTable,
  DonutChart,
  FeedList,
  MiniBars,
  Pipeline,
  QuickActions,
} from '@/components/dare/dashboard/kit'
import { SituationMap } from '@/components/dare/dashboard/situation-map'
import type { RichModuleConfig } from '@/lib/concept/types'

export type { RichModuleConfig }

export function RichModulePage({ config }: { config: RichModuleConfig }) {
  const c = config

  return (
    <DashboardChrome
      title={c.title}
      subtitle={c.subtitle}
      breadcrumbs={c.breadcrumbs}
      kpis={c.kpis}
      primaryAction={c.primaryAction ?? 'Generate Report'}
      filters={c.filters}
    >
      {(c.map || c.donut || c.statusCards) && (
        <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
          {c.map ? (
            <SituationMap
              title={c.map.title}
              provinceColors={c.map.provinceColors}
              markers={c.map.markers}
              heightClassName="min-h-[20rem] h-[min(46vh,28rem)]"
              legend={c.map.legend}
            />
          ) : (
            <div className="space-y-4">
              {c.pipeline ? (
                <Panel title={c.pipeline.title}>
                  <Pipeline steps={c.pipeline.steps} />
                </Panel>
              ) : null}
              {c.progress ? (
                <Panel title={c.progress.title}>
                  <div className="space-y-3">
                    {c.progress.items.map((item) => (
                      <ProgressRow key={item.label} label={item.label} pct={item.pct} />
                    ))}
                  </div>
                </Panel>
              ) : null}
              {c.bars && !c.map ? (
                <Panel title={c.bars.title}>
                  <MiniBars items={c.bars.items} />
                </Panel>
              ) : null}
            </div>
          )}
          <div className="space-y-4">
            {c.donut ? (
              <Panel title={c.donut.title}>
                <DonutChart
                  centerValue={c.donut.centerValue}
                  centerLabel={c.donut.centerLabel}
                  segments={c.donut.segments}
                />
              </Panel>
            ) : null}
            {c.statusCards?.length ? (
              <Panel title="Operational Snapshot">
                <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                  {c.statusCards.map((card) => (
                    <div key={card.label} className="rounded-lg border border-border bg-secondary/40 px-2 py-3">
                      <p className="font-display text-lg font-extrabold text-foreground">{card.value}</p>
                      <p className="text-muted-foreground">{card.label}</p>
                    </div>
                  ))}
                </div>
              </Panel>
            ) : null}
          </div>
        </div>
      )}

      {!c.map && !c.donut && !c.statusCards && c.pipeline ? (
        <Panel title={c.pipeline.title}>
          <Pipeline steps={c.pipeline.steps} />
        </Panel>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        {c.map && c.progress ? (
          <Panel title={c.progress.title}>
            <div className="space-y-3">
              {c.progress.items.map((item) => (
                <ProgressRow key={item.label} label={item.label} pct={item.pct} />
              ))}
            </div>
          </Panel>
        ) : null}
        {c.map && c.bars ? (
          <Panel title={c.bars.title}>
            <MiniBars items={c.bars.items} />
          </Panel>
        ) : null}
        {!c.map && !c.donut && !c.statusCards && c.progress ? (
          <Panel title={c.progress.title}>
            <div className="space-y-3">
              {c.progress.items.map((item) => (
                <ProgressRow key={item.label} label={item.label} pct={item.pct} />
              ))}
            </div>
          </Panel>
        ) : null}
        {!c.map && !c.donut && !c.statusCards && c.bars ? (
          <Panel title={c.bars.title}>
            <MiniBars items={c.bars.items} />
          </Panel>
        ) : null}
        {c.list ? (
          <Panel title={c.list.title}>
            <ul className="space-y-2">
              {c.list.items.map((item) => (
                <li key={item.label} className="flex items-center justify-between gap-2 text-[12px]">
                  <span>{item.label}</span>
                  {item.badge ? <Chip tone="gold">{item.badge}</Chip> : null}
                </li>
              ))}
            </ul>
          </Panel>
        ) : null}
        {c.table ? (
          <Panel
            title={c.table.title}
            className={
              c.list || (c.map && (c.progress || c.bars)) || (!c.map && (c.progress || c.bars))
                ? undefined
                : 'lg:col-span-2'
            }
          >
            <DataTable columns={c.table.columns} rows={c.table.rows} />
          </Panel>
        ) : null}
      </div>

      {(c.feed || c.actions || c.notes) && (
        <div className="grid gap-4 lg:grid-cols-3">
          {c.feed ? (
            <Panel title={c.feed.title} className={c.actions || c.notes ? 'lg:col-span-2' : 'lg:col-span-3'}>
              <FeedList items={c.feed.items} />
            </Panel>
          ) : null}
          {c.actions ? (
            <Panel title="Quick Actions">
              <QuickActions actions={c.actions} />
            </Panel>
          ) : null}
          {c.notes?.length && !c.actions ? (
            <Panel title="Notes">
              <ul className="space-y-2 text-[12px] text-muted-foreground">
                {c.notes.map((note) => (
                  <li key={note}>• {note}</li>
                ))}
              </ul>
            </Panel>
          ) : null}
        </div>
      )}
      {c.notes?.length && c.actions ? (
        <Panel title="Operational Notes">
          <ul className="grid gap-2 text-[12px] text-muted-foreground sm:grid-cols-2">
            {c.notes.map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>
        </Panel>
      ) : null}
    </DashboardChrome>
  )
}

export function createRichModulePage(config: RichModuleConfig) {
  return function GeneratedRichModulePage() {
    return <RichModulePage config={config} />
  }
}
