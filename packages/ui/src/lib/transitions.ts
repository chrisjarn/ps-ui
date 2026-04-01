/**
 * Spring transition presets for ps-ui.
 * Used with Motion (Framer Motion).
 *
 * Philosophy: prefer springs over tweens for natural, interruptible animations.
 */

export const spring = {
  /** Default — smooth, no bounce. Good for most UI. */
  default: { type: 'spring', stiffness: 300, damping: 28 } as const,

  /** Snappy — fast, crisp. Good for dropdowns, tooltips. */
  snappy: { type: 'spring', stiffness: 500, damping: 32 } as const,

  /** Gentle — slow, soft. Good for overlays, modals. */
  gentle: { type: 'spring', stiffness: 200, damping: 30 } as const,

  /** Stiff — very fast. Good for micro-interactions, scale on press. */
  stiff: { type: 'spring', stiffness: 700, damping: 35 } as const,

  /** Icon — for contextual icon swap (Jakub principle: bounce must be 0). */
  icon: { type: 'spring', duration: 0.3, bounce: 0 } as const,

  /** Layout — for shared layout animations (tab indicator, etc). */
  layout: { type: 'spring', stiffness: 500, damping: 30 } as const,
} as const

export const tween = {
  /** Fast tween — 150ms. Good for hover states. */
  fast: { type: 'tween', duration: 0.15, ease: [0.2, 0, 0, 1] } as const,

  /** Normal tween — 200ms. */
  normal: { type: 'tween', duration: 0.2, ease: [0.2, 0, 0, 1] } as const,

  /** Slow tween — 300ms. Good for page transitions. */
  slow: { type: 'tween', duration: 0.3, ease: [0.2, 0, 0, 1] } as const,
} as const
