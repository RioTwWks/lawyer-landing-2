/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: 'var(--color-brand-red)',
          'red-dark': 'var(--color-brand-red-dark)',
          'red-light': 'var(--color-brand-red-light)',
          gold: 'var(--color-brand-gold)',
          'gold-light': 'var(--color-brand-gold-light)',
          'gold-dark': 'var(--color-brand-gold-dark)',
        },
        ink: {
          DEFAULT: 'var(--color-ink)',
          muted: 'var(--color-ink-muted)',
          soft: 'var(--color-ink-soft)',
        },
        paper: {
          DEFAULT: 'var(--color-paper)',
          warm: 'var(--color-paper-warm)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '72rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
