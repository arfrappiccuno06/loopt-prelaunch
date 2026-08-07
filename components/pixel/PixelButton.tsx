import type { ReactNode } from "react";
import { useState } from "react";
import type {
  AccessibilityState,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from "react-native";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { colors, PX, toneShades, typography } from "@/lib/theme";

import { PixelFrame } from "./PixelFrame";
import type { PixelBaseProps } from "./types";
import { SIZE_METRICS } from "./types";

export type PixelButtonVariant = "solid" | "outline" | "ghost";

export interface PixelButtonProps extends PixelBaseProps {
  children: ReactNode;
  /** solid = tinted fill; outline = frame over page color; ghost = text only. */
  variant?: PixelButtonVariant;
  onPress?: (event: GestureResponderEvent) => void;
  /** Show a spinner and block interaction. */
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  /** Stretch to the parent's width. */
  fullWidth?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
}

interface VariantColors {
  frame: string;
  fill: string;
  shadow?: string;
  text: string;
  raised: boolean;
}

function resolveColors(
  variant: PixelButtonVariant,
  tone: PixelBaseProps["tone"] = "cyan",
): VariantColors {
  const t = toneShades[tone];
  switch (variant) {
    case "solid":
      return { frame: t.base, fill: t.fill, shadow: t.shadow, text: t.base, raised: true };
    case "outline":
      // Frame-forward: neutral dark body so the border reads as the accent.
      return { frame: t.base, fill: colors.bg, shadow: t.shadow, text: t.base, raised: true };
    case "ghost":
      return { frame: "transparent", fill: "transparent", text: t.base, raised: false };
  }
}

export function PixelButton({
  children,
  variant = "solid",
  tone = "cyan",
  size = "md",
  disabled = false,
  loading = false,
  onPress,
  iconLeft,
  iconRight,
  fullWidth = false,
  accessibilityLabel,
  accessibilityHint,
  style,
}: PixelButtonProps) {
  const [pressed, setPressed] = useState(false);
  const metrics = SIZE_METRICS[size];
  const c = resolveColors(variant, tone);
  const blocked = disabled || loading;

  const accessibilityState: AccessibilityState = {
    disabled: blocked,
    busy: loading,
  };

  const content = (
    <View
      style={{
        minHeight: metrics.minH,
        paddingHorizontal: metrics.padX,
        paddingVertical: metrics.padY,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: metrics.gap,
      }}
    >
      {loading ? (
        <ActivityIndicator color={c.text} size="small" />
      ) : iconLeft ? (
        <View style={{ width: metrics.icon, height: metrics.icon }}>{iconLeft}</View>
      ) : null}
      <Text
        numberOfLines={1}
        style={{
          fontFamily: typography.fontMono,
          fontSize: metrics.font,
          lineHeight: metrics.font + 2,
          color: c.text,
          letterSpacing: 0.5,
        }}
      >
        {children}
      </Text>
      {iconRight && !loading ? (
        <View style={{ width: metrics.icon, height: metrics.icon }}>{iconRight}</View>
      ) : null}
    </View>
  );

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => !blocked && setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={blocked}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={accessibilityState}
      style={[{ alignSelf: fullWidth ? "stretch" : "flex-start", opacity: disabled ? 0.45 : 1 }, style]}
    >
      {variant === "ghost" ? (
        <View
          style={{
            alignSelf: fullWidth ? "stretch" : "flex-start",
            backgroundColor: pressed ? toneShades[tone].fill : "transparent",
          }}
        >
          {content}
        </View>
      ) : (
        <PixelFrame
          frameColor={c.frame}
          fillColor={c.fill}
          shadowColor={c.shadow}
          pressed={pressed}
          weight={PX}
          fullWidth={fullWidth}
          contentStyle={{ opacity: loading ? 0.7 : 1 }}
        >
          {content}
        </PixelFrame>
      )}
    </Pressable>
  );
}
