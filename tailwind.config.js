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
      sans: ["Leicht", "sans-serif"],
      bold: ["Buch", "serif"],
    },
    extend: {
      colors: {
        gray: {
          DEFAULT: "#B7B7B7",
          light: "#F5F4F4",
          dark: "#696969",
        },
        blue: {
          DEFAULT: "#4637F1",
        },
        violet: {
          DEFAULT: "#564DF1",
          light: "#A5A0F2",
          dark: "#C8C5F3",
        },
        black: {
          DEFAULT: "#000000",
        },
        red: "#FF6A6C",
        orange: "#FF8676",
        yellow: "#FFD325",
        pink: "#FF6FFF",
        green: "#00D5A1",
      },
      fontSize: {
        xs: ["13px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["20px", "30px"],
        xl: ["25px", "35px"],
        "2xl": ["30px", "36px"],
        "3xl": ["39px", "47px"],
        "4xl": ["48px", "58px"],
        "5xl": ["60px", "72px"],
        "6xl": ["76px", "91px"],
        "7xl": ["95px", "120px"],
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
      },
    },
  },
};
