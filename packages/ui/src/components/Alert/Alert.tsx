import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  'flex gap-3 rounded-ps-xs border p-4 text-[14px]',
  {
    variants: {
      variant: {
        info: 'bg-[var(--ps-brand-tint-bg-subtle)] border-[var(--ps-brand-tint-border)] text-[var(--ps-brand-tint-text-subtle)]',
        success: 'bg-[rgba(16,185,129,0.08)] border-[rgba(16,185,129,0.2)] text-ps-valid',
        warning: 'bg-[rgba(245,158,11,0.08)] border-[rgba(245,158,11,0.2)] text-ps-warning',
        danger: 'bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.2)] text-ps-danger',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
)

const icons: Record<string, React.ReactNode> = {
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 7v5M8 5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 8l2.5 2.5L11 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
      <path d="M8 2L14.5 14H1.5L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 6v4M8 11.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  danger: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string
}

export function Alert({ className, variant = 'info', title, children, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {icons[variant as string]}
      <div className="flex flex-col gap-1 min-w-0">
        {title && <p className="font-semibold leading-tight">{title}</p>}
        {children && (
          <div className="leading-relaxed opacity-90">{children}</div>
        )}
      </div>
    </div>
  )
}
