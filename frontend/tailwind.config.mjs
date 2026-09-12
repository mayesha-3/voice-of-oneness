/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        tvone: {
          blue: {
            DEFAULT: '#024794',
            dark: '#002B66',
            light: '#E0F2FE',
          },
          orange: {
            DEFAULT: '#FF5722',
            light: '#FF8A65',
            dark: '#E64A19',
          },
          maroon: {
            DEFAULT: '#7A0C2E',
            dark: '#54051D',
            light: '#9E123C',
          },
          gold: {
            DEFAULT: '#D4AF37',
            dark: '#B48E22',
            light: '#FEF08A',
          },
          sky: {
            DEFAULT: '#0284C7',
            light: '#BAE6FD',
          }
        }
      }
    },
  },
  plugins: [],
};
