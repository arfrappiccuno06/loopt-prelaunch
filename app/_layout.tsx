// Polyfill the URL global so @supabase/supabase-js works here and on native
// later. Must run before anything imports the Supabase client.
import "react-native-url-polyfill/auto";
import "../global.css";

import {
  HankenGrotesk_400Regular,
  HankenGrotesk_500Medium,
  HankenGrotesk_600SemiBold,
} from "@expo-google-fonts/hanken-grotesk";
import { JetBrainsMono_500Medium } from "@expo-google-fonts/jetbrains-mono";
import {
  Silkscreen_400Regular,
  Silkscreen_700Bold,
} from "@expo-google-fonts/silkscreen";
import {
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
  useFonts,
} from "@expo-google-fonts/space-grotesk";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  // Load fonts client-side; render immediately so static export keeps content.
  useFonts({
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
    HankenGrotesk_400Regular,
    HankenGrotesk_500Medium,
    HankenGrotesk_600SemiBold,
    JetBrainsMono_500Medium,
    Silkscreen_400Regular,
    Silkscreen_700Bold,
  });

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#0e0b18" },
        }}
      />
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
