/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    extend: {
      fontSize: {
        "2xs": ".7rem",
        "3xs": ".6rem",
      },
      colors: {
        primary: {
          "50": "#f9f9fa",
          "100": "#eeeef0",
          "200": "#d8d8df",
          "300": "#b7b8c2",
          "400": "#8f90a1",
          "500": "#727485",
          "600": "#5c5d6d",
          "700": "#4b4c59",
          "800": "#40414c",
          "900": "#393941",
          "950": "#26262b",
        },
      },
    },
  },
  plugins: [],
};
