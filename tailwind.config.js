/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        "9/16": "9 / 16",
      },
      colors: {
        "light-gray": "#f6f6f6",
        orange: "#f37021",
        "orange-hover": "#ff8422",
        "orange-active": "#bf6119",
        "gray-bg": "#e5e5e5",
      },
      backgroundImage: {
        "screen-bg": "url('./Pictures/background.png')",
      },
    },
    screens: {
      sm: { max: "576px" },

      md: { max: "768px" },

      lg: { max: "1024px" },

      xl: { max: "1280px" },

      "2xl": { max: "1536px" },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
