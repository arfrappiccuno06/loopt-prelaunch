import type { ReactNode } from "react";
import { Image, ScrollView, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Toronto-night pixel-art skyline (animated WebP, ~558 KB). Drop a replacement
// at this exact path (assets/toronto-night.webp) to swap it — no code change
// needed. Animated WebP plays on web; the base RN <Image> shows a static frame
// on native — swap to expo-image for native motion.
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
  // Scale to cover the viewport with concrete pixel dimensions (on web,
  // percentage sizing on <Image> collapses to the art's intrinsic size and
  // leaves gaps). Then pin the image's right edge instead of centering the
  // crop, so the CN tower on the right stays framed when the sides get cropped
  // on narrow/portrait phones. Vertically centered.
  const scale = Math.max(width / ART_WIDTH, height / ART_HEIGHT);
  const artWidth = ART_WIDTH * scale;
  const artHeight = ART_HEIGHT * scale;
  return (
    <View className="flex-1 overflow-hidden bg-night">
      <Image
        source={SKYLINE}
        style={{
          position: "absolute",
          right: 0,
          top: (height - artHeight) / 2,
          width: artWidth,
          height: artHeight,
        }}
      />
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
