import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";

type FadeInProps = {
  children: ReactNode;
  /** Stagger start in ms — lets sections cascade in. */
  delay?: number;
  style?: StyleProp<ViewStyle>;
};

/** Smooth entrance: fade up on mount. Cross-platform (RN Animated). */
export function FadeIn({ children, delay = 0, style }: FadeInProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(14)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 520,
        delay,
        useNativeDriver: false,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 520,
        delay,
        useNativeDriver: false,
      }),
    ]).start();
  }, [opacity, translateY, delay]);

  return (
    <Animated.View style={[{ opacity, transform: [{ translateY }] }, style]}>
      {children}
    </Animated.View>
  );
}
