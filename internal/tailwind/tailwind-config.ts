import { type Config } from "tailwindcss";

import preset from "./tailwind-preset";

export default {
  darkMode: ["selector"],
  content: ["./src/**/*.{astro,html,ts,tsx,mdx}", "!./src/ui-lib/icons/*.ts"],
  presets: [preset] as unknown as Config["presets"],
} satisfies Config;
