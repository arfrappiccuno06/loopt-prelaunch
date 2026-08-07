import { useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Pressable, Text, View } from "react-native";

import { colors, PX, toneShades, typography } from "@/lib/theme";

import { PixelFrame } from "./PixelFrame";
import type { PixelBaseProps, PixelSize, PixelTone } from "./types";
import { SIZE_METRICS } from "./types";

export interface PixelSegmentedOption<T extends string> {
  value: T;
  label: string;
}

export interface PixelSegmentedProps<T extends string> extends PixelBaseProps {
  options: PixelSegmentedOption<T>[];
  /** Currently selected value, or null when nothing is chosen. */
  value: T | null;
  onChange: (value: T) => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A row of pixel segments (radio group). Every segment reserves the same
 * shadow gutter so the row stays aligned; the selected one is rendered
 * "pressed-in" (sunk into its shadow) with the accent tone.
 */
export function PixelSegmented<T extends string>({
  options,
  value,
  onChange,
  tone = "cyan",
  size = "md",
  disabled = false,
  accessibilityLabel,
  style,
}: PixelSegmentedProps<T>) {
  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
      style={[
        { flexDirection: "row", gap: PX * 2, opacity: disabled ? 0.5 : 1 },
        style,
      ]}
    >
      {options.map((opt) => (
        <View key={opt.value} style={{ flex: 1 }}>
          <Segment
            selected={value === opt.value}
            label={opt.label}
            tone={tone}
            size={size}
            disabled={disabled}
            onPress={() => onChange(opt.value)}
          />
        </View>
      ))}
    </View>
  );
}

interface SegmentProps {
  selected: boolean;
  label: string;
  tone: PixelTone;
  size: PixelSize;
  disabled: boolean;
  onPress: () => void;
}

function Segment({ selected, label, tone, size, disabled, onPress }: SegmentProps) {
  const [pressed, setPressed] = useState(false);
  const t = toneShades[tone];
  const metrics = SIZE_METRICS[size];
  const sunk = selected || pressed;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => !disabled && setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      style={{ alignSelf: "stretch" }}
    >
      <PixelFrame
        frameColor={selected ? t.base : colors.border}
        fillColor={selected ? t.fill : colors.surfaceRaised}
        shadowColor={colors.borderDark}
        pressed={sunk}
        fullWidth
        contentStyle={{
          minHeight: metrics.minH,
          paddingHorizontal: metrics.padX,
          paddingVertical: metrics.padY,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: typography.fontMono,
            fontSize: metrics.font,
            letterSpacing: 0.5,
            color: selected ? t.base : colors.textMuted,
          }}
        >
          {label}
        </Text>
      </PixelFrame>
    </Pressable>
  );
}
