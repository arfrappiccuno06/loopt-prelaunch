# Loopt

A Toronto peer-to-peer secondhand fashion marketplace. This repo is the real
app — right now it only ships the pre-launch web pages, but it's scaffolded so
the mobile app slots in later.

## Stack

- **Expo SDK 57** + **Expo Router** (file-based routing)
- **TypeScript**, strict mode
- **NativeWind** (Tailwind for React Native)
- Web-first today, but everything is React Native compatible — no DOM elements.
  Screens use `View` / `Text` / `Pressable` / `TextInput` only.

## Commands

```bash
npm run web         # dev server (web)
npm run start       # dev server (pick a platform)
npm run export:web  # static web export → ./dist
npm run typecheck   # tsc --noEmit (strict)
```

The web export is configured for static output (`app.json` → `web.bundler: "metro"`,
`web.output: "static"`), so `./dist` is a plain static site you can host anywhere.

## Structure

```
app/
  _layout.tsx              Root layout (loads global.css, Stack)
  index.tsx                Reserved for the future app home screen — redirects to marketing for now
  (marketing)/             Pre-launch pages (route group; the folder name is NOT in the URL)
    _layout.tsx
    coming-soon.tsx        /coming-soon
    prelaunchsignup.tsx    /prelaunchsignup  ← the QR destination
components/                Wordmark, InstagramLink, Screen (shared, RN-compatible)
lib/
  waitlist.ts              ALL submission logic lives here (see below)
types/
  waitlist.ts              Shared waitlist types
```

### Routing note (`/`)

`app/index.tsx` is deliberately kept free for the future app home screen. Today it
`<Redirect>`s to `/coming-soon`, so visiting `/` lands on the marketing page. When
you build the real home screen, replace the redirect body — the marketing pages
keep living under `app/(marketing)/` untouched.

_(If you'd rather `/` render the Coming Soon page directly with no redirect/URL
change, move `coming-soon.tsx` to `app/(marketing)/index.tsx` and delete
`app/index.tsx`. Left as a redirect here to keep `index.tsx` reserved for the app.)_

## Background image

Both pages render on a full-bleed Toronto-night pixel-art skyline
(`components/Background.tsx`), with solid neon UI on top and smooth entrance /
press animations. A solid deep-navy placeholder ships at
`assets/toronto-night.png` so the build always works — **replace that file with
your skyline image, keeping the same filename**, and it just works (no code
change). Theme lives in `tailwind.config.js` (dark base, cyan/magenta/yellow
neon accents; Space Grotesk / Hanken Grotesk / JetBrains Mono).

## Waitlist submissions

`lib/waitlist.ts` is the single seam for the backend. Everything imports
`submitWaitlist({ email, role })` and `isValidEmail()` from it — no screen knows
where data goes. Swap the backend later by editing only this file.

Backend is **Supabase**, called client-side with the anon key (this is a static
export — there is no server runtime). Security lives entirely in Postgres
**RLS**: the anon role may `INSERT` into `waitlist` and nothing else — no read,
update, or delete. Duplicate signups (Postgres `23505`) are treated as success
and never surface an error.

### Environment variables

Copy `.env.example` → `.env.local` (gitignored) and fill in real values from
Supabase (**Settings → API**):

```
EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

The `EXPO_PUBLIC_` prefix is required — Expo inlines these into the bundle at
**build time**, not runtime. **Add the same two vars in your Vercel project
settings** (Settings → Environment Variables). Because they're baked in at build
time, changing them requires a **redeploy**; editing them without rebuilding does
nothing. Use the anon/public key only — never the `service_role` key.

### Database setup

Paste this into the Supabase SQL Editor (Supabase → SQL Editor → New query):

```sql
create table waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null check (role in ('buy','sell','both')),
  source text,
  created_at timestamptz default now()
);

alter table waitlist enable row level security;

-- Anonymous clients may INSERT signups only. With RLS enabled and no SELECT/
-- UPDATE/DELETE policy, the anon role cannot read, change, or remove any rows.
create policy "anon can insert waitlist signups"
  on waitlist
  for insert
  to anon
  with check (true);
```
# loopt-prelaunch
