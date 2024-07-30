import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "dancing-script": ["var(--font-dancing-script)"],
        "roboto-slab": ["var(--font-roboto-slab)"]
      },
      colors: {
        'ivory': '#FFFFEE'
      },
      margin: {
        betweenSection: "10rem",
        betweenSectionMd: "8.75rem",
        betweenBox: "3.75rem",
        betweenBoxMd: "1.75rem"
      }
    },
  },
  plugins: [],
};
export default config;
