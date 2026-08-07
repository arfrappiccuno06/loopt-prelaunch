/**
 * Pixel-art design tokens for the LoopTO component library.
 *
 * These are the canonical values consumed *directly* (via `style`) by the
 * `components/pixel/*` components — the nested-View frame layers need exact
 * per-layer hex colors and pixel offsets that NativeWind `className` can't
 * express. The page-level chrome still uses the matching NativeWind tokens in
 * `tailwind.config.js`; keep the two in sync (the CJS tailwind config can't
 * import this TS module, so the overlap is duplicated by necessity).
 *
 * Everything snaps to a 4px pixel grid (`PX`). Zero border radius, always.
 */

/** Pixel unit. Every border thickness, offset, and gap is a multiple of this. */
export const PX = 4 as const;

/** 4px spacing grid. Keys are grid steps, values are pixels. */
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

/** Structural (non-tone) colors — surfaces, borders, text. */
export const colors = {
  bg: "#0e0b18", // deepest base / page fallback
  surface: "#17132a", // solid card body
  surfaceRaised: "#221b3e", // raised solid (inputs, unselected segments)
  border: "#3a3060", // neutral frame / subtle divider
  borderLight: "#4a3f78", // lighter edge (optional bevel highlight)
  borderDark: "#16112b", // darker edge / recess shadow
  textPrimary: "#F4F1FB",
  textMuted: "#ADA6C9",
  ink: "#0b0a12", // text on a bright accent fill
  errorText: "#FFB4AB", // soft salmon, kept for error copy legibility
} as const;

/** The six accent tones. */
export type PixelTone =
  | "cyan"
  | "magenta"
  | "green"
  | "gold"
  | "red"
  | "neutral";

/** Component size scale. */
export type PixelSize = "sm" | "md" | "lg";

/**
 * Per-tone triple that drives the pxlkit look:
 *  - `base`   bright — the frame, label, and icon color
 *  - `fill`   very dark tint of the tone — the component body
 *  - `shadow` darker still — the offset drop-shadow and pressed recess
 */
export interface ToneShade {
  base: string;
  fill: string;
  shadow: string;
}

// Ordering matters: bg < shadow < fill < base. The offset drop-shadow must sit
// clearly ABOVE the page bg (#0e0b18) to read as a raised 3D block, and the
// fill above the shadow, so all three layers stay distinct.
export const toneShades: Record<PixelTone, ToneShade> = {
  cyan: { base: "#74F5FF", fill: "#123B42", shadow: "#0B2A30" },
  magenta: { base: "#E45CFF", fill: "#331748", shadow: "#230F33" },
  green: { base: "#5BE58B", fill: "#123A26", shadow: "#0B2917" },
  gold: { base: "#EAD94C", fill: "#3E3714", shadow: "#2A250D" },
  red: { base: "#FF5C6A", fill: "#401D22", shadow: "#2C1216" },
  // Neutral reads as a muted graphite chip: gray-purple frame, deep-violet body.
  neutral: { base: "#ADA6C9", fill: "#241D42", shadow: "#17122F" },
};

/** Font family names — must match the keys loaded in `app/_layout.tsx`. */
export const typography = {
  // Chunky pixel font — big headings, section titles, the wordmark ONLY.
  fontPixel: "Silkscreen_400Regular",
  fontPixelBold: "Silkscreen_700Bold",
  // Monospace — all interactive UI text: buttons, labels, inputs, hints, badges, prices.
  fontMono: "JetBrainsMono_500Medium",
  // Sans — long body copy / paragraphs.
  fontBody: "HankenGrotesk_400Regular",
  fontBodyMed: "HankenGrotesk_500Medium",
  fontBodySemi: "HankenGrotesk_600SemiBold",
  // Display — the long marketing headline (kept readable, not pixelated).
  fontDisplay: "SpaceGrotesk_700Bold",
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    lg: 18,
    xl: 22,
    "2xl": 28,
    "3xl": 34,
  },
} as const;

export const theme = { PX, spacing, colors, toneShades, typography } as const;
export type Theme = typeof theme;
