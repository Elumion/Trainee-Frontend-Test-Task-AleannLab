/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        item: "2px 1px 7px rgba(0, 0, 0, 0.08), 0px 2px 1px -1px rgba(0, 0, 0, 0.04), 0px 1px 3px rgba(0, 0, 0, 0.12);",
        pagination:
          "2px 1px 7px rgba(0, 0, 0, 0.08), 0px 2px 1px -1px rgba(0, 0, 0, 0.04), 0px 1px 3px rgba(0, 0, 0, 0.12)",
      },
      screens: {
        xl: { max: "1400px" },
        lg: { max: "1200px" },
        l: { max: "1000px" },
        md: { max: "780px" },
        sm: { max: "420px" },
      },
      fontFamily: {
        roboto: "Roboto",
        proxima: "Proxima Nova Rg",
        semibold: "Proxima Nova Lt",
      },
    },
  },
  plugins: [],
};
