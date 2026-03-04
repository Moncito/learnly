import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        drift: 'drift 12s ease-in-out infinite alternate',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(30px, 20px) scale(1.08)' },
        },
      },
      fontFamily: {
        heading: ['var(--font-fredoka-one)', 'cursive'],
        body: ['var(--font-nunito)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
