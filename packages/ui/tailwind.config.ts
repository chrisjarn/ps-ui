import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      borderRadius: {
        // family.co signature: 20px outer radius
        ps: '20px',
        'ps-sm': '16px',
        'ps-xs': '12px',
        // Concentric inner radius: outer (20px) - padding (6px) = 14px
        'ps-inner': '14px',
      },
      colors: {
        ps: {
          bg: 'var(--ps-body-background)',
          'bg-secondary': 'var(--ps-body-background-secondary)',
          'bg-tertiary': 'var(--ps-body-background-tertiary)',
          text: 'var(--ps-body-color)',
          muted: 'var(--ps-body-color-muted)',
          danger: 'var(--ps-body-color-danger)',
          valid: 'var(--ps-body-color-valid)',
          warning: 'var(--ps-body-color-warning)',
          divider: 'var(--ps-body-divider)',
          primary: 'var(--ps-primary-button-background)',
          'primary-hover': 'var(--ps-primary-button-hover-background)',
          'primary-text': 'var(--ps-primary-button-color)',
        },
      },
      boxShadow: {
        ps: 'var(--ps-modal-box-shadow)',
        'ps-sm': '0px 2px 8px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.08)',
        'ps-focus': 'var(--ps-focus-ring)',
      },
      backdropBlur: {
        ps: '20px',
      },
    },
  },
  plugins: [],
}

export default config
