import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Text, View } from "react-native";

import { PX, toneShades, typography } from "@/lib/theme";

import { PixelFrame } from "./PixelFrame";
import type { PixelTone } from "./types";

export interface PixelBadgeProps {
  children: ReactNode;
  /** Accent tone. Defaults to "cyan". */
  tone?: PixelTone;
  size?: "sm" | "md";
  /** Optional leading icon slot. */
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const BADGE_METRICS = {
  sm: { padX: 8, padY: 4, font: 11 },
  md: { padX: 12, padY: 6, font: 13 },
} as const;

/** A small flat-framed tag — condition, size, price-drop, price, status. */
export function PixelBadge({
  children,
  tone = "cyan",
  size = "sm",
  icon,
  style,
}: PixelBadgeProps) {
  const t = toneShades[tone];
  const m = BADGE_METRICS[size];

  return (
    <PixelFrame
      frameColor={t.base}
      fillColor={t.fill}
      inset
      weight={PX}
      style={style}
      contentStyle={{
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: m.padX,
        paddingVertical: m.padY,
      }}
    >
      {icon ? <View style={{ width: m.font, height: m.font }}>{icon}</View> : null}
      <Text
        style={{
          fontFamily: typography.fontMono,
          fontSize: m.font,
          letterSpacing: 0.5,
          color: t.base,
        }}
      >
        {children}
      </Text>
    </PixelFrame>
  );
}
