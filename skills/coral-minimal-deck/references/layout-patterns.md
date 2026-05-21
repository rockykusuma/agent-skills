# Layout patterns

A catalog of slide layouts that work well in the Coral Minimal aesthetic, with code snippets you can adapt. Pick whatever fits each slide's content — variety is the point. Don't use the same layout twice in a row.

Each pattern assumes the template helpers are in scope (`addChrome`, `addTitle`, `addCard`, `addCode`, `arrowRight`, etc.) and that constants `C`, `F`, `W`, `H`, `MARGIN`, `CODE` are defined.

## Table of contents

- [Layout patterns](#layout-patterns)
  - [Table of contents](#table-of-contents)
  - [Title slide](#title-slide)
  - [Pull quote + visual](#pull-quote--visual)
  - [Two-column comparison](#two-column-comparison)
  - [Icon-card grid](#icon-card-grid)
  - [Vertical flow](#vertical-flow)
  - [Numbered step wizard](#numbered-step-wizard)
  - [Sequence diagram](#sequence-diagram)
  - [Multi-lane data flow](#multi-lane-data-flow)
  - [State machine](#state-machine)
  - [Layered architecture stack](#layered-architecture-stack)
  - [Struct / type definition](#struct--type-definition)
  - [Table](#table)
  - [Full-bleed code example](#full-bleed-code-example)
  - [Side-by-side code + diagram](#side-by-side-code--diagram)
  - [UI mockup](#ui-mockup)
  - [Numbered takeaway list](#numbered-takeaway-list)
  - [Big-stat callout](#big-stat-callout)
  - [Closing slide](#closing-slide)
  - [Combining patterns within a slide](#combining-patterns-within-a-slide)

---

## Title slide

Big single-word or short-phrase title on the dark slate background. Coral dot above the title, kicker label top-left, attribution stripe at the bottom.

```js
const slide = pres.addSlide();
slide.background = { color: C.bgDark };

slide.addText("WIDEX SDK · INTERNAL", {
  x: MARGIN, y: 0.6, w: 6, h: 0.3,
  fontFace: F.sans, fontSize: 10, color: C.accent,
  bold: true, charSpacing: 5, margin: 0,
});

slide.addShape(pres.shapes.OVAL, {
  x: MARGIN, y: 2.95, w: 0.18, h: 0.18,
  fill: { color: C.accent }, line: { color: C.accent },
});

slide.addText("Auracast.", {
  x: MARGIN, y: 3.05, w: W - 2*MARGIN, h: 1.8,
  fontFace: F.sansBold, fontSize: 96, bold: true,
  color: "FFFFFF", margin: 0,
});

slide.addText("Bluetooth LE Audio broadcasting for hearing aids.", {
  x: MARGIN, y: 4.55, w: W - 2*MARGIN, h: 0.6,
  fontFace: F.sans, fontSize: 24, color: "CBD5E1", margin: 0,
});
```

The title ideally ends with a period for emphasis ("Auracast." not "Auracast"). The subtitle is a single complete sentence in slightly muted white.

---

## Pull quote + visual

Big two-line statement on the left (one line in ink, one line in coral for emphasis), supporting visual on the right. Good for "What is X?" slides.

```js
slide.addText([
  { text: "One source.\n", options: { color: C.ink, bold: true } },
  { text: "Unlimited receivers.", options: { color: C.accent, bold: true } },
], {
  x: MARGIN, y: 2.3, w: 5.6, h: 1.8,
  fontFace: F.sansBold, fontSize: 38,
  lineSpacingMultiple: 1.1, margin: 0,
});

slide.addText(
  "An open broadcast standard. Any compatible receiver — hearing aids, earbuds, speakers — can tune in without pairing.",
  { x: MARGIN, y: 4.3, w: 5.6, h: 1.4,
    fontFace: F.sans, fontSize: 14, color: C.inkSoft,
    lineSpacingMultiple: 1.4, margin: 0 }
);

// Right side: build a diagram, icon arrangement, or mock UI here
```

---

## Two-column comparison

Side-by-side cards, often "before/after", "traditional/new", or "option A/option B". Right card gets the coral border to signal it's the recommended/highlighted option.

```js
const colW = 5.7;
const leftX = MARGIN;
const rightX = W - MARGIN - colW;
const colY = 2.2;

// LEFT
addCard(slide, leftX, colY, colW, 2.6);
slide.addText("TRADITIONAL", { /* kicker */ x: leftX + 0.3, y: colY + 0.25, w: colW - 0.6, h: 0.3,
  fontFace: F.sansBold, fontSize: 11, color: C.inkDim, bold: true, charSpacing: 4, margin: 0 });
slide.addText("Point-to-point", { /* big label */ x: leftX + 0.3, y: colY + 0.55, w: colW - 0.6, h: 0.5,
  fontFace: F.sansBold, fontSize: 22, color: C.ink, bold: true, margin: 0 });
// ... visual or list inside

// RIGHT (highlighted with coral border)
addCard(slide, rightX, colY, colW, 2.6, { border: C.accent });
slide.addText("AURACAST", { x: rightX + 0.3, y: colY + 0.25, w: colW - 0.6, h: 0.3,
  fontFace: F.sansBold, fontSize: 11, color: C.accent, bold: true, charSpacing: 4, margin: 0 });
// ...
```

Often paired with a comparison table below at y=5.1 (see [Table](#table)).

---

## Icon-card grid

2×3 or 3×2 grid of cards, each with an icon-in-circle + title + 2–3 bullet points. Great for "use cases", "features", "principles".

```js
const items = [
  { icon: "🏟️", title: "Stadiums", bullets: ["Live commentary", "Multiple languages", "Stats"] },
  // ...
];

const cols = 3, rows = 2;
const cardW = (W - 2*MARGIN - 0.6) / cols;
const cardH = 1.95;
const startY = 2.25;

items.forEach((it, i) => {
  const r = Math.floor(i / cols), c = i % cols;
  const cx = MARGIN + c * (cardW + 0.3);
  const cy = startY + r * (cardH + 0.3);

  addCard(slide, cx, cy, cardW, cardH);

  // Icon in soft-coral circle
  slide.addShape(pres.shapes.OVAL, {
    x: cx + 0.3, y: cy + 0.3, w: 0.5, h: 0.5,
    fill: { color: C.accentSoft }, line: { type: "none" },
  });
  slide.addText(it.icon, {
    x: cx + 0.3, y: cy + 0.3, w: 0.5, h: 0.5,
    fontSize: 20, align: "center", valign: "middle", margin: 0,
  });

  // Title
  slide.addText(it.title, {
    x: cx + 0.95, y: cy + 0.32, w: cardW - 1.15, h: 0.4,
    fontFace: F.sansBold, fontSize: 18, color: C.ink, bold: true, margin: 0,
  });

  // Bullets — use bullet:{code:"2022"} not unicode • characters
  slide.addText(
    it.bullets.map((b, idx) => ({
      text: b,
      options: {
        bullet: { code: "2022" },
        color: C.inkSoft, fontSize: 12,
        breakLine: idx < it.bullets.length - 1,
      },
    })),
    { x: cx + 0.3, y: cy + 0.95, w: cardW - 0.6, h: 0.9,
      fontFace: F.sans, paraSpaceAfter: 4, margin: 0 }
  );
});
```

---

## Vertical flow

Three or four cards stacked vertically with arrows + labels between. Use for "step 1 → step 2 → step 3" type systems where each step is a named entity (not a numbered process). The middle step typically gets a colored accent bar.

```js
const boxW = 4.0, boxH = 1.0;
const cx = (W - boxW) / 2;
const tiers = [
  { y: 2.2, title: "Broadcast Source", desc: "TV · Airport · Museum", icon: "📡", color: C.slate },
  { y: 4.0, title: "Hearing Aid",      desc: "Receives & decodes",     icon: "👂", color: C.accent },
  { y: 5.8, title: "iOS App + SDK",    desc: "Discovers · Controls",   icon: "📱", color: C.slate },
];

tiers.forEach((t) => {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: t.y, w: boxW, h: boxH,
    fill: { color: "FFFFFF" }, line: { color: C.border, width: 0.75 },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: cx, y: t.y, w: 0.08, h: boxH,    // left accent bar
    fill: { color: t.color }, line: { type: "none" },
  });
  slide.addText(t.icon, { x: cx + 0.3, y: t.y + 0.15, w: 0.7, h: 0.7,
    fontSize: 28, align: "center", valign: "middle", margin: 0 });
  slide.addText(t.title, { x: cx + 1.1, y: t.y + 0.15, w: boxW - 1.3, h: 0.4,
    fontFace: F.sansBold, fontSize: 18, color: C.ink, bold: true, margin: 0 });
  slide.addText(t.desc, { x: cx + 1.1, y: t.y + 0.55, w: boxW - 1.3, h: 0.4,
    fontFace: F.sans, fontSize: 12, color: C.inkDim, margin: 0 });
});

// Labeled arrow between tiers
arrowDown(slide, cx + boxW/2, 3.35, 0.55, C.accent);
slide.addText("BLE Broadcast · LC3 Audio", { x: cx + boxW/2 + 0.25, y: 3.4, w: 4.5, h: 0.4,
  fontFace: F.sans, fontSize: 11, color: C.inkSoft, italic: true, margin: 0 });
```

---

## Numbered step wizard

Four (or three, or five) big numbered circles in a row, with names below and short "what" quotes underneath. The first step gets a filled coral circle; the rest are outlined.

```js
const steps = [
  { num: "1", title: "Check",  sub: "Availability", desc: "Does my HA support it?" },
  { num: "2", title: "Scan",   sub: "Broadcasts",   desc: "What's nearby?" },
  { num: "3", title: "Select", sub: "Broadcast",    desc: "Connect to this one" },
  { num: "4", title: "Stream", sub: "Controls",     desc: "Control playback" },
];

const colW = 2.6;
const gap = (W - 2*MARGIN - colW * 4) / 3;
const y = 2.7;

steps.forEach((s, i) => {
  const x = MARGIN + i * (colW + gap);
  slide.addShape(pres.shapes.OVAL, {
    x: x + (colW - 1.4) / 2, y: y, w: 1.4, h: 1.4,
    fill: { color: i === 0 ? C.accent : C.bg },
    line: { color: C.accent, width: 1.5 },
  });
  slide.addText(s.num, {
    x: x + (colW - 1.4) / 2, y: y, w: 1.4, h: 1.4,
    fontFace: F.sansBold, fontSize: 44, bold: true,
    color: i === 0 ? "FFFFFF" : C.accent,
    align: "center", valign: "middle", margin: 0,
  });
  slide.addText(s.title, { x, y: y + 1.65, w: colW, h: 0.45,
    fontFace: F.sansBold, fontSize: 22, bold: true, color: C.ink, align: "center", margin: 0 });
  slide.addText(s.sub.toUpperCase(), { x, y: y + 2.12, w: colW, h: 0.3,
    fontFace: F.sans, fontSize: 10, color: C.inkDim, charSpacing: 3, align: "center", margin: 0 });
  slide.addText("\u201C" + s.desc + "\u201D", { x, y: y + 2.55, w: colW, h: 0.45,
    fontFace: F.sans, fontSize: 13, color: C.inkSoft, align: "center", italic: true, margin: 0 });

  // Light connector arrow between steps
  if (i < steps.length - 1) {
    const ax = x + (colW + 1.4) / 2 + 0.05;
    const ay = y + 0.65;
    const al = (colW - 1.4) / 2 + gap + (colW - 1.4) / 2 - 0.1;
    arrowRight(slide, ax, ay, al, C.border);
  }
});
```

---

## Sequence diagram

UML-style sequence diagram with 2 or 3 lifelines. Lifelines are dashed vertical lines; messages are horizontal arrows with italic labels. Forward messages use coral, return messages use success green.

```js
const lx = MARGIN, ly = 2.4, lw = 6.0;
addCard(slide, lx, ly, lw, 3.3, { fill: "FFFFFF" });

const ax1 = lx + 1.2, ax2 = lx + lw - 1.2;

// Lifeline labels
slide.addText("iOS App",     { x: lx + 0.4, y: ly + 0.25, w: 1.6, h: 0.35,
  fontFace: F.sansBold, fontSize: 13, color: C.ink, bold: true, align: "center", margin: 0 });
slide.addText("Hearing Aid", { x: lx + lw - 2.0, y: ly + 0.25, w: 1.6, h: 0.35,
  fontFace: F.sansBold, fontSize: 13, color: C.ink, bold: true, align: "center", margin: 0 });

// Dashed lifelines
slide.addShape(pres.shapes.LINE, { x: ax1, y: ly + 0.65, w: 0, h: 2.5,
  line: { color: C.border, width: 1, dashType: "dash" } });
slide.addShape(pres.shapes.LINE, { x: ax2, y: ly + 0.65, w: 0, h: 2.5,
  line: { color: C.border, width: 1, dashType: "dash" } });

// Forward message
slide.addText("Read capabilities", { x: ax1 + 0.1, y: ly + 1.1, w: ax2 - ax1 - 0.2, h: 0.3,
  fontFace: F.sans, fontSize: 11, color: C.inkSoft, align: "center", italic: true, margin: 0 });
arrowRight(slide, ax1, ly + 1.45, ax2 - ax1, C.accent);

// Return message (uses arrowLeft + success color)
slide.addText("Capabilities data", { x: ax1 + 0.1, y: ly + 1.85, w: ax2 - ax1 - 0.2, h: 0.3,
  fontFace: F.sans, fontSize: 11, color: C.inkSoft, align: "center", italic: true, margin: 0 });
arrowLeft(slide, ax1, ly + 2.2, ax2 - ax1, C.success);
```

For 3 lifelines, space them evenly and use ax1, ax2, ax3. The pattern scales the same way.

---

## Multi-lane data flow

A more elaborate sequence diagram with 5+ lanes, showing how data flows through architectural layers (View → ViewModel → Repository → SDK → External). Forward arrows are coral; return arrows are success green.

```js
const lanes = ["View", "ViewModel", "Repository", "SDK", "Hearing Aid"];
const dx = MARGIN + 0.4;
const dw = W - 2*MARGIN - 0.8;
const spacing = dw / (lanes.length - 1);
const laneXs = lanes.map((_, i) => dx + i * spacing);

// Lane headers (last lane highlighted with accentSoft fill)
lanes.forEach((label, i) => {
  const x = laneXs[i];
  addCard(slide, x - 0.75, 2.2, 1.5, 0.45,
    { fill: i === lanes.length - 1 ? C.accentSoft : "FFFFFF",
      border: i === lanes.length - 1 ? C.accent : C.border });
  slide.addText(label, { x: x - 0.75, y: 2.2, w: 1.5, h: 0.45,
    fontFace: F.sansBold, fontSize: 11, color: C.ink, bold: true,
    align: "center", valign: "middle", margin: 0 });
});

// Lifelines
lanes.forEach((_, i) => {
  slide.addShape(pres.shapes.LINE, { x: laneXs[i], y: 2.7, w: 0, h: 4.0,
    line: { color: C.border, width: 1, dashType: "dash" } });
});

// Messages — each {from, to, label, y, color}
const flow = [
  { from: 0, to: 1, label: "tap()",         y: 3.0, color: C.accent },
  { from: 1, to: 2, label: "startScan()",   y: 3.45, color: C.accent },
  // ...
  { from: 1, to: 0, label: "UI update",     y: 6.1, color: C.success },  // return path
];

flow.forEach((m) => {
  const x1 = laneXs[m.from], x2 = laneXs[m.to];
  const lblX = Math.min(x1, x2), lblW = Math.abs(x2 - x1);
  slide.addText(m.label, { x: lblX, y: m.y - 0.25, w: lblW, h: 0.25,
    fontFace: F.sans, fontSize: 10, color: C.inkSoft, italic: true, align: "center", margin: 0 });
  if (x2 > x1) arrowRight(slide, x1, m.y, x2 - x1, m.color);
  else         arrowLeft(slide, x2, m.y, x1 - x2, m.color);
});
```

---

## State machine

A small finite-state graph. Each state is a rounded rectangle (mono font for `.stateName` style). Transitions are arrows with italic edge labels. The current/highlighted state gets a coral border. Lay it out manually — auto-layout isn't worth building.

```js
const nodeW = 2.0, nodeH = 0.7;

function stateNode(x, y, label, opts = { fill: "FFFFFF", border: C.border }) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w: nodeW, h: nodeH,
    fill: { color: opts.fill }, line: { color: opts.border, width: 1 },
    rectRadius: 0.08,
  });
  slide.addText(label, { x, y, w: nodeW, h: nodeH,
    fontFace: F.mono, fontSize: 13, color: C.ink, bold: true,
    align: "center", valign: "middle", margin: 0 });
}

function edgeLabel(x, y, w, text, color = C.inkDim) {
  slide.addText(text, { x, y, w, h: 0.25,
    fontFace: F.mono, fontSize: 10, color, italic: true, align: "center", margin: 0 });
}

// Lay out states by hand. Example: top state, center "started", three children
const topX = (W - nodeW) / 2;
stateNode(topX, 2.2, ".noActiveStream");
edgeLabel(topX, 3.0, nodeW, "join()");
arrowDown(slide, topX + nodeW / 2, 3.25, 0.45, C.accent);
stateNode(topX, 3.75, ".started", { fill: "FFFFFF", border: C.accent });  // highlighted
// ... etc
```

---

## Layered architecture stack

Four (or 3-5) stacked layers showing system architecture. Each layer is a wide card with: left accent bar (color-coded), small kicker label, big title, mono-font description. Connector lines run between layers.

```js
const layers = [
  { label: "CLIENT APP",     title: "View · ViewModel · Repository",
    desc: "SwiftUI · @Observable · async/await", color: C.slate },
  { label: "SDK PUBLIC API", title: "HADeviceManager + Auracast",
    desc: "isAuracastAvailable · scan · join · pause · resume", color: C.accent },
  { label: "SDK INTERNAL",   title: "HAAuracastManager → AuracastServiceImp",
    desc: "Coordination · BLE operations", color: C.slate },
  { label: "BLE LAYER",      title: "CoreBluetooth + GATT Services",
    desc: "Capabilities · Scan Control · Receive State", color: C.inkDim },
];

const lx = MARGIN, lw = W - 2*MARGIN, lh = 1.05, lGap = 0.15;

layers.forEach((L, i) => {
  const y = 2.15 + i * (lh + lGap);
  slide.addShape(pres.shapes.RECTANGLE, { x: lx, y, w: lw, h: lh,
    fill: { color: "FFFFFF" }, line: { color: C.border, width: 0.75 } });
  slide.addShape(pres.shapes.RECTANGLE, { x: lx, y, w: 0.08, h: lh,
    fill: { color: L.color }, line: { type: "none" } });
  slide.addText(L.label, { x: lx + 0.3, y: y + 0.2, w: 3.5, h: 0.3,
    fontFace: F.sansBold, fontSize: 10, color: L.color, bold: true, charSpacing: 4, margin: 0 });
  slide.addText(L.title, { x: lx + 0.3, y: y + 0.45, w: lw - 0.5, h: 0.35,
    fontFace: F.sansBold, fontSize: 16, color: C.ink, bold: true, margin: 0 });
  slide.addText(L.desc, { x: lx + 0.3, y: y + 0.75, w: lw - 0.5, h: 0.3,
    fontFace: F.mono, fontSize: 11, color: C.inkSoft, margin: 0 });

  if (i < layers.length - 1) {
    slide.addShape(pres.shapes.LINE, { x: lx + lw / 2, y: y + lh, w: 0, h: lGap,
      line: { color: C.border, width: 1 } });
  }
});
```

The coral color goes on the layer the audience should focus on. For a 4-layer stack, that's usually layer 2 (the public API).

---

## Struct / type definition

A code-style representation of a struct or type, with groups of related properties. Use mono font throughout, with property groups labeled in small coral uppercase.

```js
// Header: "struct TypeName"
slide.addText([
  { text: "struct ", options: { color: C.accent, bold: true } },
  { text: "AuracastStreamer", options: { color: C.ink, bold: true } },
], { x: MARGIN, y: 2.3, w: 6.8, h: 0.45,
     fontFace: F.mono, fontSize: 18, margin: 0 });

const groups = [
  { label: "IDENTITY", props: [
    ["broadcastID", "Int32",  "Unique identifier"],
    ["name",        "String", "\u201CAirport Gate B7\u201D"],
  ]},
  { label: "SIGNAL", props: [
    ["rssi",        "Int8",   "−30 (strong) to −90 (weak)"],
    ["isAvailable", "Bool",   "Still in range?"],
  ]},
];

let gy = 2.95;
groups.forEach((g) => {
  slide.addText(g.label, { x: MARGIN, y: gy, w: 6.8, h: 0.28,
    fontFace: F.sansBold, fontSize: 10, color: C.accent, bold: true, charSpacing: 4, margin: 0 });
  gy += 0.3;
  g.props.forEach((p) => {
    slide.addText([
      { text: p[0], options: { color: C.ink, bold: true } },
      { text: ": ", options: { color: C.inkSoft } },
      { text: p[1], options: { color: C.accent, italic: true } },
      { text: "    // " + p[2], options: { color: C.inkDim } },
    ], { x: MARGIN + 0.2, y: gy, w: 6.8 - 0.2, h: 0.3,
         fontFace: F.mono, fontSize: 12, margin: 0 });
    gy += 0.3;
  });
  gy += 0.1;
});
```

---

## Table

Use `addTable` with rich text cells for per-cell styling. Header row gets uppercase, charSpacing-3 gray labels on the bg color. Body rows alternate font + color by column meaning (e.g. mono for identifiers, sans-italic for quotes, plain sans for descriptions).

```js
const headerOpts = { bold: true, color: C.inkDim, fontSize: 10, charSpacing: 3, fill: { color: C.bg } };

const tableData = [
  [
    { text: "ERROR",        options: headerOpts },
    { text: "USER MESSAGE", options: headerOpts },
    { text: "ACTION",       options: headerOpts },
  ],
  [
    { text: ".disconnected",        options: { fontFace: F.mono, fontSize: 11, color: C.accent, bold: true } },
    { text: "\u201CHearing aid disconnected\u201D", options: { fontFace: F.sans, fontSize: 11, color: C.ink, italic: true } },
    { text: "Reconnect",            options: { fontFace: F.sans, fontSize: 11, color: C.inkSoft } },
  ],
  // ... more rows
];

slide.addTable(tableData, {
  x: MARGIN, y: 2.2, w: W - 2*MARGIN,
  colW: [4.0, 4.5, W - 2*MARGIN - 8.5],
  rowH: 0.4,
  border: { type: "solid", pt: 0.5, color: C.border },
  fontFace: F.sans, margin: 0.1,
});
```

Key column gets `color: C.accent` + `fontFace: F.mono` for distinctive identifier styling. Don't fill the header row — let the white background carry it; the small uppercase + spacing does the work.

---

## Full-bleed code example

A single code block taking up most of the slide. Use the `addCode` helper, give it a smaller `fontSize` (10-11) and tighter `lineSpacing` (1.18-1.2) to fit more lines.

```js
addCode(slide, MARGIN, 2.15, W - 2*MARGIN, [
  [
    { text: "class", color: CODE.keyword, bold: true },
    { text: " MyAuracastManager", color: CODE.type },
    { text: ": ", color: CODE.text },
    { text: "HADeviceDelegate", color: CODE.type },
    { text: " {", color: CODE.text },
  ],
  [
    { text: "  var", color: CODE.keyword },
    { text: " deviceManager: ", color: CODE.text },
    { text: "HADeviceManager", color: CODE.type },
    { text: "!", color: CODE.text },
  ],
  [
    { text: "  // STEP 1: Check availability", color: CODE.comment, italic: true },
  ],
  // ... lots more lines
], { fontSize: 10, lineSpacing: 1.18, padTop: 0.15 });
```

If you have more code than fits, either break it into two slides ("part 1" / "part 2") or genuinely compress the code (combine closing braces onto one line like `} } }`). Don't shrink font below 10pt — gets unreadable at the back of the room.

---

## Side-by-side code + diagram

Visual on the left (sequence diagram, mock UI, illustration), code block(s) on the right. Use one or two `addCode` blocks stacked vertically on the right side. Each code block can have its own kicker label above ("SDK CALL", "DELEGATE CALLBACK").

```js
const lx = MARGIN, ly = 2.4, lw = 6.0;
// Build the left-side visual (sequence diagram or UI mock)
// ...

const rx = lx + lw + 0.3;
const rw = W - MARGIN - rx;

slide.addText("SDK CALL", { x: rx, y: ly, w: rw, h: 0.3,
  fontFace: F.sansBold, fontSize: 10, color: C.inkDim, bold: true, charSpacing: 3, margin: 0 });

const cb1H = addCode(slide, rx, ly + 0.35, rw, [
  [ { text: "deviceManager", color: CODE.text },
    { text: ".", color: CODE.text },
    { text: "scan", color: CODE.fn },
    { text: "(", color: CODE.text } ],
  [ { text: "  side", color: CODE.text },
    { text: ": ", color: CODE.text },
    { text: ".left", color: CODE.string },
    { text: ",", color: CODE.text } ],
  [ { text: ")", color: CODE.text } ],
], { fontSize: 13 });

// Use cb1H to position the next block below it
slide.addText("RESULTS VIA DELEGATE", { x: rx, y: ly + 0.35 + cb1H + 0.25, w: rw, h: 0.3, /* ... */ });
addCode(slide, rx, ly + 0.35 + cb1H + 0.6, rw, [ /* ... */ ], { fontSize: 12 });
```

---

## UI mockup

A simplified phone or modal screen as a card, with content inside. Used to show what the app looks like at this step. Use rounded buttons (one filled coral or success, one outline), simple labels, and an emoji where an icon would go.

```js
// Phone-ish card
const lx = MARGIN, ly = 2.3, lw = 5.3, lh = 4.2;
addCard(slide, lx, ly, lw, lh, { fill: "FFFFFF" });

slide.addText("NOW PLAYING", { x: lx + 0.4, y: ly + 0.35, w: lw - 0.8, h: 0.3,
  fontFace: F.sansBold, fontSize: 10, color: C.inkDim, bold: true, charSpacing: 4, align: "center", margin: 0 });
slide.addText("Living Room TV", { x: lx + 0.4, y: ly + 0.65, w: lw - 0.8, h: 0.5,
  fontFace: F.sansBold, fontSize: 22, color: C.ink, bold: true, align: "center", margin: 0 });

// Audio bars visualization
const barX = lx + (lw - 2.0) / 2, barY = ly + 1.5;
const bars = [0.4, 0.7, 1.0, 0.85, 0.6, 0.9, 1.0, 0.7, 0.5];
bars.forEach((bh, i) => {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: barX + i * 0.22, y: barY + (1.0 - bh) * 0.5, w: 0.14, h: bh * 0.5 + 0.1,
    fill: { color: C.accent }, line: { type: "none" },
  });
});

// Buttons — two filled (different colors) + one outline (coral) for "Leave"
slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: lx + 0.4, y: ly + 2.85, w: 2.1, h: 0.55,
  fill: { color: C.slate }, line: { type: "none" }, rectRadius: 0.08 });
slide.addText("❚❚   Pause", { x: lx + 0.4, y: ly + 2.85, w: 2.1, h: 0.55,
  fontFace: F.sansBold, fontSize: 14, color: "FFFFFF", bold: true, align: "center", valign: "middle", margin: 0 });
// ... Resume in success green, Leave in outline-coral
```

---

## Numbered takeaway list

A summary slide listing 3-5 takeaways, each with: big number (coral) + small kicker tag + medium title + description on the right. Separators (faint hairline) between items.

```js
const takeaways = [
  { kicker: "WHAT", title: "Auracast",   body: "Bluetooth LE Audio broadcast — one source, unlimited receivers." },
  { kicker: "WHY",  title: "It matters", body: "Hearing aid users get pairless access to public audio." },
  // ...
];

const startY = 2.15;
const itemH = 0.95;

takeaways.forEach((t, i) => {
  const y = startY + i * (itemH + 0.05);

  slide.addText(String(i + 1).padStart(2, "0"), { x: MARGIN, y: y + 0.15, w: 0.9, h: 0.6,
    fontFace: F.sansBold, fontSize: 32, color: C.accent, bold: true, margin: 0 });

  slide.addText(t.kicker, { x: MARGIN + 1.0, y: y + 0.1, w: 1.5, h: 0.3,
    fontFace: F.sansBold, fontSize: 10, color: C.inkDim, bold: true, charSpacing: 4, margin: 0 });
  slide.addText(t.title, { x: MARGIN + 1.0, y: y + 0.35, w: 4.0, h: 0.4,
    fontFace: F.sansBold, fontSize: 18, color: C.ink, bold: true, margin: 0 });
  slide.addText(t.body, { x: MARGIN + 5.2, y: y + 0.18, w: W - 2*MARGIN - 5.2, h: 0.65,
    fontFace: F.sans, fontSize: 13, color: C.inkSoft, lineSpacingMultiple: 1.25, valign: "middle", margin: 0 });

  if (i < takeaways.length - 1) {
    slide.addShape(pres.shapes.LINE, { x: MARGIN, y: y + itemH, w: W - 2*MARGIN, h: 0,
      line: { color: C.border, width: 0.5 } });
  }
});
```

---

## Big-stat callout

A slide whose entire purpose is one big number. 72pt+ coral number, small uppercase label, single-sentence context. Use sparingly — at most once or twice per deck.

```js
slide.addText("87%", { x: MARGIN, y: 2.5, w: W - 2*MARGIN, h: 2.5,
  fontFace: F.sansBold, fontSize: 240, bold: true, color: C.accent,
  align: "center", valign: "middle", margin: 0 });

slide.addText("OF USERS COMPLETE THE FLOW", { x: MARGIN, y: 5.3, w: W - 2*MARGIN, h: 0.4,
  fontFace: F.sansBold, fontSize: 12, color: C.inkDim, bold: true, charSpacing: 5,
  align: "center", margin: 0 });

slide.addText("Up from 41% before the redesign — measured across 12,000 sessions in Q3.",
  { x: MARGIN, y: 5.85, w: W - 2*MARGIN, h: 0.6,
    fontFace: F.sans, fontSize: 16, color: C.inkSoft, align: "center", italic: true, margin: 0 });
```

---

## Closing slide

Mirrors the title slide aesthetically. Dark slate background. "Questions?" or "Thanks." in 72pt white. Optional reference column on the right (file paths, links, follow-up resources) for technical decks.

```js
const slide = pres.addSlide();
slide.background = { color: C.bgDark };

slide.addText("END OF DECK", { /* same kicker as title */ });

// Left: Questions?
slide.addShape(pres.shapes.OVAL, {
  x: MARGIN, y: 2.1, w: 0.2, h: 0.2,
  fill: { color: C.accent }, line: { color: C.accent },
});
slide.addText("Questions?", { x: MARGIN, y: 2.4, w: 5.5, h: 1.3,
  fontFace: F.sansBold, fontSize: 72, color: "FFFFFF", bold: true, margin: 0 });
slide.addText("Thanks for listening.", { x: MARGIN, y: 3.7, w: 5.5, h: 0.5,
  fontFace: F.sans, fontSize: 18, color: "CBD5E1", italic: true, margin: 0 });

// Right: references list (optional, for technical decks)
slide.addText("KEY FILES TO EXPLORE", { x: MARGIN + 6, y: 1.5, w: 6.7, h: 0.3,
  fontFace: F.sansBold, fontSize: 10, color: C.accent, bold: true, charSpacing: 4, margin: 0 });

// folder + files structure with mono font
slide.addText("📁  Sources/SDK/Public/", { x: MARGIN + 6, y: 1.95, w: 6.7, h: 0.3,
  fontFace: F.mono, fontSize: 11, color: "F8C291", bold: true, margin: 0 });
slide.addText("·  MyClass.swift", { x: MARGIN + 6.35, y: 2.25, w: 6.4, h: 0.28,
  fontFace: F.mono, fontSize: 10, color: "CBD5E1", margin: 0 });
```

---

## Combining patterns within a slide

Many real slides use 2-3 patterns together. Some that work well:

- **Sequence diagram + code block** ([side-by-side code + diagram](#side-by-side-code--diagram)) — shows the message exchange visually and the API call literally
- **Two-column comparison + table below** — visual comparison cards + detailed comparison table
- **Vertical flow + labeled arrows** — each arrow gets a label like "BLE Broadcast · LC3 Audio"
- **Icon-card grid + accent strip below** — six cards above, four-up key-takeaways at the bottom
- **UI mockup + SDK calls list** — show the screen, list the functions that build it

The thing to *avoid* combining: don't put a code block and a sequence diagram and a table on the same slide. That's three layouts; pick one or break it into two slides.