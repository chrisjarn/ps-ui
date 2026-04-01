import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds backdrop blur for glass effect */
  glass?: boolean
  /** Removes the border */
  borderless?: boolean
}

export function Card({ className, glass, borderless, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        'rounded-ps',
        'bg-[var(--ps-body-background-secondary)]',
        !borderless && 'border border-[var(--ps-body-divider)]',
        glass && 'backdrop-blur-ps bg-[rgba(34,35,41,0.7)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col gap-1 px-5 pt-5', className)}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-[17px] font-semibold leading-tight text-ps-text', className)}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-[13px] text-ps-muted', className)}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-5 py-4', className)} {...props} />
  )
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center px-5 pb-5 pt-2',
        'border-t border-[var(--ps-body-divider)] mt-2',
        className
      )}
      {...props}
    />
  )
}
