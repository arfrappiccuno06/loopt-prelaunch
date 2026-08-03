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
      colors: {
        night: "#0e0b18", // deepest base / bg fallback
        ink: "#0b0a12", // text on bright accent fills
        surface: "#17132a", // solid card
        surface2: "#221b3e", // raised solid
        line: "#3a3060", // subtle border
        text: "#F4F1FB",
        muted: "#ADA6C9",
        cyan: "#74F5FF", // primary neon accent
        magenta: "#E45CFF",
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
      },
    },
  },
  plugins: [],
};
