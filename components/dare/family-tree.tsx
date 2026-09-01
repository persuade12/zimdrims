import { Chip } from '@/components/dare/ui'
import type { FamilyTreeGeneration, FamilyTreeMember } from '@/lib/pages/leaders'
import { cn } from '@/lib/utils'

export function FamilyTree({ generations }: { generations: FamilyTreeGeneration[] }) {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto pb-2">
        <div className="mx-auto flex min-w-[36rem] flex-col items-center">
          {generations.map((generation, index) => (
            <div key={index} className="flex w-full flex-col items-center">
              {index > 0 ? <GenerationConnector memberCount={generation.members.length} /> : null}
              <div
                className={cn(
                  'flex flex-wrap items-start justify-center gap-3',
                  generation.members.length === 1 && 'justify-center',
                )}
              >
                {generation.members.map((member) => (
                  <TreeNode key={member.id} member={member} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-border pt-3 text-[10px] text-muted-foreground">
        <LegendItem label="Direct line" line="solid" />
        <LegendItem label="Sibling branch" line="dashed" />
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-primary" />
          Living
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-muted-foreground/40" />
          Deceased
        </span>
      </div>
    </div>
  )
}

function TreeNode({ member }: { member: FamilyTreeMember }) {
  const initials = member.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      className={cn(
        'flex w-[7.5rem] flex-col items-center rounded-xl border bg-background p-2.5 text-center shadow-sm sm:w-[8.5rem]',
        member.highlight
          ? 'border-2 border-primary bg-accent/30 shadow-md ring-2 ring-primary/20'
          : 'border-border',
        !member.living && 'opacity-75',
      )}
    >
      <div
        className={cn(
          'relative flex size-11 items-center justify-center rounded-full text-xs font-bold',
          member.highlight ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground',
        )}
      >
        {initials}
        <span
          className={cn(
            'absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-background',
            member.living ? 'bg-primary' : 'bg-muted-foreground/40',
          )}
        />
      </div>

      <p className="mt-2 line-clamp-2 text-[11px] font-bold leading-tight text-foreground">{member.name}</p>
      <p className="mt-0.5 text-[9px] text-muted-foreground">{member.relation}</p>
      {member.years ? (
        <p className="mt-0.5 text-[9px] tabular-nums text-muted-foreground">{member.years}</p>
      ) : null}
      {member.badge ? (
        <Chip tone={member.badge.tone} className="mt-1.5">
          {member.badge.label}
        </Chip>
      ) : null}
    </div>
  )
}

function GenerationConnector({ memberCount }: { memberCount: number }) {
  return (
    <div className="flex h-8 w-full flex-col items-center" aria-hidden>
      <div className="h-4 w-px bg-border" />
      {memberCount > 1 ? (
        <div className="relative h-px w-[min(100%,28rem)] bg-border">
          <div className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-border" />
        </div>
      ) : (
        <div className="h-px w-8 bg-border" />
      )}
    </div>
  )
}

function LegendItem({ label, line }: { label: string; line: 'solid' | 'dashed' }) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className={cn('h-0 w-5 border-t border-muted-foreground/60', line === 'dashed' && 'border-dashed')}
      />
      {label}
    </span>
  )
}
