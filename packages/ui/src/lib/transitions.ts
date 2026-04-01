/**
 * Transition presets for ps-ui.
 *
 * Tween values are extracted directly from ConnectKit's source
 * (family/connectkit, styles.ts + Modal/index.tsx).
 * Springs are used only where ConnectKit doesn't define values
 * (button press, layout animations, icon swaps).
 */

// ─── ConnectKit Exact Tweens ─────────────────────────────────────────────────

export const ck = {
  /**
   * Modal box enter/exit — BoxIn / BoxOut keyframes.
   * scale(0.97 ↔ 1), 150ms, ease.
   * Source: Modal/styles.ts
   */
  box: {
    type: 'tween',
    duration: 0.15,
    ease: [0.25, 0.1, 0.25, 1],
  } as const,

  /**
   * Overlay backdrop — BackgroundOverlay.
   * Opacity only, 150ms ease-out.
   * Source: Modal/styles.ts
   */
  overlay: {
    type: 'tween',
    duration: 0.15,
    ease: [0, 0, 0.58, 1], // ease-out
  } as const,

  /**
   * Content page transition — between pages inside the modal.
   * 220ms, cubic-bezier(0.26, 0.08, 0.25, 1).
   * Source: Modal/index.tsx — contentTransitionDuration = 0.22
   */
  content: {
    type: 'tween',
    duration: 0.22,
    ease: [0.26, 0.08, 0.25, 1],
  } as const,

  /**
   * Content page enter delay — content waits for exit to start.
   * duration * 0.75, delay = duration * 0.25.
   * Source: Modal/index.tsx — contentVariants animate
   */
  contentEnter: {
    type: 'tween',
    duration: 0.165, // 0.22 * 0.75
    delay: 0.055,    // 0.22 * 0.25
    ease: [0.26, 0.08, 0.25, 1],
  } as const,

  /**
   * Mobile sheet — slides up from bottom.
   * 300ms, cubic-bezier(0.15, 1.15, 0.6, 1) — slight overshoot spring feel.
   * Source: Modal/styles.ts — MobileBoxIn
   */
  mobile: {
    type: 'tween',
    duration: 0.3,
    ease: [0.15, 1.15, 0.6, 1],
  } as const,

  /**
   * Heading / button fade — fast UI element transitions.
   * 170ms, no easing (linear implied).
   * Source: Modal/index.tsx
   */
  ui: {
    type: 'tween',
    duration: 0.17,
    ease: 'easeOut',
  } as const,
} as const

// ─── Springs (where ConnectKit doesn't define) ───────────────────────────────

export const spring = {
  /**
   * Button press — scale(0.96) tap feedback.
   * Fast, no bounce. Jakub principle: always 0.96, never smaller.
   */
  press: { type: 'spring', stiffness: 700, damping: 35 } as const,

  /**
   * Icon swap — opacity + scale + blur contextual icon change.
   * Jakub principle: bounce must always be 0.
   */
  icon: { type: 'spring', duration: 0.3, bounce: 0 } as const,

  /**
   * Layout — shared layout animations (tab indicator pill, etc).
   */
  layout: { type: 'spring', stiffness: 500, damping: 30 } as const,

  /**
   * Height — useMeasure height:auto animation.
   */
  height: { type: 'spring', stiffness: 240, damping: 28 } as const,
} as const

// ─── Aliases for convenience ─────────────────────────────────────────────────

/** @deprecated Use ck.box / ck.overlay / ck.content instead */
export const tween = {
  fast: ck.box,
  normal: ck.ui,
  slow: ck.mobile,
} as const
