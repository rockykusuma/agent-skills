# Design system reference

The full specification of the Coral Minimal aesthetic. The template at `assets/template.js` already contains all of these values — this file exists so you can look up specific values when customizing or when the user asks "what color is X?"

## Palette

The palette is designed so that *one color dominates* (slate ink on white background, ~85% of pixels), *one color accents* (coral, ~5% of pixels), and the rest are quiet support tones. Never give all colors equal weight.

| Token | Hex | Use |
|---|---|---|
| `bg` | `FFFFFF` | Slide background for all content slides |
| `bgDark` | `0F172A` | Title slide + closing slide background (slate-900) |
| `ink` | `0A0A0A` | Primary text — slide titles, key terms |
| `inkSoft` | `374151` | Body text, descriptions |
| `inkDim` | `64748B` | Captions, metadata, secondary info |
| `inkVeryDim` | `94A3B8` | Slide numbers, footer text, "barely there" labels |
| `accent` | `FF5A36` | **The coral signature.** Dots, accent bars, key word emphasis, arrows pointing to important things. Use sparingly. |
| `accentSoft` | `FFE9E2` | Coral-50. Icon circle backgrounds, soft highlights. |
| `slate` | `1F2937` | Strong dark headers when ink feels too plain |
| `panel` | `F8FAFC` | Subtle card / panel background. Almost white. |
| `panelDark` | `1E293B` | Dark code-block background |
| `border` | `E2E8F0` | Hairline borders on cards, table rules |
| `success` | `10B981` | Emerald. "true" indicators, success states. Use rarely. |
| `warning` | `F59E0B` | Amber. Warnings, attention. Use rarely. |

### Swapping the accent for a brand color

If the user has a brand color, replace **only** `accent` and `accentSoft`. Keep everything else.

```js
accent:     "1E88E5",      // their brand blue
accentSoft: "E3F2FD",      // the equivalent "50" tint
```

To get the soft version: take the brand color in HSL, push lightness up to ~95%. Or eyeball a "very light wash of this color".

## Fonts

```js
sans:     "Calibri",   // body, titles, labels
sansBold: "Calibri",   // same family — bold via the `bold: true` option
mono:     "Consolas",  // code, model names, technical identifiers
```

Calibri is chosen because it's universally available on Windows and Mac, renders well in LibreOffice, and looks modern without being trendy. If the user wants a more distinctive font, candidates that work well in PowerPoint without licensing issues: Cambria, Trebuchet MS, Georgia (header only). Avoid Arial — it's the default for a reason.

## Sizing scale

Use a consistent type scale. Don't introduce arbitrary sizes.

| Element | Size (pt) | Weight | Color |
|---|---|---|---|
| Title-slide hero | 96 | bold | white on slate |
| Title-slide subtitle | 24 | regular | light slate (CBD5E1) on dark |
| Closing "Questions?" | 72 | bold | white on slate |
| Slide title (content slides) | 32 | bold | ink |
| Slide subtitle | 14 | regular | inkDim |
| Section header within slide | 18–22 | bold | ink |
| Body text | 13–16 | regular | inkSoft |
| Caption / label | 10–11 | bold + charSpacing 3–4 | inkDim, UPPERCASE |
| Slide number | 9 | bold | inkVeryDim |
| Code (inline) | 11–13 | regular | (syntax-colored) on panelDark |
| Code (full-slide block) | 10–12 | regular | (syntax-colored) on panelDark |

The `charSpacing` property (note: not `letterSpacing`, which pptxgenjs silently ignores) is what gives small uppercase labels their "designed" feel. Use 3–5 for kicker labels.

## Geometry

Slide size: 13.333 × 7.5 inches (LAYOUT_WIDE, 16:9).

```js
const W = 13.333;
const H = 7.5;
const MARGIN = 0.6;
```

| Element | Position |
|---|---|
| Chrome row (section label + slide number) | y = 0.3, height 0.3 |
| Slide title | y = 0.75, height 0.7 |
| Slide subtitle | y = 1.45, height 0.35 |
| Content area | y = 2.1 – 7.1 (≈ 5" of usable height) |
| Bottom edge — keep clear | y > 7.3 |

Keep at least 0.5" margin from all slide edges. The template uses 0.6" which feels more generous.

## The motif

Every content slide carries the same chrome:

1. **Section label** top-left, uppercase, letter-spaced, gray.
   - Examples: `OVERVIEW`, `ARCHITECTURE`, `STEP 2 OF 4`, `MODELS`, `API`
2. **Coral dot** + **slide number** top-right, format `NN / TT` (e.g. `07 / 22`).

This carries the deck. Without it, slides feel like loose pages. With it, they feel like chapters in the same book.

## The sandwich

Slide 1 (title) and the final slide (closing) get the dark slate background. Every middle slide is white. This gives the deck a clear opening and ending without needing an "agenda" or "thank you" slide.

Optional: if the deck has distinct sections (e.g. "Part 1: Theory" / "Part 2: Practice"), you can insert a dark "section divider" slide between them, styled like a mini title slide. Don't overdo it — three or four sandwich slices is fine; ten is too many.

## Code block coloring

Inside dark code blocks, use this palette (the `CODE` object in the template):

| Token | Hex | What gets this color |
|---|---|---|
| `text` | `FFFFFF` | Default text — punctuation, parentheses, default identifiers |
| `keyword` | `FF9F87` | Language keywords: `func`, `class`, `var`, `let`, `if`, `switch`, `case`, `async`, `throws`, `return`, `in` |
| `type` | `F8C291` | Type names: `Int32`, `String`, `AuracastStreamer`, `View`, `Side` |
| `string` | `C5E8B7` | String literals, numeric literals, enum cases: `"hello"`, `42`, `.left`, `true`, `nil` |
| `fn` | `60A5FA` | Function names being called: `scan`, `print`, `ForEach`, `didDiscover...` |
| `comment` | `94A3B8` | `// line comments`, italic |
| `decorator` | `FFB86C` | `@State`, `@Observable`, attributes, italic |

These were tuned against the `panelDark` background. Don't substitute arbitrary syntax colors — they'll fight the background.

## What this aesthetic is NOT

To stay calibrated, here's what to avoid even when it would be easy:

- **Gradients** — pptxgenjs doesn't support them natively, and they almost always read as "early 2010s SaaS" anyway. Stick with solid colors.
- **Drop shadows on everything** — one or two shadows for emphasis is fine. Shadows on every card is template-y.
- **Stock photo backgrounds** — never. Solid colors only.
- **Three-color stripes / triangle motifs in the corner** — corporate template hallmark. Don't.
- **Rotated text** — never, except inside a deliberate vertical-text design element which we don't do here.
- **Emoji as a primary visual** — emojis are fine as small icons (📡, 👂, 📱) but shouldn't be the main attraction. They render inconsistently across platforms.
- **More than two font families** — pick sans + mono, stop.