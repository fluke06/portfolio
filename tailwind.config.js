/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontWeight: {
        black: '600',   // cap display weight — editorial, not heavy
      },
      fontFamily: {
        fraunces: ['var(--font-fraunces)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        baybayin: ['var(--font-baybayin)', 'sans-serif'],
      },
      colors: {
        'c-bg':          'var(--color-bg)',
        'c-surface':     'var(--color-surface)',
        'c-ink':         'var(--color-ink)',
        'c-muted':       'var(--color-muted)',
        'c-accent':      'var(--color-accent)',
        'c-accent-warm': 'var(--color-accent-warm)',
      },
    },
  },
  plugins: [],
}
