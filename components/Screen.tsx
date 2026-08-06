import type { ReactNode } from "react";
import { Image, Platform, ScrollView, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Toronto-night pixel-art skyline (animated WebP, ~1 MB). On web it's rendered
// as a CSS background (see `.skyline-bg` in global.css) sourced from
// public/toronto-night.webp, so it paints on first load without waiting for JS.
// Native uses this bundled copy via <Image>. To swap the art, replace BOTH
// assets/toronto-night.webp and public/toronto-night.webp. Animated WebP plays
// on web; the base RN <Image> shows a static frame on native — swap to
// expo-image for native motion.
const SKYLINE = require("../assets/toronto-night.webp");

// Native art dimensions of the skyline WebP, used to compute a cover-fit crop.
const ART_WIDTH = 1376;
const ART_HEIGHT = 768;

type ScreenProps = {
  children: ReactNode;
};

/** Page shell: full-bleed skyline background + centered, max-width column. */
export function Screen({ children }: ScreenProps) {
  const { width, height } = useWindowDimensions();
  // Native: scale to cover with concrete pixel dimensions, pinning the right
  // edge so the CN tower stays framed on narrow screens (vertically centered).
  const scale = Math.max(width / ART_WIDTH, height / ART_HEIGHT);
  const artWidth = ART_WIDTH * scale;
  const artHeight = ART_HEIGHT * scale;
  return (
    <View className="flex-1 overflow-hidden bg-night">
      {Platform.OS === "web" ? (
        <View className="skyline-bg absolute inset-0" />
      ) : (
        <Image
          source={SKYLINE}
          resizeMode="cover"
          style={{
            position: "absolute",
            right: 0,
            top: (height - artHeight) / 2,
            width: artWidth,
            height: artHeight,
          }}
        />
      )}
      <View className="absolute inset-0 bg-night/55" />
      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerClassName="flex-grow items-center justify-center px-5 py-16"
          keyboardShouldPersistTaps="handled"
        >
          <View className="w-full max-w-md">{children}</View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
