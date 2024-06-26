import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.5rem",
      },
      colors: {
        primary: "#183544",
        secondary: "#ff531d",
        white1: "#f1f1f1",
        white2: "#f7f7f7",
        white3: "#f9f9f9",
        gray: "rgba(102,102,102,0.7)",
        gray2: "#ddd",
        gray3: "rgba(102,102,102,0.85)",
        gray4: "#a8b2b7",
        gray5: "#334862",
        gray6: "#eff0f5",
        gray7: "#757575",
        gray8: "#dadada",
        gray9: "#9e9e9e",
        gray10: "#cacaca",
        dark: "#3A3A3A",
        dark2: "rgba(0,0,0,0.54)",
        dark3: "#222",
        dark4: "#11252F",
        dark5: "#424242",
        yellow: "#faca51",
        error: "#b20000",
        cyan: "#37cfdd",
        green: "#4caf50",
        orange: "#ff7941",
        blue: "rgb(73, 161, 254)",
      },
    },
  },
  plugins: [],
};
export default config;
