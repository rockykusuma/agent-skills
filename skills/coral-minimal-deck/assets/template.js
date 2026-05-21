// Coral Minimal Deck — pptxgenjs template
// Replace the title, file name, and example slides with your content.
// The design system at the top should not need editing for most decks.

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";   // 13.333" x 7.5"
pres.author = "";              // fill in
pres.title  = "";              // fill in

// ═════════════════════════════════════════════════════════════════════════
// DESIGN SYSTEM — edit only the `accent` if the user has a brand color.
// ═════════════════════════════════════════════════════════════════════════
const C = {
  bg:         "FFFFFF",   // pure white — minimal modern
  bgDark:     "0F172A",   // slate-900 — title + closing slides
  ink:        "0A0A0A",   // primary text
  inkSoft:    "374151",   // body text
  inkDim:     "64748B",   // captions, metadata
  inkVeryDim: "94A3B8",   // slide numbers, footer
  accent:     "FF5A36",   // coral — the signature. Swap for brand if needed.
  accentSoft: "FFE9E2",   // coral-50 — very light wash for icon bgs
  slate:      "1F2937",   // strong headers
  panel:      "F8FAFC",   // subtle bg for cards
  panelDark:  "1E293B",   // dark code background
  border:     "E2E8F0",   // hairlines
  success:    "10B981",   // emerald — sparingly
  warning:    "F59E0B",   // amber — sparingly
};

const F = {
  sans:     "Calibri",
  sansBold: "Calibri",
  mono:     "Consolas",
};

const W = 13.333;
const H = 7.5;
const MARGIN = 0.6;

// ═════════════════════════════════════════════════════════════════════════
// REUSABLE COMPONENTS
// ═════════════════════════════════════════════════════════════════════════

// Page chrome — section label top-left, slide number top-right with coral dot.
// Call this once at the top of every content slide.
function addChrome(slide, section, num, total) {
  if (section) {
    slide.addText(section.toUpperCase(), {
      x: MARGIN, y: 0.3, w: 6, h: 0.3,
      fontFace: F.sans, fontSize: 9, color: C.inkVeryDim,
      bold: true, charSpacing: 4, margin: 0,
    });
  }
  slide.addShape(pres.shapes.OVAL, {
    x: W - MARGIN - 0.85, y: 0.39, w: 0.09, h: 0.09,
    fill: { color: C.accent }, line: { color: C.accent },
  });
  slide.addText(`${String(num).padStart(2, "0")} / ${total}`, {
    x: W - MARGIN - 0.7, y: 0.3, w: 0.7, h: 0.3,
    fontFace: F.sans, fontSize: 9, color: C.inkVeryDim,
    align: "right", bold: true, charSpacing: 2, margin: 0,
  });
}

// Standard slide title + optional subtitle
function addTitle(slide, title, subtitle) {
  slide.addText(title, {
    x: MARGIN, y: 0.75, w: W - 2 * MARGIN, h: 0.7,
    fontFace: F.sansBold, fontSize: 32, bold: true,
    color: C.ink, margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: MARGIN, y: 1.45, w: W - 2 * MARGIN, h: 0.35,
      fontFace: F.sans, fontSize: 14, color: C.inkDim, margin: 0,
    });
  }
}

// Card / panel
function addCard(slide, x, y, w, h, opts = {}) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: opts.fill || C.panel },
    line: { color: opts.border || C.border, width: 0.75 },
  });
}

// Right-pointing arrow — clean line with triangular arrowhead.
function arrowRight(slide, x, y, len, color = C.inkDim, width = 1.25) {
  slide.addShape(pres.shapes.LINE, {
    x, y, w: len, h: 0,
    line: { color, width, endArrowType: "triangle" },
  });
}

// Left-pointing arrow.
function arrowLeft(slide, x, y, len, color = C.inkDim, width = 1.25) {
  slide.addShape(pres.shapes.LINE, {
    x, y, w: len, h: 0,
    line: { color, width, beginArrowType: "triangle" },
  });
}

// Down-pointing arrow.
function arrowDown(slide, x, y, len, color = C.inkDim, width = 1.25) {
  slide.addShape(pres.shapes.LINE, {
    x, y, w: 0, h: len,
    line: { color, width, endArrowType: "triangle" },
  });
}

// Multi-line code block with syntax coloring.
// `lines` is an array of arrays of { text, color, bold?, italic? } runs.
// Each inner array becomes one rendered line. Auto-sizes height to fit.
// Returns the rendered height so you can place content below it.
function addCode(slide, x, y, w, lines, opts = {}) {
  const fontSize = opts.fontSize || 13;
  const lineSp   = opts.lineSpacing || 1.3;
  const padTop   = opts.padTop || 0.2;
  const padX     = opts.padX || 0.3;
  // pptxgenjs renders lines a bit taller than (fontSize × lineSpacing) suggests.
  // Use max(declared, 1.4) and a small +0.2-line fudge so the last line stays inside.
  const lineH = (fontSize / 72) * Math.max(lineSp, 1.4);
  const h = padTop * 2 + lineH * (lines.length + 0.2);

  // Dark background
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.panelDark }, line: { type: "none" },
  });
  // Coral accent bar on left
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.06, h,
    fill: { color: C.accent }, line: { type: "none" },
  });

  // Flatten lines into text runs with breakLine on line-final runs
  const runs = [];
  lines.forEach((line, lineIdx) => {
    line.forEach((run, runIdx) => {
      const isLastInLine = runIdx === line.length - 1;
      const isLastLine   = lineIdx === lines.length - 1;
      runs.push({
        text: run.text,
        options: {
          color:  run.color  || "FFFFFF",
          bold:   run.bold   || false,
          italic: run.italic || false,
          breakLine: isLastInLine && !isLastLine,
        },
      });
    });
  });

  slide.addText(runs, {
    x: x + padX, y: y + padTop, w: w - padX - 0.15, h: h - padTop,
    fontFace: F.mono, fontSize,
    lineSpacingMultiple: lineSp, margin: 0, valign: "top",
  });

  return h;
}

