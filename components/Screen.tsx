import type { ReactNode } from "react";
import { Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Toronto-night pixel-art skyline (animated WebP, ~558 KB). Drop a replacement
// at this exact path (assets/toronto-night.webp) to swap it — no code change
// needed. A plain flex-1 View fills the viewport reliably; the image is
// absolutely positioned to cover it (ImageBackground collapses to the image's
// intrinsic width on web). Note: animated WebP plays on web; the base RN
// <Image> shows a static frame on native — swap to expo-image for native motion.
const SKYLINE = require("../assets/toronto-night.webp");

type ScreenProps = {
  children: ReactNode;
};

/** Page shell: full-bleed skyline background + centered, max-width column. */
export function Screen({ children }: ScreenProps) {
  return (
    <View className="flex-1 bg-night">
      <Image
        source={SKYLINE}
        resizeMode="cover"
        className="absolute inset-0 h-full w-full"
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
