import daisyui from 'daisyui'
import typography from '@tailwindcss/typography'
import themes from 'daisyui/src/theming/themes'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  daisyui: {
    themes: [
      {
        emerald: {
          ...themes['emerald'],
          primary: '#3B82F6',
          secondary: '#E9E3D7',
          accent: '#06BD31',
          'base-200': '#F3F4F6',
          'base-content': '#242422',
        },
      },
    ],
  },
  plugins: [typography, daisyui],
}
