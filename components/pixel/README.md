# Pixel components

A small internal pixel-art UI kit for LoopTO, built to render identically on
**iOS, Android, and web** (Expo static export). No third-party UI kit — most
pixel kits on npm are React-DOM-only and won't mount on native.

Visual language is modeled on [pxlkit.xyz](https://pxlkit.xyz/ui-kit), rebuilt
natively: each component is a **bright notched frame + dark tinted fill + bright
tone-colored text**, with an offset drop-shadow that collapses on press.

## Rules of the kit

- **Zero border radius.** Corners are notched (stepped), never rounded.
- **No `box-shadow`, no `borderWidth` for the frame.** Everything is nested,
  absolutely-positioned `<View>` layers — see [`PixelFrame`](./PixelFrame.tsx),
  the shared engine every component builds on. This is what keeps rendering
  identical across native and `react-native-web`.
- **4px pixel grid.** `PX = 4` (`lib/theme.ts`). Every border, offset, and gap
  is a multiple of it.
- **Typography:** monospace (JetBrains Mono) for all interactive text — button
  labels, field labels, input text, hints, badges, prices. Silkscreen is
  reserved for big headings / section titles / the wordmark. Long body copy
  stays on the sans (Hanken); the marketing headline stays Space Grotesk.
- **react-native-svg** is used only where a shape needs to be crisp and
  diagonal/tiled: the `PixelModal` checkerboard backdrop, `PixelDivider`'s dash
  pattern, and the pixel icons.

## Shared prop contract

Interactive components extend `PixelBaseProps`:

| Prop       | Type                                                        | Default  |
| ---------- | ----------------------------------------------------------- | -------- |
| `tone`     | `"cyan" \| "magenta" \| "green" \| "gold" \| "red" \| "neutral"` | `"cyan"` |
| `size`     | `"sm" \| "md" \| "lg"`                                       | `"md"`   |
| `disabled` | `boolean`                                                   | `false`  |

Size metrics live in [`types.ts`](./types.ts) (`SIZE_METRICS`) so every
component snaps to the same heights and padding.

### Tone model

Each tone is a `{ base, fill, shadow }` triple in `lib/theme.ts` (`toneShades`),
ordered so the raised effect always reads: **`bg < shadow < fill < base`**.

- `base` — the bright frame, label, and icon color
- `fill` — the dark tinted body
- `shadow` — the offset drop-shadow + pressed recess (kept above the page bg so
  it stays visible)

## Components

| Component        | Purpose                                                                 |
| ---------------- | ----------------------------------------------------------------------- |
| `PixelButton`    | `variant: solid \| outline \| ghost`, `loading`, `iconLeft/iconRight`, `fullWidth`. Press sinks the button into its shadow. |
| `PixelInput`     | Mono label, `icon`, `hint`, `error` (red frame + message), tone focus ring, `disabled`. Forwards all `TextInput` props. |
| `PixelSegmented` | Generic radio row `<T extends string>`; selected segment renders pressed-in with the accent. Drives the Buy/Sell/Both control. |
| `PixelCard`      | Framed panel; optional accent `title` bar (retro OS-window look).       |
| `PixelBadge`     | Small flat-framed tag — condition / size / price-drop / price.          |
| `PixelModal`     | Full-screen overlay with a dithered checkerboard backdrop + centered `PixelCard`. Tap backdrop to close. |
| `PixelDivider`   | Repeating pixel-dash line (not a hairline).                             |

Icons: `PixelCheck`, `PixelArrowRight`, `PixelSquare` (`icons.tsx`). Button icon
slots accept any `ReactNode`, so any SVG works.

```tsx
import { PixelButton, PixelInput, PixelSegmented } from "@/components/pixel";

<PixelButton tone="cyan" fullWidth onPress={submit}>Join the waitlist</PixelButton>
<PixelInput label="Email" error={showError ? "Enter a valid email." : undefined} />
<PixelSegmented tone="cyan" options={ROLES} value={role} onChange={setRole} />
```

## Notes / gotchas

- **Tokens are duplicated.** `lib/theme.ts` (TS, consumed by these components'
  `style` layers) and `tailwind.config.js` (CJS, consumed by page-level
  `className`s) hold the same hexes. The CJS config can't import the TS module —
  keep the two in sync when changing colors.
- **Nearest-neighbor scaling for pixel-art assets:** web uses
  `image-rendering: pixelated` (see `.skyline-bg` in `global.css`); native
  `<Image>` has no nearest-neighbor toggle, so avoid scaling art to non-integer
  multiples.
- **`PixelFrame` reserves a shadow gutter** (via the body's margin) so a raised
  element never overlaps its neighbor. `inset` disables the drop-shadow for flat
  boxes (inputs, badges, selected segments).
