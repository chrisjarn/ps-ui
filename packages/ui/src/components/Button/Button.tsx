import * as React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { spring } from '@/lib/transitions'

const buttonVariants = cva(
  // Base — shared across all variants
  [
    'inline-flex items-center justify-center gap-2',
    'font-semibold leading-none select-none',
    'cursor-pointer outline-none',
    'transition-colors',
    // Minimum hit area (Jakub principle)
    'min-h-[44px] min-w-[44px]',
    // Focus ring
    'focus-visible:shadow-ps-focus',
    // Disabled
    'disabled:opacity-50 disabled:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-ps-primary text-ps-primary-text',
          'hover:bg-ps-primary-hover',
          // Border matches ConnectKit pattern
          'border border-transparent',
        ],
        secondary: [
          'text-ps-text border',
          'border-[var(--ps-body-divider-strong)]',
          'bg-[var(--ps-secondary-button-background)]',
          'hover:bg-[var(--ps-secondary-button-hover-background)]',
        ],
        ghost: [
          'text-ps-text bg-transparent border border-transparent',
          'hover:bg-[rgba(255,255,255,0.06)]',
        ],
        danger: [
          'bg-ps-danger text-white border border-transparent',
          'hover:bg-[#dc2626]',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-[13px] rounded-ps-xs',
        md: 'h-11 px-5 text-[15px] rounded-ps-sm',
        lg: 'h-[52px] px-6 text-[17px] rounded-ps',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode
  /** Disable scale-on-press (Jakub principle: add `static` prop for distracting contexts) */
  static?: boolean
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      static: isStatic,
      isLoading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        // Scale on press — always 0.96, never smaller (Jakub principle)
        whileTap={isStatic || disabled ? undefined : { scale: 0.96 }}
        transition={spring.stiff}
        {...props}
      >
        {isLoading ? (
          <>
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden="true"
            />
            {children}
          </>
        ) : (
          children
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
