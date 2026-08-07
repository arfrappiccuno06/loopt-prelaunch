/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Toronto-night neon palette: solid colours over the pixel-art skyline.
      // NOTE: the tone/structural hexes here are duplicated in lib/theme.ts,
      // which is the source used by the components/pixel/* frame layers. The
      // CJS tailwind config can't import that TS module — keep the two aligned.
      colors: {
        night: "#0e0b18", // deepest base / bg fallback
        ink: "#0b0a12", // text on bright accent fills
        surface: "#17132a", // solid card
        surface2: "#221b3e", // raised solid
        surfaceRaised: "#221b3e", // alias matching lib/theme.ts
        line: "#3a3060", // subtle border
        borderLight: "#4a3f78", // lighter frame edge
        borderDark: "#16112b", // darker frame edge / recess
        text: "#F4F1FB",
        muted: "#ADA6C9",
        cyan: "#74F5FF", // primary neon accent
        magenta: "#E45CFF",
        green: "#5BE58B",
        gold: "#EAD94C",
        red: "#FF5C6A",
        neutral: "#ADA6C9",
        yellow: "#EAEA00",
        pink: "#FF8AD8",
        error: "#FFB4AB",
      },
      fontFamily: {
        display: ["SpaceGrotesk_700Bold"],
        displaymed: ["SpaceGrotesk_600SemiBold"],
        sans: ["HankenGrotesk_400Regular"],
        sansmed: ["HankenGrotesk_500Medium"],
        sanssemi: ["HankenGrotesk_600SemiBold"],
        mono: ["JetBrainsMono_500Medium"],
        pixel: ["Silkscreen_400Regular"],
        pixelbold: ["Silkscreen_700Bold"],
      },
    },
  },
  plugins: [],
};
