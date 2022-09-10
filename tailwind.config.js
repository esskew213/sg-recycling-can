/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/**/*.js', './**/*.html'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['IBM Plex Mono', 'monospace'],
      },
    },
    plugins: [],
  },
};
