import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        facetime: "#03c755",
        white: "var(--white)",
        purple: "var(--purple)",
        orange: "var(--orange)",
        yellow: "var(--yellow)",
        green: "var(--green)",
        blue: "var(--blue)",
        pink: "var(--pink)",
        beige: "var(--beige)",
        brown: "var(--brown)",
        gray: "var(--gray)",
        border: { DEFAULT: "var(--border-primary)" },
        text: { DEFAULT: "var(--text-primary)" },
        button: {
          DEFAULT: "var(--button-primary)",
          primary: "var(--button-primary)",
          secondary: "var(--button-secondary)",
        },
        placeholder: { DEFAULT: "var(--placeholder)" },
        ring: { DEFAULT: "var(--button-primary)" },
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        bold: "700",
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "20px",
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
      },
      buttonColor: {
        primary: "var(--button-primary)",
        secondary: "var(--button-secondary)",
      },
      backgroundColor: {
        primary: "var(--background-primary)",
        secondary: "var(--background-secondary)",
      },
      borderColor: {
        primary: "var(--border-primary)",
        secondary: "var(--border-primary)",
      },
      borderWidth: {
        DEFAULT: "1.5px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
