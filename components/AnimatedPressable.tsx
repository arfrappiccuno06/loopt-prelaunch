import type { ReactNode } from "react";
import { useRef } from "react";
import { Animated, Pressable } from "react-native";
import type {
  AccessibilityRole,
  AccessibilityState,
  GestureResponderEvent,
} from "react-native";

type AnimatedPressableProps = {
  children: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  /** Visual + layout classes for the pressable face. */
  className?: string;
  /** Optional neon glow color (CSS rgba/hex) applied as a soft shadow. */
  glow?: string;
  fullWidth?: boolean;
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel?: string;
  accessibilityState?: AccessibilityState;
};

/** Modern pressable: smooth spring scale on press + optional neon glow. The
 *  scale lives on a plain Animated.View wrapper (style only) so it composes
 *  cleanly with NativeWind classes on the inner Pressable. */
export function AnimatedPressable({
  children,
  onPress,
  disabled = false,
  className,
  glow,
  fullWidth = false,
  accessibilityRole = "button",
  accessibilityLabel,
  accessibilityState,
}: AnimatedPressableProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const spring = (toValue: number) =>
    Animated.spring(scale, {
      toValue,
      useNativeDriver: false,
      speed: 50,
      bounciness: 4,
    }).start();

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? "100%" : undefined,
      }}
    >
      <Pressable
        onPress={onPress}
        onPressIn={() => {
          if (!disabled) spring(0.96);
        }}
        onPressOut={() => spring(1)}
        disabled={disabled}
        accessibilityRole={accessibilityRole}
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled, ...accessibilityState }}
        className={className}
        style={glow ? { boxShadow: `0px 10px 34px 0px ${glow}` } : undefined}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
