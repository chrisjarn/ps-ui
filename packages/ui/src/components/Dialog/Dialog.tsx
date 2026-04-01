import * as React from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { spring, tween } from '@/lib/transitions'

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </RadixDialog.Root>
  )
}

export const DialogTrigger = RadixDialog.Trigger

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled open state — required for AnimatePresence to work */
  open?: boolean
  onClose?: () => void
  /** Max width of the dialog panel */
  maxWidth?: number
}

export function DialogContent({
  open,
  onClose,
  maxWidth = 400,
  className,
  children,
  ...props
}: DialogContentProps) {
  return (
    <AnimatePresence>
      {open && (
        <RadixDialog.Portal forceMount>
          {/* Overlay */}
          <RadixDialog.Overlay asChild>
            <motion.div
              className="fixed inset-0 z-50"
              style={{ backgroundColor: 'var(--ps-overlay-background)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={tween.normal}
              onClick={onClose}
            />
          </RadixDialog.Overlay>

          {/* Panel */}
          <RadixDialog.Content
            asChild
            onEscapeKeyDown={onClose}
            onInteractOutside={onClose}
          >
            <motion.div
              className={cn(
                'fixed left-1/2 top-1/2 z-50 w-full',
                'origin-center outline-none',
                className
              )}
              style={{ maxWidth, x: '-50%', y: '-50%' }}
              initial={{ opacity: 0, scale: 0.95, y: '-46%' }}
              animate={{ opacity: 1, scale: 1, y: '-50%' }}
              exit={{ opacity: 0, scale: 0.95, y: '-46%' }}
              transition={spring.gentle}
              {...(props as React.ComponentProps<typeof motion.div>)}
            >
              <div
                className={cn(
                  'relative overflow-hidden',
                  'rounded-ps',
                  'bg-[var(--ps-modal-background)]',
                  'border border-[rgba(255,255,255,0.06)]',
                  'shadow-ps',
                  'mx-4'
                )}
              >
                {children}
              </div>
            </motion.div>
          </RadixDialog.Content>
        </RadixDialog.Portal>
      )}
    </AnimatePresence>
  )
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col gap-1.5 px-6 pt-6', className)} {...props} />
  )
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <RadixDialog.Title asChild>
      <h2
        className={cn('text-[17px] font-semibold text-ps-text leading-tight', className)}
        {...props}
      />
    </RadixDialog.Title>
  )
}

export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <RadixDialog.Description asChild>
      <p className={cn('text-[14px] text-ps-muted leading-relaxed', className)} {...props} />
    </RadixDialog.Description>
  )
}

export function DialogBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-6 py-4', className)} {...props} />
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-2',
        'px-6 pb-6 pt-2',
        className
      )}
      {...props}
    />
  )
}

export function DialogClose({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <RadixDialog.Close asChild>
      <button
        className={cn(
          'absolute right-4 top-4',
          'flex h-7 w-7 items-center justify-center rounded-[8px]',
          'text-ps-muted hover:text-ps-text hover:bg-[rgba(255,255,255,0.06)]',
          'transition-colors duration-150',
          'outline-none focus-visible:shadow-ps-focus',
          className
        )}
        aria-label="Close"
        {...props}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
    </RadixDialog.Close>
  )
}
