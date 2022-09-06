/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['IBM Plex Mono', 'monospace'],
      },
    },
    plugins: [],
  },
};
