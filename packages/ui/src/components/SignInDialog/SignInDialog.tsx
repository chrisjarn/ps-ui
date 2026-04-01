'use client'

import * as React from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { spring, tween } from '@/lib/transitions'
import { useMeasure } from '@/hooks/useMeasure'
import { Button } from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'

// ─── Types ──────────────────────────────────────────────────────────────────

type SignInState = 'default' | 'email' | 'phone' | 'passkey' | 'connect-wallet'

export interface SignInDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** App name shown in the dialog header */
  appName?: string
  /** App icon URL */
  appIcon?: string
  onSignIn?: (method: SignInState, value?: string) => void
}

// ─── Constants ───────────────────────────────────────────────────────────────

const TABS: Array<{ id: SignInState; label: string }> = [
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone' },
  { id: 'passkey', label: 'Passkey' },
  { id: 'connect-wallet', label: 'Wallet' },
]

// ─── Main Component ──────────────────────────────────────────────────────────

export function SignInDialog({
  open,
  onOpenChange,
  appName = 'App',
  appIcon,
  onSignIn,
}: SignInDialogProps) {
  const [state, setState] = React.useState<SignInState>('default')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')

  // useMeasure for smooth height animation (Jakub pattern)
  const [contentRef, { height: contentHeight }] = useMeasure()

  const handleClose = () => {
    onOpenChange?.(false)
    // Reset state after exit animation completes
    setTimeout(() => setState('default'), 300)
  }

  return (
    <AnimatePresence>
      {open && (
        <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
          <RadixDialog.Portal forceMount>

            {/* Overlay */}
            <RadixDialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50"
                style={{
                  backgroundColor: 'var(--ps-overlay-background)',
                  backdropFilter: 'var(--ps-overlay-backdrop-filter)',
                  WebkitBackdropFilter: 'var(--ps-overlay-backdrop-filter)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={tween.normal}
              />
            </RadixDialog.Overlay>

            {/* Panel */}
            <RadixDialog.Content asChild onEscapeKeyDown={handleClose}>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 w-full outline-none"
                style={{ maxWidth: 380, x: '-50%', y: '-50%' }}
                initial={{ opacity: 0, scale: 0.95, y: '-46%' }}
                animate={{ opacity: 1, scale: 1, y: '-50%' }}
                exit={{ opacity: 0, scale: 0.95, y: '-46%' }}
                transition={spring.gentle}
              >
                <div
                  className={cn(
                    'relative mx-4 overflow-hidden',
                    'rounded-ps',
                    'bg-[var(--ps-modal-background)]',
                    'border border-[rgba(255,255,255,0.06)]',
                    'shadow-ps'
                  )}
                >
                  {/* Height animation wrapper */}
                  <motion.div
                    animate={{ height: contentHeight || 'auto' }}
                    transition={spring.gentle}
                    className="overflow-hidden"
                  >
                    <div ref={contentRef}>
                      {/* Staggered enter animation for content chunks */}
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                          key={state}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={spring.default}
                        >
                          {state === 'default' ? (
                            <DefaultView
                              appName={appName}
                              appIcon={appIcon}
                              onSelectState={setState}
                            />
                          ) : (
                            <MethodView
                              state={state}
                              onBack={() => setState('default')}
                              email={email}
                              onEmailChange={setEmail}
                              phone={phone}
                              onPhoneChange={setPhone}
                              onSignIn={onSignIn}
                            />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </RadixDialog.Content>

          </RadixDialog.Portal>
        </RadixDialog.Root>
      )}
    </AnimatePresence>
  )
}

// ─── Default View ─────────────────────────────────────────────────────────────

interface DefaultViewProps {
  appName: string
  appIcon?: string
  onSelectState: (state: SignInState) => void
}

function DefaultView({ appName, appIcon, onSelectState }: DefaultViewProps) {
  return (
    <div className="flex flex-col items-center px-6 pb-6 pt-8 gap-5">
      {/* App icon + name — staggered */}
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring.default, delay: 0.05 }}
      >
        {appIcon ? (
          <img
            src={appIcon}
            alt={appName}
            className="h-14 w-14 rounded-[16px] outline outline-1 outline-[rgba(255,255,255,0.1)]"
          />
        ) : (
          <div className="h-14 w-14 rounded-[16px] bg-[var(--ps-body-background-tertiary)] border border-[var(--ps-body-divider)] flex items-center justify-center">
            <span className="text-2xl font-bold text-ps-muted">{appName[0]}</span>
          </div>
        )}
        <div className="text-center">
          <h2 className="text-[17px] font-semibold text-ps-text" style={{ textWrap: 'balance' }}>
            Sign in to {appName}
          </h2>
          <p className="text-[13px] text-ps-muted mt-0.5">
            Choose your preferred method
          </p>
        </div>
      </motion.div>

      {/* Method buttons — staggered */}
      <motion.div
        className="flex flex-col gap-2 w-full"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.1 },
          },
        }}
      >
        {TABS.map((tab) => (
          <motion.div
            key={tab.id}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: spring.default },
            }}
          >
            <MethodButton
              label={tab.label}
              icon={getMethodIcon(tab.id)}
              onClick={() => onSelectState(tab.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Method View ─────────────────────────────────────────────────────────────

interface MethodViewProps {
  state: Exclude<SignInState, 'default'>
  onBack: () => void
  email: string
  onEmailChange: (v: string) => void
  phone: string
  onPhoneChange: (v: string) => void
  onSignIn?: SignInDialogProps['onSignIn']
}

function MethodView({ state, onBack, email, onEmailChange, phone, onPhoneChange, onSignIn }: MethodViewProps) {
  return (
    <div className="flex flex-col px-6 pb-6 pt-5 gap-4">
      {/* Back button */}
      <button
        onClick={onBack}
        className={cn(
          'flex items-center gap-1.5 text-[13px] text-ps-muted',
          'hover:text-ps-text transition-colors duration-150',
          'w-fit outline-none focus-visible:underline',
          '-ml-1 px-1 py-0.5 rounded-[6px]'
        )}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back
      </button>

      {state === 'email' && (
        <EmailForm
          value={email}
          onChange={onEmailChange}
          onSubmit={() => onSignIn?.('email', email)}
        />
      )}
      {state === 'phone' && (
        <PhoneForm
          value={phone}
          onChange={onPhoneChange}
          onSubmit={() => onSignIn?.('phone', phone)}
        />
      )}
      {state === 'passkey' && (
        <PasskeyView onSubmit={() => onSignIn?.('passkey')} />
      )}
      {state === 'connect-wallet' && (
        <WalletView onSubmit={() => onSignIn?.('connect-wallet')} />
      )}
    </div>
  )
}

// ─── Method Sub-Forms ─────────────────────────────────────────────────────────

function EmailForm({ value, onChange, onSubmit }: { value: string; onChange: (v: string) => void; onSubmit: () => void }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[17px] font-semibold text-ps-text">Sign in with email</h3>
      <Input
        type="email"
        placeholder="you@example.com"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
      />
      <Button onClick={onSubmit} disabled={!value.includes('@')}>
        Continue
      </Button>
    </div>
  )
}

function PhoneForm({ value, onChange, onSubmit }: { value: string; onChange: (v: string) => void; onSubmit: () => void }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[17px] font-semibold text-ps-text">Sign in with phone</h3>
      <Input
        type="tel"
        placeholder="+1 (555) 000-0000"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
      />
      <Button onClick={onSubmit} disabled={value.length < 8}>
        Send code
      </Button>
    </div>
  )
}

