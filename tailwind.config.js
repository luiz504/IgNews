/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        cyan: { DEFAULT: '#61dadb', '-900': '#1f2729' },
        yellow: { DEFAULT: '#eba417' },
        gray: {
          '-100': '#e1e1e6',
          '-300': '#a8a8b3',
          '-500': '#737380',
          '-800': '#29292e',
          '-900': '#121214',
        },
        green: {
          DEFAULT: '#04d361',
        },
      },
    },
  },
  plugins: [],
}
