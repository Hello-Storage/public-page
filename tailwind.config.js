/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./app/**/*.{html,js,jsx,tsx}",
    "./components/**/*.{html,js,jsx,tsx}",
    "./sections/**/*.{html,js,jsx,tsx}",
    "./styles/**/*.{js,jsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "primary-black": "#000000",
        "secondary-white": "#c7c7c7",
      },
      transitionTimingFunction: {
        "out-flex": "cubic-bezier(0.05, 0.6, 0.4, 0.9)",
      },
      backgroundImage: {
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
        "meteor-gradient":
          "linear-gradient(to right, rgba(255, 108, 245, 0), rgba(92, 255, 109, 1))",
      },
      keyframes: {
        disco: {
          "0%": { transform: "translateY(-50%) rotate(0deg)" },
          "100%": { transform: "translateY(-50%) rotate(360deg)" },
        },
      },
      animation: {
        disco: "disco 3s linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-3d"),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".cursor-emoji": {
          cursor:
            "url(https://em-content.zobj.net/thumbs/72/apple/354/victory-hand_medium-light-skin-tone_270c-1f3fc_1f3fc.png) 32 32, auto",
        },
      });
    }),
  ],
};
