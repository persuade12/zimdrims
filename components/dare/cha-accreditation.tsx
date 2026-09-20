'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

type ChaAccreditationProps = {
  className?: string
  /** compact = logo + short label; full = logo + partnership line */
  variant?: 'compact' | 'full'
  /** Light chip behind logo (better contrast on dark footers). */
  onDark?: boolean
}

export function ChaAccreditation({
  className,
  variant = 'compact',
  onDark = true,
}: ChaAccreditationProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2.5',
        variant === 'full' && 'flex-wrap sm:flex-nowrap',
        className,
      )}
    >
      <div
        className={cn(
          'flex shrink-0 items-center justify-center overflow-hidden rounded-md',
          onDark ? 'bg-white p-1 shadow-sm' : 'bg-black/5 p-1',
        )}
      >
        <Image
          src="/cha.png"
          alt="Centre for Humanitarian Analytics"
          width={120}
          height={40}
          className={cn(
            'h-7 w-auto object-contain sm:h-8',
            variant === 'full' && 'h-8 sm:h-9',
          )}
        />
      </div>
      <div className="min-w-0 leading-tight">
        <p
          className={cn(
            'text-[9px] font-bold uppercase tracking-wider',
            onDark ? 'text-white/55' : 'text-muted-foreground',
          )}
        >
          Analytics partner
        </p>
        {variant === 'full' ? (
          <p className={cn('text-[11px] font-semibold', onDark ? 'text-white/90' : 'text-foreground')}>
            Centre for Humanitarian Analytics (CHA)
          </p>
        ) : (
          <p className={cn('truncate text-[11px] font-semibold', onDark ? 'text-white/85' : 'text-foreground')}>
            CHA
          </p>
        )}
      </div>
    </div>
  )
}
