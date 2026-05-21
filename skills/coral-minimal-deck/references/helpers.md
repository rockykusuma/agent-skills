# Helpers reference

Documentation for every helper function in the template. These are designed to do the boring repetitive work consistently across slides so you can focus on content. Read this when you need to know what arguments a helper takes.

## `addChrome(slide, section, num, total)`

Adds the page chrome — section label top-left, slide number top-right with coral dot — to a content slide. Call this once per content slide. **Don't call it on title or closing slides** (they have their own chrome).

```js
addChrome(slide, "Architecture", 13, 22);
// Renders:  ARCHITECTURE  in top-left,   • 13 / 22  in top-right
```

| Arg | Type | Notes |
|---|---|---|
| `slide` | object | The pptxgenjs slide |
| `section` | string | Short category label. Will be uppercased. Pass falsy to skip the section label entirely. |
| `num` | number | Current slide number (1-indexed) |
| `total` | number | Total number of slides in the deck |

The `total` is repeated on every slide so you need to know your final slide count when calling this. Track it as a `const TOTAL = 22;` at the top and use it everywhere.

## `addTitle(slide, title, subtitle)`

Adds the standard slide title block (and optional subtitle). Positioned at y=0.75 / 1.45 — leaves the area below y=2.1 free for content.

```js
addTitle(slide, "Streaming state machine", "AuracastStreamingState transitions through five states.");
```

| Arg | Type | Notes |
|---|---|---|
| `slide` | object | The slide |
| `title` | string | Slide title (32pt bold, ink color) |
| `subtitle` | string \| undefined | Optional one-line subtitle (14pt, inkDim color). Pass falsy or omit to skip. |

## `addCard(slide, x, y, w, h, opts)`

Draws a card/panel — a rectangle with subtle background and hairline border. Used for grouping content visually.

```js
addCard(slide, 1, 2, 5, 3);                                  // default panel bg, default border
addCard(slide, 1, 2, 5, 3, { fill: "FFFFFF" });              // white fill
addCard(slide, 1, 2, 5, 3, { border: C.accent });            // coral border (signals "highlighted")
addCard(slide, 1, 2, 5, 3, { fill: C.accentSoft, border: C.accentSoft });  // soft coral wash
```

| Arg | Type | Notes |
|---|---|---|
| `slide` | object | The slide |
| `x, y, w, h` | numbers | Position and size in inches |
| `opts.fill` | hex string | Fill color. Default: `C.panel` |
| `opts.border` | hex string | Border color. Default: `C.border` |

## `arrowRight(slide, x, y, len, color, width)`

Draws a horizontal arrow pointing right. Uses pptxgenjs's `endArrowType: "triangle"` for a clean arrowhead — never use rotated `RIGHT_TRIANGLE` shapes for arrows (they render weirdly).

```js
arrowRight(slide, 2, 3, 4);                    // length 4", default gray, default width
arrowRight(slide, 2, 3, 4, C.accent);          // coral
arrowRight(slide, 2, 3, 4, C.success, 2);      // green, thicker stroke
```

| Arg | Type | Notes |
|---|---|---|
| `slide` | object | The slide |
| `x, y` | numbers | Start point |
| `len` | number | Length in inches |
| `color` | hex string | Default `C.inkDim` |
| `width` | number | Stroke width in pt. Default 1.25 |

## `arrowLeft(slide, x, y, len, color, width)`

Same as `arrowRight` but the arrowhead is on the *start* of the line (uses `beginArrowType`). Use for return messages in sequence diagrams.

```js
arrowLeft(slide, 2, 3, 4, C.success);   // green left-pointing arrow ←
```

The line goes from (x, y) to (x + len, y), but the arrowhead points to (x, y).

## `arrowDown(slide, x, y, len, color, width)`

Vertical arrow pointing down.

```js
arrowDown(slide, 5, 3, 1.5, C.accent);
```

The arrow starts at (x, y) and extends `len` inches downward.

## `addCode(slide, x, y, w, lines, opts)`

The most important helper. Renders a syntax-colored code block on a dark panel with a coral left accent bar. **Always use this for code.** Don't try to compose code blocks manually — embedded `\n` characters in pptxgenjs text runs cause layout bugs.

