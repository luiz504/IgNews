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
    extend: {},
    colors: {
      '--white': '#ffffff',
      '--gray-100': '#e1e1e6',
      '--gray-300': '#a8a8b3',
      '--gray-500': '#121214',
      '--cyan-500': '#61dadb',
      '--yellow-500': '#eba417',
    },
  },
  plugins: [],
}
