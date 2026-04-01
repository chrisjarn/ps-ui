// Tokens — import this CSS in your app's entry point:
// import '@ps-ui/ui/tokens'

// Hooks
export { useMeasure } from './hooks/useMeasure'

// Utils
export { cn } from './lib/utils'
export { spring, tween } from './lib/transitions'

// ─── Primitives ────────────────────────────────────────────────────
export { Button } from './components/Button/Button'
export type { ButtonProps } from './components/Button/Button'

export { Input } from './components/Input/Input'
export type { InputProps } from './components/Input/Input'

export { Badge } from './components/Badge/Badge'
export type { BadgeProps } from './components/Badge/Badge'

export { Spinner } from './components/Spinner/Spinner'
export type { SpinnerProps } from './components/Spinner/Spinner'

export { Avatar } from './components/Avatar/Avatar'
export type { AvatarProps } from './components/Avatar/Avatar'

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './components/Card/Card'
export type { CardProps } from './components/Card/Card'

export { Alert } from './components/Alert/Alert'
export type { AlertProps } from './components/Alert/Alert'

// ─── Overlays ──────────────────────────────────────────────────────
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
} from './components/Dialog/Dialog'
export type { DialogContentProps } from './components/Dialog/Dialog'

// ─── Composite ────────────────────────────────────────────────────
export {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsIndicatorList,
  TabsIndicatorTrigger,
  TabsContent,
} from './components/Tabs/Tabs'

export { SignInDialog } from './components/SignInDialog/SignInDialog'
export type { SignInDialogProps } from './components/SignInDialog/SignInDialog'
