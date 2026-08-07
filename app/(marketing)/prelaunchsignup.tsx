import { useState } from "react";
import { Text, View } from "react-native";

import { FadeIn } from "@/components/FadeIn";
import { InstagramLink } from "@/components/InstagramLink";
import { Screen } from "@/components/Screen";
import { Wordmark } from "@/components/Wordmark";
import {
  PixelButton,
  PixelCard,
  PixelCheck,
  PixelFrame,
  PixelInput,
  PixelSegmented,
} from "@/components/pixel";
import { toneShades, typography } from "@/lib/theme";
import { isValidEmail, submitWaitlist } from "@/lib/waitlist";
import type { WaitlistRole } from "@/types/waitlist";

type Status = "idle" | "loading" | "error" | "success";

const ROLES: { value: WaitlistRole; label: string }[] = [
  { value: "buy", label: "Buy" },
  { value: "sell", label: "Sell" },
  { value: "both", label: "Both" },
];

export default function PreLaunchSignup() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<WaitlistRole | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [attempted, setAttempted] = useState(false);

  const emailValid = isValidEmail(email);
  const showEmailError = attempted && email.trim().length > 0 && !emailValid;
  const showRoleError = attempted && role === null;
  const loading = status === "loading";

  async function handleSubmit() {
    setAttempted(true);
    if (!emailValid || role === null) {
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const result = await submitWaitlist({ email, role });
    if (result.ok) {
      setStatus("success");
    } else {
      setErrorMessage(result.error);
      setStatus("error");
    }
  }

  // Success replaces the form in place — no navigation.
  if (status === "success") {
    return (
      <Screen>
        <FadeIn>
          <PixelCard>
            <View style={{ alignItems: "center" }}>
              <PixelFrame
                frameColor={toneShades.green.base}
                fillColor={toneShades.green.fill}
                inset
                contentStyle={{
                  width: 52,
                  height: 52,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PixelCheck size={26} color={toneShades.green.base} />
              </PixelFrame>
              <Text className="mt-6 text-center font-pixel text-2xl text-text">
                You&apos;re in!
              </Text>
              <Text className="mt-3 text-center font-sans text-base leading-relaxed text-muted">
                We&apos;ll email you the moment Loopt opens in Toronto. Until then,
                follow along Loopt&apos;s journey!
              </Text>
              <InstagramLink className="mt-7" />
            </View>
          </PixelCard>
        </FadeIn>
      </Screen>
    );
  }

  return (
    <Screen>
      <FadeIn>
        <Wordmark className="text-4xl text-text" />
      </FadeIn>

      <FadeIn delay={70} style={{ marginTop: 20 }}>
        <Text className="font-pixel text-2xl leading-snug text-text">
          Secondhand fashion in Toronto, priced fairly.
        </Text>
        <Text className="mt-4 font-sans text-base leading-relaxed text-muted">
          Real closets at honest prices. Buy, sell, and trade with confidence. Add
          your closet to the Loop!
        </Text>
      </FadeIn>

      {/* Form card */}
      <FadeIn delay={150} style={{ marginTop: 28 }}>
        <PixelCard contentStyle={{ padding: 28 }}>
          {/* Email */}
          <PixelInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            inputMode="email"
            returnKeyType="go"
            onSubmitEditing={handleSubmit}
            disabled={loading}
            error={showEmailError ? "Enter a valid email address." : undefined}
          />

          {/* Role — segmented control */}
          <Text className="mb-2 mt-6 font-mono text-[11px] uppercase tracking-[2px] text-muted">
            I&apos;m mostly here to
          </Text>
          <PixelSegmented
            tone="magenta"
            options={ROLES}
            value={role}
            onChange={setRole}
            disabled={loading}
            accessibilityLabel="I'm mostly here to"
          />
          {showRoleError ? (
            <Text
              style={{
                fontFamily: typography.fontMono,
                fontSize: typography.size.xs,
                color: toneShades.red.base,
                marginTop: 8,
              }}
            >
              Pick one so we know how to welcome you.
            </Text>
          ) : null}

          {/* Submit */}
          <View style={{ marginTop: 24 }}>
            <PixelButton
              tone="cyan"
              fullWidth
              loading={loading}
              onPress={handleSubmit}
              accessibilityLabel="Join the waitlist"
            >
              {loading ? "Joining…" : "Join the waitlist"}
            </PixelButton>
          </View>

          {status === "error" ? (
            <PixelFrame
              frameColor={toneShades.red.base}
              fillColor={toneShades.red.fill}
              inset
              fullWidth
              style={{ marginTop: 16 }}
              contentStyle={{ paddingHorizontal: 12, paddingVertical: 10 }}
            >
              <Text
                style={{
                  fontFamily: typography.fontMono,
                  fontSize: typography.size.xs,
                  color: toneShades.red.base,
                  textAlign: "center",
                }}
              >
                {errorMessage}
              </Text>
            </PixelFrame>
          ) : null}
        </PixelCard>
      </FadeIn>
    </Screen>
  );
}
