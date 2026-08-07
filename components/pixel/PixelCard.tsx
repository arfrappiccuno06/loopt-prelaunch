import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Text, View } from "react-native";

import { colors, toneShades, typography } from "@/lib/theme";

import { PixelFrame } from "./PixelFrame";
import type { PixelTone } from "./types";

export interface PixelCardProps {
  children: ReactNode;
  /** Optional accent title bar (old-OS-window look). */
  title?: string;
  /** Tone for the title bar + frame when titled. Defaults to "cyan". */
  tone?: PixelTone;
  /** Raised with a stepped drop-shadow (default) vs a flat framed panel. */
  raised?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  /** Style for the body content region (default padding: 20). */
  contentStyle?: StyleProp<ViewStyle>;
}

/** A framed panel. With a `title` it reads like a retro OS window. */
export function PixelCard({
  children,
  title,
  tone = "cyan",
  raised = true,
  fullWidth = true,
  style,
  contentStyle,
}: PixelCardProps) {
  const t = toneShades[tone];
  const titled = !!title;

  return (
    <PixelFrame
      frameColor={titled ? t.base : colors.border}
      fillColor={colors.surface}
      shadowColor={raised ? colors.borderDark : undefined}
      inset={!raised}
      fullWidth={fullWidth}
      style={style}
      contentStyle={{ padding: 0 }}
    >
      {titled ? (
        <View style={{ backgroundColor: t.base, paddingHorizontal: 12, paddingVertical: 8 }}>
          <Text
            style={{
              fontFamily: typography.fontMono,
              fontSize: typography.size.sm,
              letterSpacing: 1,
              color: colors.ink,
            }}
          >
            {title}
          </Text>
        </View>
      ) : null}
      <View style={[{ padding: 20 }, contentStyle]}>{children}</View>
    </PixelFrame>
  );
}
