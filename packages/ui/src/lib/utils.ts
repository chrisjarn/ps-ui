import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes safely.
 * Handles conditional classes, conflicts, and deduplication.
 *
 * Usage: cn('base-class', condition && 'conditional', 'override')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
