import { Linking, Text, View } from "react-native";

import { AnimatedPressable } from "./AnimatedPressable";

const INSTAGRAM_HANDLE = "fart3much";
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

type InstagramLinkProps = {
  className?: string;
};

/** Instagram handle as a modern neon pill. Uses Linking so it works on web
 *  and native — no DOM anchor. */
export function InstagramLink({ className }: InstagramLinkProps) {
  return (
    <AnimatedPressable
      accessibilityRole="link"
      accessibilityLabel={`Loopt on Instagram, @${INSTAGRAM_HANDLE}`}
      onPress={() => Linking.openURL(INSTAGRAM_URL)}
      glow="rgba(228,92,255,0.35)"
      className={`flex-row items-center gap-2 rounded-full border border-line bg-surface2 px-5 py-3 ${
        className ?? ""
      }`}
    >
      <View className="h-2 w-2 rounded-full bg-magenta" />
      <Text className="font-sansmed text-sm text-muted">Instagram</Text>
      <Text className="font-sanssemi text-sm text-cyan">@{INSTAGRAM_HANDLE}</Text>
    </AnimatedPressable>
  );
}
