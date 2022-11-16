/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      spacing: { "screen-90": "90vh" },
    },
    fontFamily: {
      cascadia_code: ["cascadia_code_regular"],
      oswald_semiBold: ["oswald_semiBold"],
    },
  },
  plugins: [],
};
