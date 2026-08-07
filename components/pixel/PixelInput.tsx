import type { ReactNode } from "react";
import { useState } from "react";
import type {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Platform, Text, TextInput, View } from "react-native";

import { colors, PX, toneShades, typography } from "@/lib/theme";

// react-native-web renders TextInput as a DOM <input>, which draws the browser's
// default focus outline inside our frame. Suppress it — the cyan notched frame is
// our focus indicator. Keyed off Platform so native never sees the web-only prop.
const WEB_OUTLINE_RESET =
  Platform.OS === "web" ? ({ outlineStyle: "none" } as unknown as TextStyle) : null;

import { PixelFrame } from "./PixelFrame";
import type { PixelBaseProps } from "./types";
import { SIZE_METRICS } from "./types";

export interface PixelInputProps
  extends PixelBaseProps,
    Omit<TextInputProps, "style" | "editable"> {
  /** Mono label rendered above the field. */
  label?: string;
  /** Muted helper text below the field (hidden while an error shows). */
  hint?: string;
  /** Error message below the field; also turns the frame red. */
  error?: string;
  /** Leading icon slot inside the field. */
  icon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

export function PixelInput({
  label,
  hint,
  error,
  icon,
  tone = "cyan",
  size = "md",
  disabled = false,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  placeholderTextColor,
  selectionColor,
  ...textInputProps
}: PixelInputProps) {
  const [focused, setFocused] = useState(false);
  const metrics = SIZE_METRICS[size];
  const hasError = !!error;

  // Frame color: error → red, focused → tone, otherwise neutral border.
  const frameColor = hasError
    ? toneShades.red.base
    : focused
      ? toneShades[tone].base
      : colors.border;

  const handleFocus: NonNullable<TextInputProps["onFocus"]> = (e) => {
    setFocused(true);
    onFocus?.(e);
  };
  const handleBlur: NonNullable<TextInputProps["onBlur"]> = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[{ opacity: disabled ? 0.5 : 1 }, containerStyle]}>
      {label ? (
        <Text
          style={{
            fontFamily: typography.fontMono,
            fontSize: typography.size.xs,
            letterSpacing: 1,
            color: colors.textMuted,
            marginBottom: PX + 2,
          }}
        >
          {label}
        </Text>
      ) : null}

      <PixelFrame
        frameColor={frameColor}
        fillColor={colors.surfaceRaised}
        inset
        weight={PX}
        fullWidth
        contentStyle={{
          minHeight: metrics.minH,
          paddingHorizontal: metrics.padX,
          paddingVertical: 0,
          flexDirection: "row",
          alignItems: "center",
          gap: metrics.gap,
        }}
      >
        {icon ? (
          <View style={{ width: metrics.icon, height: metrics.icon }}>{icon}</View>
        ) : null}
        <TextInput
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={placeholderTextColor ?? colors.textMuted}
          selectionColor={selectionColor ?? toneShades[tone].base}
          style={[
            {
              flex: 1,
              // padding lives on the row; keep the input flush and grid-aligned
              paddingVertical: metrics.padY,
              fontFamily: typography.fontMono,
              fontSize: metrics.font,
              color: colors.textPrimary,
            },
            WEB_OUTLINE_RESET,
            inputStyle,
          ]}
          {...textInputProps}
        />
      </PixelFrame>

      {hasError ? (
        <Text
          style={{
            fontFamily: typography.fontMono,
            fontSize: typography.size.xs,
            color: toneShades.red.base,
            marginTop: PX + 2,
          }}
        >
          {error}
        </Text>
      ) : hint ? (
        <Text
          style={{
            fontFamily: typography.fontMono,
            fontSize: typography.size.xs,
            color: colors.textMuted,
            marginTop: PX + 2,
          }}
        >
          {hint}
        </Text>
      ) : null}
    </View>
  );
}
