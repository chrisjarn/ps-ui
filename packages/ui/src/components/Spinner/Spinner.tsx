import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: number
}

/**
 * Spinner — ConnectKit-inspired rotating arc.
 * Uses SVG stroke animation for GPU-composited rendering.
 */
export function Spinner({ size = 20, className, style, ...props }: SpinnerProps) {
  const strokeWidth = Math.max(1.5, size / 12)
  const r = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * r

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={cn('animate-spin', className)}
      style={{ animationDuration: '700ms', ...style }}
      aria-hidden="true"
      role="status"
      {...props}
    >
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        opacity={0.15}
      />
      {/* Arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * 0.75}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  )
}
