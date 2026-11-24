/** @type {import('tailwindcss').Config} */
export default {
  content: ['./popup.html', './dashboard.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--tb-bg) / <alpha-value>)',
        surface: 'rgb(var(--tb-surface) / <alpha-value>)',
        subtle: 'rgb(var(--tb-subtle) / <alpha-value>)',
        line: 'rgb(var(--tb-line) / <alpha-value>)',
        fg: 'rgb(var(--tb-fg) / <alpha-value>)',
        muted: 'rgb(var(--tb-muted) / <alpha-value>)',
        accent: 'rgb(var(--tb-accent) / <alpha-value>)',
        'accent-fg': 'rgb(var(--tb-accent-fg) / <alpha-value>)',
        danger: 'rgb(var(--tb-danger) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        float: '0 12px 40px -8px rgb(0 0 0 / 0.18), 0 2px 8px -2px rgb(0 0 0 / 0.08)',
      },
      keyframes: {
        'tb-in': { from: { opacity: '0', transform: 'translateY(6px) scale(0.97)' }, to: { opacity: '1', transform: 'none' } },
        'tb-out': { from: { opacity: '1', transform: 'none' }, to: { opacity: '0', transform: 'translateY(6px) scale(0.97)' } },
        'tb-fade': { from: { opacity: '0' }, to: { opacity: '1' } },
      },
      animation: {
        'tb-in': 'tb-in 180ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'tb-out': 'tb-out 140ms ease-in both',
        'tb-fade': 'tb-fade 160ms ease-out both',
      },
    },
  },
  plugins: [],
};
