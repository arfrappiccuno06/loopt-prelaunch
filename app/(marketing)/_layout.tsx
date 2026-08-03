import { Stack } from "expo-router";

/** Pre-launch marketing pages. Header-less, full-bleed on the paper background. */
export default function MarketingLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
