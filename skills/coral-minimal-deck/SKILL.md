---
name: coral-minimal-deck
description: Create PowerPoint presentations in a distinctive "coral minimal" style — warm modern aesthetic with a coral signature accent, deep slate ink on white, mono code blocks, and a consistent visual motif across slides. Use this skill whenever the user asks for a slide deck, .pptx, presentation, or talk that should feel "minimal", "modern", "clean", "tasteful", "designed", or "not corporate-template-looking" — even if they don't explicitly name the style. Also use it when the user has previously praised this style and is making another deck. Outputs a polished .pptx using pptxgenjs.
---

# Coral Minimal Deck

A reusable design system for building polished PowerPoint decks that feel hand-crafted rather than template-generated. The signature: a coral accent (FF5A36) against deep slate ink on white, with a "sandwich" structure — dark title and closing slides bookending light content.

Think NYT graphics, Linear changelogs, Stripe docs — quiet, confident, all-whitespace.

## When to use this skill

Trigger this whenever the user asks for a presentation, slide deck, .pptx, talk, or anything similar that should look "designed". Also use it proactively if the user previously loved this style in the same conversation or memory and is making another deck. If the user explicitly asks for a different aesthetic (e.g. "make it dark mode" or "use the company blue") — adapt the system rather than abandoning it: swap the accent color, keep the structure.

Do not use this skill for: Google Slides (use a different approach), Keynote-specific features, or when the user wants a template-driven look like Pitch or Beautiful.ai.

## Workflow

The whole job is: copy the template, replace its slides with the user's content, run it, inspect, fix, ship. Don't reinvent the design system — it's already in the template. The template lives at `assets/template.js` inside this skill.

### 1 — Gather taste preferences (only if not obvious)

Before writing any slides, briefly check:
- **Audience** (internal eng / external / mixed) — affects how much technical jargon survives
- **Content density** — should every slide be kept, or is "consolidate where it makes sense" the call?
- **Brand/color override** — if the user has a brand color, swap `accent: "FF5A36"` for it. Keep the rest of the palette.
Skip this step if the user's request already answers all three (e.g. "rebuild my markdown deck for an internal eng audience, keep all slides, use your default style").

### 2 — Set up the project

Pick a working dir, copy the template, ensure `pptxgenjs` is reachable.

