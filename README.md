# ps-ui

A personal component library with a **family.co / Aave aesthetic** — dark, minimal, glassy, smooth animations.

Built with **Radix UI + Tailwind CSS + Motion (Framer Motion)** using the shadcn copy-paste distribution model.

## Stack

| Layer | Choice |
|-------|--------|
| Distribution | Copy-paste (shadcn-style) — you own the code |
| Accessibility | Radix UI primitives |
| Styling | Tailwind CSS + `--ps-*` CSS custom properties |
| Animations | Motion (Framer Motion) |
| Type-safe variants | CVA (Class Variance Authority) |

## Design Tokens

All tokens use the `--ps-*` prefix (Playstack), mirroring ConnectKit's `--ck-*` structure.

See [`packages/ui/src/tokens/index.css`](packages/ui/src/tokens/index.css).

Key values:
- Border radius: `20px` (family.co signature)
- Background: `#1a1b1f`
- Primary: `#6366f1` (indigo — override via `--ps-primary-button-background`)
- Font: `-apple-system` stack

## Components

### Primitives
- `Button` — primary/secondary/ghost variants, scale(0.96) on press
- `Input` — focus ring, error/valid states
- `Badge` — status pill
- `Spinner` — animated loading indicator
- `Avatar` — with fallback initials
- `Card` — glass-card surface
- `Alert` — error/warning/success/info

### Overlays (Radix)
- `Dialog` — AnimatePresence + backdrop blur
- `Tooltip`
- `Select`
- `ScrollArea`

### Composite
- `Tabs` — `layoutId="tab-indicator"` shared layout animation
- `SignInDialog` — 5-state animated dialog (default → email → phone → passkey → connect-wallet)

## Inspiration

- [ConnectKit](https://github.com/family/connectkit) — family.co's wallet connect modal
- [Aave Interface](https://github.com/aave/interface) — dark DeFi dashboard
- [jakub.kr](https://jakub.kr) — Animated Sign-In Dialog patterns
