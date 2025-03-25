import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default <Partial<Config>>{
  darkMode: ["class"],
  safelist: ["dark"],
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
      screens: {
        mobile: {
          raw: "(max-width: 767px)",
        },
        small: {
          raw: "(max-width: 359px)",
        },
      },
      backgroundImage: {
        logo: "url('@/assets/img/head/logo-orangecard.png')",
        "close-button": "url('@/assets/img/head/ic-title-close.png')",
      },
      fontSize: {
        zero: "0",
        "3xs": ".6rem",
        "2xs": ".8rem",
        xs: "1rem",
        sm: "1.2rem",
        base: "1.4rem",
        lg: "1.6rem",
        xl: "1.8rem",
        "2xl": "2rem",
        "3xl": "2.2rem",
        "4xl": "2.4rem",
        "5xl": "2.8rem",
        "6xl": "3.2rem",
        "7xl": "3.8rem",
        "8xl": "4.4rem",
        "9xl": "5rem",
        "10xl": "6.2rem",
      },
      colors: {
        gray: {
          // 50: '#f8f8f8',   // 기존 50 재정의
          100: "#f8f8f8", // 기존 100 재정의
          200: "#F1F3F5", // 기존 200 재정의
          300: "#E8ECEF", // 기존 300 재정의
          400: "#DEE2E6", // 기존 400 재정의
          500: "#ACB5BD", // 기존 500 재정의
          600: "#858E96", // 기존 600 재정의
          700: "#4E575E", // 기존 700 재정의
          800: "#343A40", // 기존 800 재정의
          900: "#1D2023", // 기존 900 재정의
        },
        border: "#e8ecef",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        e1yellow: {
          DEFAULT: "#FEBF23",
          foreground: "#fff7e3",
        },
        e1green: {
          DEFAULT: "#8dc63f",
          foreground: "#f4f9ec",
        },
        e1h2blue: {
          DEFAULT: "#0080c6",
          foreground: "#e5f2f9",
        },
        e1evgreen: {
          DEFAULT: "#2ab673",
          foreground: "#eaf8f1",
        },
        e1error: {
          DEFAULT: "#f13434",
          foreground: "#feebeb",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
      },
      listStyleType: {
        none: "none",
        disc: "disc",
        decimal: "decimal",
      },
    },
  },
  plugins: [animate],
};
