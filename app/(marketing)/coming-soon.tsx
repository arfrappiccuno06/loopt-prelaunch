import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import { FadeIn } from "@/components/FadeIn";
import { InstagramLink } from "@/components/InstagramLink";
import { Screen } from "@/components/Screen";
import { Wordmark } from "@/components/Wordmark";
import { PixelButton } from "@/components/pixel";

export default function ComingSoon() {
  const router = useRouter();
  return (
    <Screen>
      <View className="items-center">
        <FadeIn>
          <Wordmark className="text-5xl text-text" />
        </FadeIn>

        <FadeIn delay={90} style={{ marginTop: 18 }}>
          <Text className="text-center font-sans text-lg leading-relaxed text-muted">
            Fairly priced secondhand fashion in Toronto.
          </Text>
        </FadeIn>

        <FadeIn delay={180} style={{ marginTop: 34 }}>
          <PixelButton
            tone="cyan"
            size="lg"
            onPress={() => router.push("/prelaunchsignup")}
            accessibilityLabel="Join the waitlist"
          >
            Join the waitlist
          </PixelButton>
        </FadeIn>

        <FadeIn delay={270} style={{ marginTop: 22 }}>
          <InstagramLink />
        </FadeIn>
      </View>
    </Screen>
  );
}
