import tailwindAnimate from "tailwindcss-animate";

export default {
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-main-light":
          "linear-gradient(90deg, hsl(var(--gradient-main-light-start)) 0%, hsl(var(--gradient-main-light-end)) 100%)",
        "gradient-main-light-to-b":
          "linear-gradient(180deg, hsl(var(--gradient-main-light-start)) 0%, hsl(var(--gradient-main-light-end)) 100%)",
        "gradient-main-light-to-t":
          "linear-gradient(0deg, hsl(var(--gradient-main-light-start)) 0%, hsl(var(--gradient-main-light-end)) 100%)",
        "gradient-main-dark":
          "linear-gradient(90deg, hsl(var(--gradient-main-dark-start)) 0%, hsl(var(--gradient-main-dark-end)) 100%)",
        "gradient-main-dark-to-b":
          "linear-gradient(180deg, hsl(var(--gradient-main-dark-start)) 0%, hsl(var(--gradient-main-dark-end)) 100%)",
        "gradient-main-dark-to-t":
          "linear-gradient(0deg, hsl(var(--gradient-main-dark-start)) 0%, hsl(var(--gradient-main-dark-end)) 100%)",
      },
      transitionDuration: {
        global: "var(--transition-duration)",
      },
      colors: {
        "electric-mint": "hsl(var(--electric-mint))",
        "electric-blue": "hsl(var(--electric-blue))",
        "bright-pink": "hsl(var(--bright-pink))",
        "dark-yellow": "hsl(var(--dark-yellow))",
        "eerie-black": "hsl(var(--eerie-black))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        "money-value-b": "hsl(var(--money-value-b))",
        "money-value-m": "hsl(var(--money-value-m))",
        "money-value-k": "hsl(var(--money-value-k))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          highlight: "hsl(var(--destructive-highlight))",
          "highlight-foreground": "hsl(var(--destructive-highlight-foreground))",
          flashlight: "hsl(var(--destructive-flashlight))",
          ring: "hsl(var(--destructive-ring))",
        },
        positive: {
          DEFAULT: "hsl(var(--positive))",
          foreground: "hsl(var(--positive-foreground))",
          highlight: "hsl(var(--positive-highlight))",
          "highlight-foreground": "hsl(var(--positive-highlight-foreground))",
          flashlight: "hsl(var(--positive-flashlight))",
          ring: "hsl(var(--positive-ring))",
        },
        neutral: {
          DEFAULT: "hsl(var(--neutral))",
          foreground: "hsl(var(--neutral-foreground))",
          highlight: "hsl(var(--neutral-highlight))",
          "highlight-foreground": "hsl(var(--neutral-highlight-foreground))",
          flashlight: "hsl(var(--neutral-flashlight))",
          ring: "hsl(var(--neutral-ring))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
          highlight: "hsl(var(--warning-highlight))",
          "highlight-foreground": "hsl(var(--warning-highlight-foreground))",
          flashlight: "hsl(var(--warning-flashlight))",
          ring: "hsl(var(--warning-ring))",
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
        alert: {
          DEFAULT: "hsl(var(--alert))",
          foreground: "hsl(var(--alert-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        toast: {
          DEFAULT: "hsl(var(--toast-background))",
          border: "hsl(var(--toast-border))",
          background: "hsl(var(--toast-background))",
          foreground: "hsl(var(--toast-foreground))",
          "muted-foreground": "hsl(var(--toast-muted-foreground))",
          "action-button-background": "hsl(var(--toast-action-button-background))",
          "action-button-foreground": "hsl(var(--toast-action-button-foreground))",
          "cancel-button-background": "hsl(var(--toast-cancel-button-background))",
          "cancel-button-foreground": "hsl(var(--toast-cancel-button-foreground))",
        },
        tooltip: {
          DEFAULT: "hsl(var(--tooltip-background))",
          background: "hsl(var(--tooltip-background))",
          foreground: "hsl(var(--tooltip-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 8px)",
        sm: "calc(var(--radius) - 12px)",
      },
      fontFamily: {
        sans: ["var(--font-family-sans)"],
        mono: ["var(--font-family-mono)"],
      },
      fontSize: {
        xs: ["var(--font-size-xs)", "var(--font-size-lh-xs)"],
        sm: ["var(--font-size-sm)", "var(--font-size-lh-sm)"],
        base: ["var(--font-size-base)", "var(--font-size-lh-base)"],
        lg: ["var(--font-size-lg)", "var(--font-size-lh-lg)"],
        xl: ["var(--font-size-xl)", "var(--font-size-lh-xl)"],
        "2xl": ["var(--font-size-2xl)", "var(--font-size-lh-2xl)"],
        "3xl": ["var(--font-size-3xl)", "var(--font-size-lh-3xl)"],
        "4xl": ["var(--font-size-4xl)", "var(--font-size-lh-4xl)"],
        "5xl": ["var(--font-size-5xl)", "var(--font-size-lh-5xl)"],
        "5xl-a": ["var(--font-size-5xl-a)", "var(--font-size-lh-5xl-a)"],
        "6xl": ["var(--font-size-6xl)", "var(--font-size-lh-6xl)"],
        "7xl": ["var(--font-size-7xl)", "var(--font-size-lh-7xl)"],
        "8xl": ["var(--font-size-8xl)", "var(--font-size-lh-8xl)"],
        "9xl": ["var(--font-size-9xl)", "var(--font-size-lh-9xl)"],
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "move-horizontal": {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        "move-in-circle": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        "move-vertical": {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
      },
      animation: {
        "move-vertical": "move-vertical 30s ease infinite",
        "move-in-circle-reverse": "move-in-circle 20s reverse infinite",
        "move-in-circle-linear": "move-in-circle 40s linear infinite",
        "move-horizontal": "move-horizontal 40s ease infinite",
        "move-in-circle-ease": "move-in-circle 20s ease infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [tailwindAnimate],
};
