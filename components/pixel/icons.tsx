import Svg, { Path, Rect } from "react-native-svg";

export interface PixelIconProps {
  size?: number;
  color?: string;
}

/** Blocky check mark for confirmations / success. */
export function PixelCheck({ size = 16, color = "#0b0a12" }: PixelIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Path
        d="M2 8 L6 12 L14 3"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
    </Svg>
  );
}

/** Right-pointing pixel arrow for button icon slots. */
export function PixelArrowRight({ size = 16, color = "#F4F1FB" }: PixelIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Path
        d="M2 8 H12 M9 4 L13 8 L9 12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
    </Svg>
  );
}

/** A solid square — a pixel "dot" for status pills. */
export function PixelSquare({ size = 8, color = "#74F5FF" }: PixelIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 8 8">
      <Rect x={0} y={0} width={8} height={8} fill={color} />
    </Svg>
  );
}