`SKILL_DIR` below = the directory containing this `SKILL.md` (i.e. the skill's own root). Resolve it from the path the harness gave you when loading the skill.

**Claude.ai sandbox** (writable `/home/claude`, npm-global at `/home/claude/.npm-global`):

```bash
mkdir -p /home/claude/deck && cd /home/claude/deck
cp "$SKILL_DIR/assets/template.js" ./build.js
export NODE_PATH=/home/claude/.npm-global/lib/node_modules
node -e "require('pptxgenjs'); console.log('ok')"  # verify
```

**Local / Claude Code CLI** (cwd is the user's repo; install locally, not globally):

```bash
WORKDIR="${WORKDIR:-./build/coral-deck}"
mkdir -p "$WORKDIR" && cd "$WORKDIR"
cp "$SKILL_DIR/assets/template.js" ./build.js
[ -d node_modules/pptxgenjs ] || npm install pptxgenjs
node -e "require('pptxgenjs'); console.log('ok')"  # verify
```

If pptxgenjs isn't installed: sandbox → `npm install -g pptxgenjs`; local → `npm install pptxgenjs` inside the working dir.

### 3 — Write the slides

The template ships with a fully-formed design system (colors, fonts, helpers) and one example slide. Read `references/layout-patterns.md` to see the catalog of slide patterns and pick ones that fit each piece of the user's content. Don't force every slide into the same layout — variety is the whole point.

Build incrementally. Add slides in batches of 3–5, then `node build.js` to catch syntax errors before piling on more. Don't write all 20 slides in one shot only to find a typo on slide 4 broke everything.

### 4 — Render and visually QA

```bash
node build.js   # writes Presentation.pptx
```

Convert to PDF, then to JPGs (one per slide) for visual inspection. Pick the conversion path that fits the environment:

**Claude.ai sandbox** — soffice helper is preinstalled:

```bash
python3 /mnt/skills/public/pptx/scripts/office/soffice.py --headless --convert-to pdf Presentation.pptx
```

**Local / Claude Code CLI** — use LibreOffice directly (install via `brew install --cask libreoffice` on macOS, or `apt install libreoffice` on Linux):

```bash
soffice --headless --convert-to pdf Presentation.pptx
```

Then in either env:

```bash
rm -f slide-*.jpg
pdftoppm -jpeg -r 100 Presentation.pdf slide
```

Then `view` each slide-*.jpg (sandbox) or open them in Preview / an image viewer (local). Look specifically for:
- **Code overflow** — text running past the dark panel. The `addCode` helper auto-sizes, but if you bypassed it, lines will spill out.
- **Arrows pointing wrong** — if you used custom shapes instead of `arrowRight/Down/Left`, arrowheads will render as boots or trowels. Always use the helpers.
- **Cards too tall/short** — content overflowing card boundaries, or huge empty space
- **Bottom edge clipping** — content extending past y=7.3 on the 7.5" tall canvas
- **Decorative emoji rendering as monochrome** when expected to be color (LibreOffice quirk — acceptable, since real PowerPoint renders them in color)
One fix-and-verify cycle is enough. Don't chase sub-pixel positioning.

### 5 — Deliver

**Claude.ai sandbox** — copy to outputs, then `present_files`:

```bash
cp Presentation.pptx /mnt/user-data/outputs/
```

**Local / Claude Code CLI** — copy (or move) to a location the user specified, or leave in the working dir and report the absolute path:

```bash
OUTDIR="${OUTDIR:-$HOME/Downloads}"
cp Presentation.pptx "$OUTDIR/"
echo "Wrote: $OUTDIR/Presentation.pptx"
```

No long postamble — the user just wants the file.

## Design philosophy (non-negotiable principles)

These rules are what separate this style from generic AI-template slop. Follow them.

1. **One color dominates.** Coral is the accent, not a fill. Use it on max ~5% of pixels per slide: a dot, a bar, one important word, an arrow. Never tile it.
2. **Sandwich structure.** Slide 1 (title) and the final slide (questions/closing) get the dark slate background. Every middle slide is white. This rhythm gives the deck a beginning, middle, and end without any extra effort.
3. **Repeated motif.** Every content slide has: section label top-left (small, gray, uppercase, letter-spaced) + slide number top-right (with a small coral dot). This carries the deck.
4. **No decorative bars under titles.** This is the #1 tell of AI-generated decks. Use whitespace to separate the title from content. The chrome at the top already provides structure.
5. **Vary the layout.** Two-column comparisons, icon-card grids, sequence diagrams, state graphs, layered stacks, tables, code blocks, big-stat callouts — pick whatever fits each slide's content. If two adjacent slides have the same layout, something is wrong.
6. **Code is monospaced and lives in dark panels** with a coral left accent bar. Always use the `addCode` helper — it handles sizing and syntax coloring.
7. **Whitespace is content.** Don't fill every inch. A slide with two sentences and a single accent line can be more powerful than a busy one.
## Reference files (read as needed)

- **`references/design-system.md`** — Full palette, fonts, motifs, sizing scale. Read this before you start, or any time you need to know the exact hex value for a color.
- **`references/layout-patterns.md`** — Catalog of slide layouts with code snippets for each (title, comparison, icon grid, sequence diagram, state machine, layered architecture, table, code block, takeaway list, closing). Read this when picking layouts for a deck.
- **`references/helpers.md`** — Documentation for every helper function in the template (`addChrome`, `addTitle`, `addCard`, `addCode`, `arrowRight`, etc.). Read this when you need to know what arguments a helper takes.
## Common pitfalls

- **Don't put `\n` inside text run strings** — pptxgenjs renders the line break visually but doesn't expand the box height, so content overflows. Always split into one text run per line with `breakLine: true`, or use `addCode` which does this for you.
- **Don't draw arrowheads as `RIGHT_TRIANGLE` shapes with rotation** — they render as awkward 3D-looking shapes. Use `line: { endArrowType: "triangle" }` on a LINE shape (the `arrowRight/Down/Left` helpers do this).
- **Don't include `#` in hex colors** — corrupts the .pptx file. Just `"FF5A36"`, not `"#FF5A36"`.
- **Don't reuse the same options object across multiple `addShape` calls** — pptxgenjs mutates objects in-place. If you need the same shadow on two shapes, create a fresh object each time (or wrap it in a function).
- **Don't add the dashed accent bar trope under titles** — see principle 4 above. The slide-chrome dot is the only decoration the top of a content slide gets.
## Output

A single `.pptx` file — in `/mnt/user-data/outputs/` on Claude.ai, or wherever step 5 dropped it locally. The file should be roughly 500KB–2MB for a 20-slide deck. If it's much larger, you've probably embedded raw images that should have been emoji or shapes.