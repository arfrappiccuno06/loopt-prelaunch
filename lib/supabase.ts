import { createClient } from "@supabase/supabase-js";

// Both MUST be prefixed EXPO_PUBLIC_ so Expo inlines them at BUILD time.
// This is a static web export (no server runtime): all calls run client-side
// with the anon key, so security lives entirely in Postgres RLS — never put a
// service_role key here.
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase env vars. Set EXPO_PUBLIC_SUPABASE_URL and " +
      "EXPO_PUBLIC_SUPABASE_ANON_KEY in .env.local (and in your Vercel " +
      "project settings for deploys — they are inlined at build time).",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  // No auth in the app yet — don't persist or refresh sessions.
  auth: { persistSession: false },
});
