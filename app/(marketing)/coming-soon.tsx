import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import { AnimatedPressable } from "@/components/AnimatedPressable";
import { FadeIn } from "@/components/FadeIn";
import { InstagramLink } from "@/components/InstagramLink";
import { Screen } from "@/components/Screen";
import { Wordmark } from "@/components/Wordmark";

export default function ComingSoon() {
  const router = useRouter();
  return (
    <Screen>
      <View className="items-center">
        <FadeIn>
          <View className="flex-row items-center gap-2 rounded-full border border-line bg-surface2 px-4 py-2">
            <View className="h-1.5 w-1.5 rounded-full bg-cyan" />
            <Text className="font-mono text-[11px] uppercase tracking-[3px] text-cyan">
              Coming soon
            </Text>
          </View>
        </FadeIn>

        <FadeIn delay={90} style={{ marginTop: 26 }}>
          <Wordmark className="text-6xl text-text" />
        </FadeIn>

        <FadeIn delay={180} style={{ marginTop: 18 }}>
          <Text className="text-center font-sans text-lg leading-relaxed text-muted">
            Fairly priced secondhand fashion in Toronto.
          </Text>
        </FadeIn>

        <FadeIn delay={270} style={{ marginTop: 34 }}>
          <AnimatedPressable
            accessibilityRole="button"
            onPress={() => router.push("/prelaunchsignup")}
            glow="rgba(116,245,255,0.4)"
            className="min-h-[56px] flex-row items-center justify-center rounded-2xl bg-cyan px-8"
          >
            <Text className="font-sanssemi text-base text-ink">
              Join the waitlist
            </Text>
          </AnimatedPressable>
        </FadeIn>

        <FadeIn delay={340} style={{ marginTop: 22 }}>
          <InstagramLink />
        </FadeIn>
      </View>
    </Screen>
  );
}
