import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  valid?: boolean
  /** Icon rendered on the left side */
  leftIcon?: React.ReactNode
  /** Icon/element rendered on the right side */
  rightElement?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      hint,
      valid,
      leftIcon,
      rightElement,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId()
    const hasError = Boolean(error)
    const isValid = valid && !hasError

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-medium text-ps-muted"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3.5 flex items-center text-ps-muted pointer-events-none">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              error
                ? `${inputId}-error`
                : hint
                  ? `${inputId}-hint`
                  : undefined
            }
            className={cn(
              // Base layout
              'w-full h-11 outline-none',
              // Typography
              'text-[16px] text-ps-text placeholder:text-[var(--ps-input-placeholder-color)]',
              // Shape
              'rounded-[var(--ps-input-border-radius)]',
              // Padding
              leftIcon ? 'pl-10 pr-4' : 'px-4',
              rightElement ? 'pr-10' : '',
              // Background + border (default state)
              'bg-[var(--ps-input-background)]',
              'border border-[rgba(255,255,255,0.1)]',
              // Transition — specific properties only (Jakub principle)
              'transition-[background-color,border-color,box-shadow]',
              'duration-150',
              // Focus
              'focus:bg-[var(--ps-input-background-focus)]',
              'focus:border-[rgba(99,102,241,0.6)]',
              'focus:shadow-ps-focus',
              // Valid state
              isValid && 'border-[rgba(16,185,129,0.6)]',
              // Error state
              hasError && 'border-[rgba(239,68,68,0.6)]',
              // Disabled
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />

          {rightElement && (
            <span className="absolute right-3.5 flex items-center text-ps-muted">
              {rightElement}
            </span>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="text-[13px] text-ps-danger"
            role="alert"
          >
            {error}
          </p>
        )}

        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-[13px] text-ps-muted">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