```js
const blockHeight = addCode(slide, MARGIN, 2.5, W - 2*MARGIN, [
  // Each inner array is one rendered line
  [
    { text: "func", color: CODE.keyword, bold: true },
    { text: " scan", color: CODE.fn },
    { text: "(side: ", color: CODE.text },
    { text: "Side", color: CODE.type },
    { text: ") {", color: CODE.text },
  ],
  [
    { text: "  ", color: CODE.text },
    { text: "// implementation here", color: CODE.comment, italic: true },
  ],
  [
    { text: "}", color: CODE.text },
  ],
]);
// Returns the rendered height — useful for placing labels below the block
```

### Arguments

| Arg | Type | Notes |
|---|---|---|
| `slide` | object | The slide |
| `x, y, w` | numbers | Top-left position and width. Height is auto-computed. |
| `lines` | array of arrays | Each inner array is one rendered line. Each element is a text run: `{ text, color, bold?, italic? }`. |
| `opts.fontSize` | number | Default 13. Drop to 10-11 for dense full-slide code blocks. |
| `opts.lineSpacing` | number | Default 1.3. Tighter values (1.18-1.2) for dense blocks. |
| `opts.padTop` | number | Top padding inside the dark panel. Default 0.2 |
| `opts.padX` | number | Left/right padding. Default 0.3 |

Returns the rendered height of the block in inches.

### How to write `lines`

Each line is an array of text "runs", each with its own color/styling. The helper handles `breakLine: true` on the line-final run automatically — you don't need to add it yourself.

For a single-color line, just use one run: `[{ text: "  }", color: CODE.text }]`.

For mixed coloring, break the line into runs at every color change:

```js
[
  { text: "func", color: CODE.keyword },              // "func" in keyword color
  { text: " scanForBroadcasts", color: CODE.fn },     // function name in blue
  { text: "() -> ", color: CODE.text },               // default punctuation
  { text: "[String]", color: CODE.type },             // return type
]
```

### Use the `CODE` palette

Reference `CODE.keyword`, `CODE.type`, `CODE.string`, `CODE.fn`, `CODE.comment`, `CODE.decorator`, `CODE.text` — these are tuned to look right against the dark background. Don't substitute arbitrary hex values.

### Empty lines

To get a blank line in the rendered output, include `[{ text: " ", color: CODE.text }]` — a single space. An empty array won't work because there are no runs to attach the breakLine to.

### Long code blocks

If you have 25+ lines, drop the font size to 10pt and use lineSpacing 1.18:

```js
addCode(slide, MARGIN, 2.15, W - 2*MARGIN, manyLines,
        { fontSize: 10, lineSpacing: 1.18, padTop: 0.15 });
```

Don't go below 10pt — the back of the room can't read it. If 10pt still overflows, the right answer is to compress the code (combine `} } }`, drop comments) or split across two slides.

## Constants you can use

The template exports these at module scope for use throughout your slides:

| Constant | Value | Use |
|---|---|---|
| `W` | 13.333 | Slide width in inches |
| `H` | 7.5 | Slide height in inches |
| `MARGIN` | 0.6 | Standard outer margin |
| `C` | object | Color palette — see [design-system.md](design-system.md) |
| `F` | object | Fonts — `F.sans`, `F.sansBold`, `F.mono` |
| `CODE` | object | Code syntax color palette |

## Patterns the helpers DON'T cover (do these inline)

Some things are slide-specific enough that they're not worth helperizing. Do them inline in the slide block:

- **Numbered circles** (step wizard) — see [numbered step wizard](layout-patterns.md#numbered-step-wizard) pattern
- **State machine nodes** — define `stateNode()` inline in the slide; it's only used in that one slide
- **Phone UI mockups** — fully custom per slide; not reusable enough to abstract
- **Audio bar visualizations / signal strength bars** — define inline
- **Lifelines in sequence diagrams** — just dashed `addShape(LINE, ...)` calls

The general rule: if you'd use it on 3+ slides, helperize it. Less than that, inline.

## Anti-patterns

These don't have helpers because they shouldn't exist in this aesthetic:

- ~~`addAccentBar()`~~ — accent bars under titles are AI-template tells. Use whitespace.
- ~~`addFooter()`~~ — there's no footer. The slide number chrome covers metadata needs.
- ~~`addLogo()`~~ — the spec says no branding. If the user asks for a logo, place it inline with proper restraint (small, top-left in the chrome row, monochrome if possible).
- ~~`addGradient()`~~ — pptxgenjs doesn't support gradients natively, and they're not in the aesthetic anyway.