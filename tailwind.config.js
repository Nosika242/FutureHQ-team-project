// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  // This 'content' array tells Tailwind which files to scan for classes.
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        aqua: "#00A58E",
        coffee: "#BA5D00",
      },
    },
  },
  plugins: [],
};