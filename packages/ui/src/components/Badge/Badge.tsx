import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-medium leading-none select-none',
  {
    variants: {
      variant: {
        default: 'bg-[rgba(255,255,255,0.08)] text-ps-text',
        primary: 'bg-[var(--ps-brand-tint-bg)] text-[var(--ps-brand-tint-text)]',
        success: 'bg-[rgba(16,185,129,0.12)] text-ps-valid',
        warning: 'bg-[rgba(245,158,11,0.12)] text-ps-warning',
        danger: 'bg-[rgba(239,68,68,0.12)] text-ps-danger',
        outline: 'border border-[var(--ps-body-divider-strong)] text-ps-muted',
      },
      size: {
        sm: 'text-[11px] px-2 py-0.5 rounded-[6px]',
        md: 'text-[13px] px-2.5 py-1 rounded-[8px]',
        lg: 'text-[15px] px-3 py-1.5 rounded-[10px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Optional dot indicator */
  dot?: boolean
}

export function Badge({ className, variant, size, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            'block h-1.5 w-1.5 rounded-full',
            variant === 'success' && 'bg-ps-valid',
            variant === 'warning' && 'bg-ps-warning',
            variant === 'danger' && 'bg-ps-danger',
            variant === 'primary' && 'bg-[var(--ps-brand-tint-text)]',
            (variant === 'default' || variant === 'outline') && 'bg-ps-muted',
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}
