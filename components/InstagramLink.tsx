import { Linking, Pressable, Text, View } from "react-native";

import { PixelFrame } from "@/components/pixel";
import { colors, toneShades, typography } from "@/lib/theme";

const INSTAGRAM_HANDLE = "loopt.to";
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

type InstagramLinkProps = {
  className?: string;
};

/** Instagram handle as a pixel pill. Uses Linking so it works on web and
 *  native — no DOM anchor. */
export function InstagramLink({ className }: InstagramLinkProps) {
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={`Loopt on Instagram, @${INSTAGRAM_HANDLE}`}
      onPress={() => Linking.openURL(INSTAGRAM_URL)}
      className={className}
      style={{ alignSelf: "center" }}
    >
      <PixelFrame
        frameColor={colors.border}
        fillColor={colors.surfaceRaised}
        inset
        contentStyle={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          paddingHorizontal: 20,
          paddingVertical: 12,
        }}
      >
        <View style={{ width: 8, height: 8, backgroundColor: toneShades.magenta.base }} />
        <Text style={{ fontFamily: typography.fontMono, fontSize: typography.size.sm, color: colors.textMuted }}>
          Instagram
        </Text>
        <Text style={{ fontFamily: typography.fontMono, fontSize: typography.size.sm, color: toneShades.cyan.base }}>
          @{INSTAGRAM_HANDLE}
        </Text>
      </PixelFrame>
    </Pressable>
  );
}
