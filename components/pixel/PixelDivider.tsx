import { useId } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { View } from "react-native";
import Svg, { Defs, Pattern, Rect } from "react-native-svg";

import { colors, PX, toneShades } from "@/lib/theme";

import type { PixelTone } from "./types";

export interface PixelDividerProps {
  /** Dash color. "neutral" uses the subtle border color; others use the tone. */
  tone?: PixelTone;
  /** Line thickness in pixels (multiple of PX). Defaults to PX (4). */
  height?: number;
  style?: StyleProp<ViewStyle>;
}

/** A horizontal divider drawn as a repeating pixel dash, not a 1px hairline. */
export function PixelDivider({
  tone = "neutral",
  height = PX,
  style,
}: PixelDividerProps) {
  // useId keeps each divider's SVG pattern id unique (duplicate ids collide on web).
  const patternId = `pxdash-${useId()}`;
  const color = tone === "neutral" ? colors.border : toneShades[tone].base;

  return (
    <View style={[{ width: "100%", height }, style]}>
      <Svg width="100%" height={height}>
        <Defs>
          <Pattern
            id={patternId}
            width={PX * 2}
            height={height}
            patternUnits="userSpaceOnUse"
          >
            <Rect x={0} y={0} width={PX} height={height} fill={color} />
          </Pattern>
        </Defs>
        <Rect x={0} y={0} width="100%" height={height} fill={`url(#${patternId})`} />
      </Svg>
    </View>
  );
}
