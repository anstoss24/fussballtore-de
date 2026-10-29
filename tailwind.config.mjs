/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f172a',
          light: '#1e293b',
        },
        // Grün um eine Stufe dunkler: weiße Schrift auf Buttons und grüne Links erreichen WCAG AA (5:1)
        accent: {
          DEFAULT: '#15803d',
          light: '#22c55e',
          dark: '#166534',
        },
        warm: {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
        },
        // Grautöne aus derselben Slate-Familie wie primary; Text-Grau dunkler für bessere Lesbarkeit
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#64748b',
          500: '#475569',
          600: '#334155',
          700: '#1e293b',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
      fontSize: {
        // Kleinste Schrift 13 px statt 12 px
        xs: ['0.8125rem', { lineHeight: '1.25rem' }],
        base: ['1.125rem', { lineHeight: '1.75' }],
      },
      borderRadius: {
        // Einheitliche Radien: Karten/Boxen = xl (12 px), Buttons/Felder = lg (8 px)
        xl: '0.75rem',
        '2xl': '0.75rem',
      },
    },
  },
  plugins: [],
};
