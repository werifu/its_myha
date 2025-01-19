import type { Config } from "tailwindcss";
// @ts-expect-error: The file doesn't include type declarations
import textShadow from "@designbycode/tailwindcss-text-shadow";
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    textShadow,
  ],
} satisfies Config;
