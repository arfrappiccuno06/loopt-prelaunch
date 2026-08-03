// Shared waitlist domain types. Kept separate from the submission logic so
// both the UI and lib/waitlist.ts import from a single source of truth.

export type WaitlistRole = "buy" | "sell" | "both";

export interface WaitlistSubmission {
  email: string;
  role: WaitlistRole;
}

export type WaitlistResult =
  | { ok: true }
  | { ok: false; error: string };
