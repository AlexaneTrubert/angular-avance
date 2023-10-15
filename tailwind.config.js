/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/playground/src/app/*.{html,ts}",
    "./projects/crm/src/app/*.{html,ts}",
    "./projects/playground/src/component/**/*.{html,ts}",
    "./projects/crm/src/component/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
