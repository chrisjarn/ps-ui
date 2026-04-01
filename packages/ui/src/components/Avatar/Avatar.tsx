import * as React from 'react'
import { cn } from '@/lib/utils'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeMap = {
  sm: 'h-7 w-7 text-[11px]',
  md: 'h-9 w-9 text-[13px]',
  lg: 'h-11 w-11 text-[15px]',
  xl: 'h-14 w-14 text-[17px]',
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  className,
  ...props
}: AvatarProps) {
  const [imgError, setImgError] = React.useState(false)
  const showFallback = !src || imgError

  return (
    <div
      className={cn(
        'relative inline-flex shrink-0 select-none overflow-hidden',
        'rounded-full',
        // Subtle outline (Jakub principle: images need outline for depth)
        'outline outline-1 outline-[rgba(255,255,255,0.1)] outline-offset-0',
        sizeMap[size],
        className
      )}
      {...props}
    >
      {!showFallback && (
        <img
          src={src}
          alt={alt ?? fallback ?? ''}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      )}
      {showFallback && (
        <div
          aria-label={alt ?? fallback}
          className={cn(
            'flex h-full w-full items-center justify-center',
            'bg-[var(--ps-body-background-tertiary)]',
            'text-ps-muted font-semibold'
          )}
        >
          {fallback ? getInitials(fallback) : '?'}
        </div>
      )}
    </div>
  )
}
