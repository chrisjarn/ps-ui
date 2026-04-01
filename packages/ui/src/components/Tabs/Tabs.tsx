import * as React from 'react'
import * as RadixTabs from '@radix-ui/react-tabs'
import { motion, LayoutGroup } from 'framer-motion'
import { cn } from '@/lib/utils'
import { spring } from '@/lib/transitions'

export const TabsRoot = RadixTabs.Root

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique ID for the LayoutGroup — required when multiple Tabs are on the same page */
  layoutId?: string
}

export function TabsList({ className, layoutId = 'tabs', children, ...props }: TabsListProps) {
  return (
    <LayoutGroup id={layoutId}>
      <RadixTabs.List
        className={cn(
          'relative flex items-center gap-0.5',
          'rounded-ps-xs p-1',
          'bg-[var(--ps-body-background-secondary)]',
          'border border-[var(--ps-body-divider)]',
          className
        )}
        {...props}
      >
        {children}
      </RadixTabs.List>
    </LayoutGroup>
  )
}

export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger> {
  /** Must match the layoutId of the TabsList (auto-passed via composition) */
  _layoutId?: string
}

export function TabsTrigger({ className, children, value, ...props }: TabsTriggerProps) {
  return (
    <RadixTabs.Trigger
      value={value}
      className={cn(
        'group relative z-10 px-4 py-1.5',
        'text-[14px] font-medium leading-none',
        'rounded-[8px]',
        'text-ps-muted',
        'cursor-pointer select-none outline-none',
        // Active text color
        'data-[state=active]:text-ps-text',
        // Transition — only color, not transform (layout handles background)
        'transition-colors duration-150',
        'focus-visible:shadow-ps-focus',
        className
      )}
      {...props}
    >
      {/* Shared layout background indicator */}
      <RadixTabs.Trigger value={value} asChild>
        <span className="sr-only">{value}</span>
      </RadixTabs.Trigger>

      {/* Animated background */}
      <AnimatedTabBackground value={value} />

      <span className="relative z-10">{children}</span>
    </RadixTabs.Trigger>
  )
}

/** Internal: renders the shared-layout background pill under the active tab */
function AnimatedTabBackground({ value }: { value: string }) {
  // We use a sibling technique: render in each trigger, only show when active
  // This is the standard Jakub/Framer layoutId pattern
  return null // Handled by TabsIndicator below
}

/**
 * Alternative simpler approach: use a single indicator that follows the active tab.
 * This is closer to what Jakub does with layoutId="tab-indicator".
 */
export function TabsIndicatorList({
  className,
  layoutId = 'tabs',
  children,
  ...props
}: TabsListProps) {
  return (
    <LayoutGroup id={layoutId}>
      <RadixTabs.List
        className={cn(
          'relative flex items-center gap-0.5',
          'rounded-ps-xs p-1',
          'bg-[var(--ps-body-background-secondary)]',
          'border border-[var(--ps-body-divider)]',
          className
        )}
        {...props}
      >
        {children}
      </RadixTabs.List>
    </LayoutGroup>
  )
}

export interface TabsIndicatorTriggerProps
  extends React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger> {}

export function TabsIndicatorTrigger({
  className,
  children,
  value,
  ...props
}: TabsIndicatorTriggerProps) {
  return (
    <RadixTabs.Trigger
      value={value}
      className={cn(
        'relative px-4 py-1.5',
        'text-[14px] font-medium leading-none',
        'rounded-[8px]',
        'text-ps-muted data-[state=active]:text-ps-text',
        'cursor-pointer select-none outline-none',
        'transition-colors duration-150',
        'focus-visible:shadow-ps-focus',
        className
      )}
      {...props}
    >
      {/* Shared layout background — renders only when active (data-state=active) */}
      <motion.span
        className={cn(
          'absolute inset-0 rounded-[8px]',
          'bg-[var(--ps-body-background-tertiary)]',
          'border border-[var(--ps-body-divider-strong)]',
          // Only show when parent trigger is active; hidden otherwise via group trick
          'hidden [[data-state=active]_&]:block'
        )}
        layoutId="tab-indicator"
        transition={spring.layout}
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </RadixTabs.Trigger>
  )
}

export const TabsContent = RadixTabs.Content
