/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './menu.html', './breakfast.html'],
  // Classes toggled by JS (mobile menu uses `hidden`; scrollspy uses `is-active`)
  // that may not be statically present in the HTML at build time.
  safelist: ['hidden', 'is-active'],
  theme: {
    extend: {
      // Union of the inline tailwind.config blocks from all three pages.
      colors: {
        brand: '#f15a29',
        'brand-dark': '#d8431a',
        chicky: '#d4202a',
        'chicky-dark': '#b01a20',
        gold: '#c9a24b',
        'gold-light': '#e3c878',
        'gold-deep': '#9a7a33',
        'gold-dark': '#e08e00',
        cream: '#fdf8f2',
        peach: '#fbe6d8',
        panel: '#ece4d8',
        ink: '#22130c',
        // Luxe (dark + gold) palette — homepage fine-dining theme
        noir: '#0e0c0a',
        charcoal: '#1a1613',
        'ink-cream': '#f3ead7',
      },
      fontFamily: {
        display: ['Fredoka', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 18px 40px -18px rgba(34,19,12,0.22)',
        soft: '0 10px 30px -12px rgba(34,19,12,0.18)',
        luxe: '0 30px 70px -30px rgba(0,0,0,0.85)',
      },
    },
  },
  plugins: [],
};
