// ─────────────────────────────────────────────────────────────────────────────
// The ONE place waitlist submission is configured.
//
// Every screen imports `submitWaitlist` / `isValidEmail` from here and knows
// nothing about the backend. Backend is Supabase (client-side, anon key) —
// swapping it later means editing only this file.
// ─────────────────────────────────────────────────────────────────────────────

import { supabase } from "@/lib/supabase";
import type { WaitlistResult, WaitlistSubmission } from "@/types/waitlist";

// Where the signup came from — stored for future attribution.
const SOURCE = "prelaunch";

// Pragmatic email shape check — one source of truth, reused by the UI so the
// submit button and the network layer agree on what "valid" means.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Postgres unique_violation — the `email` column's UNIQUE constraint firing.
const PG_UNIQUE_VIOLATION = "23505";

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

/**
 * Submit an email + role to the waitlist.
 *
 * Resolves to `{ ok: true }` on success. A duplicate signup is treated as a
 * success — someone re-submitting the same email should never see an error.
 * Only genuine failures (bad email, network, unexpected DB error) resolve to
 * `{ ok: false, error }`, and never expose the raw Supabase error.
 */
export async function submitWaitlist({
  email,
  role,
}: WaitlistSubmission): Promise<WaitlistResult> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!isValidEmail(normalizedEmail)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  try {
    // No .select() — the anon role has INSERT only, no SELECT, so asking for
    // the inserted row back would error. No .upsert() either (needs UPDATE).
    const { error } = await supabase
      .from("waitlist")
      .insert({ email: normalizedEmail, role, source: SOURCE });

    if (!error) {
      return { ok: true };
    }

    // Already on the list → treat as success, never an error.
    if (error.code === PG_UNIQUE_VIOLATION) {
      return { ok: true };
    }

    // Never surface raw Supabase errors to the user.
    console.error("waitlist insert failed:", error); // TEMP: remove after debugging
    return { ok: false, error: "Something went wrong. Please try again." };
  } catch {
    return {
      ok: false,
      error: "Network error. Check your connection and try again.",
    };
  }
}
