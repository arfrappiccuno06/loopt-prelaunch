import { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";

import { AnimatedPressable } from "@/components/AnimatedPressable";
import { FadeIn } from "@/components/FadeIn";
import { InstagramLink } from "@/components/InstagramLink";
import { Screen } from "@/components/Screen";
import { Wordmark } from "@/components/Wordmark";
import { isValidEmail, submitWaitlist } from "@/lib/waitlist";
import type { WaitlistRole } from "@/types/waitlist";

type Status = "idle" | "loading" | "error" | "success";

const ROLES: { value: WaitlistRole; label: string }[] = [
  { value: "buy", label: "Buy" },
  { value: "sell", label: "Sell" },
  { value: "both", label: "Both" },
];

// Web-only smooth transitions (RN ignores these style keys on native).
// Typed loose because these CSS keys aren't in RN's style types.
const smooth: any =
  Platform.OS === "web"
    ? { transitionProperty: "all", transitionDuration: "160ms" }
    : null;

export default function PreLaunchSignup() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<WaitlistRole | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [focused, setFocused] = useState(false);

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
          <View className="items-center rounded-3xl border border-line bg-surface p-8">
            <View className="h-14 w-14 items-center justify-center rounded-full bg-cyan">
              <Text className="font-display text-2xl text-ink">✓</Text>
            </View>
            <Text className="mt-6 text-center font-display text-3xl text-text">
              You&apos;re in!
            </Text>
            <Text className="mt-3 text-center font-sans text-base leading-relaxed text-muted">
              We&apos;ll email you the moment Loopt opens in Toronto. Until then,
              follow along for early drops and updates.
            </Text>
            <InstagramLink className="mt-7" />
          </View>
        </FadeIn>
      </Screen>
    );
  }

  return (
    <Screen>
      <FadeIn>
        <Wordmark className="text-xl text-text" />
      </FadeIn>

      <FadeIn delay={70} style={{ marginTop: 20 }}>
        <Text className="font-display text-4xl leading-tight text-text">
          Secondhand fashion in Toronto, priced fairly.
        </Text>
        <Text className="mt-4 font-sans text-base leading-relaxed text-muted">
          No reseller markup — just real closets at honest prices. Every seller
          is vetted, so you can buy and sell with confidence.
        </Text>
      </FadeIn>

      {/* Form card */}
      <FadeIn delay={150} style={{ marginTop: 28 }}>
        <View
          className="rounded-3xl border border-line bg-surface p-5"
          style={{ boxShadow: "0px 24px 60px 0px rgba(0,0,0,0.45)" }}
        >
          {/* Email */}
          <Text className="mb-2 font-mono text-[11px] uppercase tracking-[2px] text-muted">
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="you@email.com"
            placeholderTextColor="#6c6690"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            inputMode="email"
            editable={!loading}
            returnKeyType="go"
            selectionColor="#74F5FF"
            onSubmitEditing={handleSubmit}
            className={`rounded-2xl border bg-surface2 px-4 py-3.5 font-sans text-base text-text ${
              showEmailError
                ? "border-error"
                : focused
                  ? "border-cyan"
                  : "border-line"
            }`}
            style={smooth}
          />
          {showEmailError ? (
            <Text className="mt-2 font-sans text-xs text-error">
              Enter a valid email address.
            </Text>
          ) : null}

          {/* Role — segmented control */}
          <Text className="mb-2 mt-6 font-mono text-[11px] uppercase tracking-[2px] text-muted">
            I&apos;m mostly here to
          </Text>
          <View className="flex-row gap-2.5">
            {ROLES.map((option) => {
              const selected = role === option.value;
              return (
                <View key={option.value} className="flex-1">
                  <AnimatedPressable
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    onPress={() => setRole(option.value)}
                    disabled={loading}
                    fullWidth
                    glow={selected ? "rgba(116,245,255,0.35)" : undefined}
                    className={`min-h-[52px] items-center justify-center rounded-2xl border ${
                      selected
                        ? "border-cyan bg-cyan"
                        : "border-line bg-surface2"
                    }`}
                  >
                    <Text
                      className={`font-sanssemi text-base ${
                        selected ? "text-ink" : "text-text"
                      }`}
                    >
                      {option.label}
                    </Text>
                  </AnimatedPressable>
                </View>
              );
            })}
          </View>
          {showRoleError ? (
            <Text className="mt-2 font-sans text-xs text-error">
              Pick one so we know how to welcome you.
            </Text>
          ) : null}

          {/* Submit */}
          <View className="mt-6">
            <AnimatedPressable
              accessibilityRole="button"
              accessibilityState={{ disabled: loading, busy: loading }}
              onPress={handleSubmit}
              disabled={loading}
              fullWidth
              glow="rgba(116,245,255,0.4)"
              className="min-h-[56px] flex-row items-center justify-center gap-2 rounded-2xl bg-cyan px-4"
            >
              {loading ? (
                <>
                  <ActivityIndicator color="#0b0a12" />
                  <Text className="font-sanssemi text-base text-ink">
                    Joining…
                  </Text>
                </>
              ) : (
                <Text className="font-sanssemi text-base text-ink">
                  Join the waitlist
                </Text>
              )}
            </AnimatedPressable>
          </View>

          {status === "error" ? (
            <View className="mt-4 rounded-xl border border-error/40 bg-error/10 px-3 py-2.5">
              <Text className="text-center font-sans text-xs text-error">
                {errorMessage}
              </Text>
            </View>
          ) : null}
        </View>
      </FadeIn>
    </Screen>
  );
}
