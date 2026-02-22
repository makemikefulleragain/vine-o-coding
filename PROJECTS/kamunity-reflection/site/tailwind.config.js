/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        parchment: '#F7F0E2',
        bark:      '#4A3728',
        ember:     '#C4622D',
        sky:       '#2B6CB0',
        tan:       '#D4C5A9',
        moss:      '#7A8C6E',
        gold:      '#C9A84C',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono:  ['"Courier New"', 'Courier', 'monospace'],
      },
      animation: {
        'orb-idle':     'orbIdle 4s ease-in-out infinite',
        'orb-think':    'orbThink 1.5s ease-in-out infinite',
        'orb-speak':    'orbSpeak 2s ease-in-out infinite',
        'slide-up':     'slideUp 0.3s ease-out forwards',
        'slide-down':   'slideDown 0.3s ease-in forwards',
        'fade-in':      'fadeIn 0.4s ease-out forwards',
        'card-in':      'cardIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
      },
      keyframes: {
        orbIdle:  { '0%,100%': { transform: 'scale(1.0)' },   '50%': { transform: 'scale(1.02)' } },
        orbThink: { '0%,100%': { transform: 'scale(0.97)' },  '50%': { transform: 'scale(1.03)' } },
        orbSpeak: { '0%,100%': { transform: 'scale(1.0)' },   '50%': { transform: 'scale(1.05)' } },
        slideUp:   { from: { transform: 'translateY(100%)', opacity: 0 }, to: { transform: 'translateY(0)', opacity: 1 } },
        slideDown: { from: { transform: 'translateY(0)',    opacity: 1 }, to: { transform: 'translateY(110%)', opacity: 0 } },
        fadeIn:    { from: { opacity: 0 }, to: { opacity: 1 } },
        cardIn:    { from: { opacity: 0, transform: 'translateY(16px) scale(0.96)' }, to: { opacity: 1, transform: 'translateY(0) scale(1)' } },
      },
    },
  },
  plugins: [],
};