// Syntax-color palette for use inside addCode. These were tuned against the
// panelDark background — don't substitute arbitrary colors or they'll fight.
const CODE = {
  text:    "FFFFFF",  // default text
  keyword: "FF9F87",  // func, class, var, let, if, switch, case, async, throws
  type:    "F8C291",  // type names: Int32, String, AuracastStreamer
  string:  "C5E8B7",  // string + numeric literals: .left, 20, "hello"
  fn:      "60A5FA",  // function names being called
  comment: "94A3B8",  // // line comments
  decorator: "FFB86C", // @State, @Observable
};

// ═════════════════════════════════════════════════════════════════════════
// SLIDES
// Replace these example slides with your own. Each slide is in its own
// { } block so they're easy to find, reorder, and edit independently.
// ═════════════════════════════════════════════════════════════════════════

const TOTAL = 3;  // update to match actual slide count

// ─── Slide 1: TITLE (dark slate) ────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgDark };

  // Small kicker label, top-left
  slide.addText("CATEGORY · CONTEXT", {
    x: MARGIN, y: 0.6, w: 6, h: 0.3,
    fontFace: F.sans, fontSize: 10, color: C.accent,
    bold: true, charSpacing: 5, margin: 0,
  });

  // Signature coral dot above the title
  slide.addShape(pres.shapes.OVAL, {
    x: MARGIN, y: 2.95, w: 0.18, h: 0.18,
    fill: { color: C.accent }, line: { color: C.accent },
  });

  // Massive title — short, one word ideally, with a period for emphasis
  slide.addText("Title.", {
    x: MARGIN, y: 3.05, w: W - 2 * MARGIN, h: 1.8,
    fontFace: F.sansBold, fontSize: 96, bold: true,
    color: "FFFFFF", margin: 0,
  });

  // Subtitle — one sentence, descriptive
  slide.addText("A one-sentence description of what this deck covers.", {
    x: MARGIN, y: 4.55, w: W - 2 * MARGIN, h: 0.6,
    fontFace: F.sans, fontSize: 24, color: "CBD5E1", margin: 0,
  });

  // Bottom attribution stripe
  slide.addShape(pres.shapes.LINE, {
    x: MARGIN, y: 6.55, w: 1.5, h: 0,
    line: { color: C.accent, width: 1.5 },
  });
  slide.addText("Author · Date · Context", {
    x: MARGIN, y: 6.65, w: 8, h: 0.3,
    fontFace: F.sans, fontSize: 11, color: C.inkVeryDim,
    bold: true, charSpacing: 3, margin: 0,
  });
}

// ─── Slide 2: CONTENT (example — replace with your layout) ──────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.bg };
  addChrome(slide, "Section name", 2, TOTAL);
  addTitle(slide, "Slide title here", "Optional one-line subtitle.");

  slide.addText(
    "Body content goes here. See references/layout-patterns.md for a catalog of layouts to pick from — two-column comparisons, icon-card grids, sequence diagrams, code blocks, state machines, etc.",
    {
      x: MARGIN, y: 2.4, w: W - 2 * MARGIN, h: 1.0,
      fontFace: F.sans, fontSize: 16, color: C.inkSoft,
      lineSpacingMultiple: 1.4, margin: 0,
    }
  );
}

// ─── Slide 3: CLOSING (dark slate, mirrors title slide) ─────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: C.bgDark };

  slide.addText("END OF DECK", {
    x: MARGIN, y: 0.6, w: 6, h: 0.3,
    fontFace: F.sans, fontSize: 10, color: C.accent,
    bold: true, charSpacing: 5, margin: 0,
  });
  slide.addText(`${TOTAL} / ${TOTAL}`, {
    x: W - MARGIN - 0.8, y: 0.6, w: 0.8, h: 0.3,
    fontFace: F.sans, fontSize: 9, color: C.inkVeryDim,
    align: "right", bold: true, charSpacing: 2, margin: 0,
  });

  slide.addShape(pres.shapes.OVAL, {
    x: MARGIN, y: 2.1, w: 0.2, h: 0.2,
    fill: { color: C.accent }, line: { color: C.accent },
  });
  slide.addText("Questions?", {
    x: MARGIN, y: 2.4, w: 8, h: 1.3,
    fontFace: F.sansBold, fontSize: 72, color: "FFFFFF", bold: true, margin: 0,
  });
  slide.addText("Thanks for listening.", {
    x: MARGIN, y: 3.7, w: 8, h: 0.5,
    fontFace: F.sans, fontSize: 18, color: "CBD5E1", italic: true, margin: 0,
  });

  slide.addShape(pres.shapes.LINE, {
    x: MARGIN, y: 6.55, w: 1.5, h: 0,
    line: { color: C.accent, width: 1.5 },
  });
  slide.addText("Author · Date · Context", {
    x: MARGIN, y: 6.65, w: 5, h: 0.3,
    fontFace: F.sans, fontSize: 11, color: C.inkVeryDim,
    bold: true, charSpacing: 3, margin: 0,
  });
}

// ═════════════════════════════════════════════════════════════════════════
// WRITE
// ═════════════════════════════════════════════════════════════════════════
pres.writeFile({ fileName: "Presentation.pptx" })
  .then((f) => console.log("Wrote:", f))
  .catch((e) => { console.error(e); process.exit(1); });