function PasskeyView({ onSubmit }: { onSubmit: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <h3 className="text-[17px] font-semibold text-ps-text">Sign in with passkey</h3>
      {/* Rotating conic-gradient border effect */}
      <motion.div
        className="relative h-20 w-20 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, rgba(var(--ps-brand-rgb),0.8) 0%, rgba(var(--ps-brand-rgb),0) 40%, rgba(var(--ps-brand-rgb),0) 60%, rgba(var(--ps-brand-rgb),0.8) 100%)',
          padding: 2,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[var(--ps-body-background)]">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="5" stroke="var(--ps-primary-button-background)" strokeWidth="2"/>
            <path d="M17 12h6M20 9v6M17 12l3-3" stroke="var(--ps-primary-button-background)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </motion.div>
      <p className="text-[14px] text-ps-muted text-center" style={{ textWrap: 'balance' }}>
        Use your device&apos;s biometrics or PIN to authenticate
      </p>
      <Button onClick={onSubmit} className="w-full">
        Authenticate with passkey
      </Button>
    </div>
  )
}

function WalletView({ onSubmit }: { onSubmit: () => void }) {
  const wallets = ['MetaMask', 'Coinbase', 'WalletConnect']
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[17px] font-semibold text-ps-text">Connect wallet</h3>
      {wallets.map((w) => (
        <MethodButton key={w} label={w} icon={<WalletIcon />} onClick={onSubmit} />
      ))}
    </div>
  )
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function MethodButton({
  label,
  icon,
  onClick,
}: {
  label: string
  icon: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 px-4 h-[52px]',
        'rounded-ps-sm',
        'bg-[var(--ps-secondary-button-background)]',
        'border border-[var(--ps-body-divider)]',
        'text-[15px] font-medium text-ps-text',
        'cursor-pointer outline-none',
        'hover:bg-[var(--ps-secondary-button-hover-background)]',
        'transition-colors duration-150',
        'focus-visible:shadow-ps-focus',
        // Scale on press (Jakub principle)
        'active:scale-[0.98]'
      )}
      style={{ transition: 'background-color 150ms cubic-bezier(0.2,0,0,1), transform 120ms cubic-bezier(0.2,0,0,1)' }}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[var(--ps-body-background-tertiary)]">
        {icon}
      </span>
      {label}
    </button>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function getMethodIcon(state: SignInState) {
  switch (state) {
    case 'email': return <EmailIcon />
    case 'phone': return <PhoneIcon />
    case 'passkey': return <KeyIcon />
    case 'connect-wallet': return <WalletIcon />
    default: return null
  }
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1.5" y="4" width="15" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M1.5 6.5l7.5 5 7.5-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="4.5" y="1.5" width="9" height="15" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="9" cy="13.5" r="0.75" fill="currentColor"/>
    </svg>
  )
}

function KeyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="7" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M10 8h6M13 6v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

function WalletIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1.5" y="4.5" width="15" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M1.5 7.5h15" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="13" cy="11" r="1.25" fill="currentColor"/>
    </svg>
  )
}
