const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"SF Pro Display"', 'Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
        'muted-foreground': 'hsl(var(--muted-foreground) / <alpha-value>)',
        card: 'hsl(var(--card) / <alpha-value>)',
        'card-foreground': 'hsl(var(--card-foreground) / <alpha-value>)',
        popover: 'hsl(var(--popover) / <alpha-value>)',
        'popover-foreground': 'hsl(var(--popover-foreground) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        'accent-foreground': 'hsl(var(--accent-foreground) / <alpha-value>)',
        brand: {
          DEFAULT: 'hsl(var(--brand) / <alpha-value>)',
          foreground: 'hsl(var(--brand-foreground) / <alpha-value>)',
          subtle: 'hsl(var(--brand-subtle) / <alpha-value>)',
        },
        destructive: 'hsl(var(--destructive) / <alpha-value>)',
        'destructive-foreground': 'hsl(var(--destructive-foreground) / <alpha-value>)',
        success: 'hsl(var(--success) / <alpha-value>)',
        warning: 'hsl(var(--warning) / <alpha-value>)',
        glass: 'var(--glass)',
      },
      borderRadius: {
        xl: 'var(--radius-xl)',
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
      },
      boxShadow: {
        glow: '0 18px 38px rgba(15, 23, 42, 0.15)',
        glass: 'inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 20px 40px rgba(15, 23, 42, 0.16)',
        elevated: '0 12px 24px rgba(15, 23, 42, 0.12)',
      },
      backgroundImage: {
        aurora:
          'radial-gradient(circle at 20% 20%, rgba(72, 118, 255, 0.45), transparent 55%), radial-gradient(circle at 80% 0%, rgba(255, 124, 176, 0.35), transparent 40%), radial-gradient(circle at 50% 100%, rgba(111, 255, 233, 0.35), transparent 50%)',
      },
      backdropFilter: {
        none: 'none',
      },
      transitionTimingFunction: {
        'soft-in-out': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        modern: {
          primary: '#3b82f6',
          'primary-focus': '#2563eb',
          'primary-content': '#ffffff',
          neutral: '#1f2937',
          'neutral-focus': '#111827',
          'neutral-content': '#f9fafb',
          accent: '#38bdf8',
          'accent-focus': '#0ea5e9',
          'accent-content': '#0f172a',
          info: '#0ea5e9',
          success: '#22c55e',
          warning: '#f97316',
          error: '#ef4444',
        },
      },
      'dark',
    ],
    logs: false,
  },
};
