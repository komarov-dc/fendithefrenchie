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
        gold: '#f5a623',
        'gold-dark': '#e08e00',
        cream: '#fdf8f2',
        peach: '#fbe6d8',
        panel: '#ece4d8',
        ink: '#22130c',
      },
      fontFamily: {
        display: ['Fredoka', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      boxShadow: {
        card: '0 18px 40px -18px rgba(34,19,12,0.22)',
        soft: '0 10px 30px -12px rgba(34,19,12,0.18)',
      },
    },
  },
  plugins: [],
};
