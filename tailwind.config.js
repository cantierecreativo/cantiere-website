module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "2.5rem",
        xl: "0",
      },
    },
    fontFamily: {
      sans: ["Geist", "sans-serif"],
      bold: ["BasicSans", "serif"],
    },
    fontWeight: {
      bold: "600",
    },
    extend: {
      colors: {
        gray: {
          DEFAULT: "#B7B7B7",
          light: "#F5F4F4",
          dark: "#696969",
        },
        blue: {
          DEFAULT: "#5251F5",
          light: "#B7E4EE",
          dark: "#050E39",
        },
        violet: {
          DEFAULT: "#B79CED",
          light: "#9D95F2",
          dark: "#C8C5F3",
        },
        black: {
          DEFAULT: "#222121",
        },
        red: "#FF6A6C",
        orange: "#FF8676",
        yellow: "#E4FF86",
        pink: "#FF6FFF",
        green: "#00D5A1",
      },
      fontSize: {
        xs: ["0.8125rem", "1rem"],
        sm: ["0.875rem", "1.25rem"],
        base: ["1rem", "1.5rem"],
        lg: ["1.25rem", "1.875rem"],
        xl: ["1.5625rem", "2.1875rem"],
        "2xl": ["1.875rem", "2.25rem"],
        "3xl": ["2.4375rem", "2.9375rem"],
        "4xl": ["3rem", "3.625rem"],
        "5xl": ["3.75rem", "4rem"],
        "6xl": ["4.75rem", "5.125rem"],
        "7xl": ["5.625rem", "6.1875rem"],
      },
      screens: {
        "3xl": "1920px",
      },
      letterSpacing: {
        widest: ".2em",
      },
      zIndex: {
        60: "60",
        70: "70",
      },
      backgroundImage: {
        "banner-blue": "url('/background/gradient.svg')",
        "banner-contact": "url('/background/contactBanner.svg')",
        "arrow-icon": "url('/icons/arrow.svg')",
      },
      keyframes: {
        card_loop_left: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
        card_loop_right: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "card-loop-left": "card_loop_left 20s linear infinite",
        "card-loop-right": "card_loop_right 20s linear infinite",
      },
    },
    plugins: [require("@tailwindcss/forms")],
  },
};
