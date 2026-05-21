# agent-skills

A collection of skills for AI coding agents.

## Repository scope

This repo is content-first — skills are markdown specs (`SKILL.md`) plus optional supporting files. There is no shared JS toolchain at the repo root, so don't expect a `package.json`, `npm test`, or workspace linter. Individual skills that ship executable assets (e.g. `coral-minimal-deck/assets/template.js`) own their own verification and are checked by per-skill CI in `.github/workflows/`.

## Skill structure

Every skill lives in `skills/<skill-name>/` and must have a `SKILL.md` at its root with YAML frontmatter (`name`, `description`). Beyond that, two conventions:

- `assets/` — executable templates, snippets, or anything the agent copies into the user's workspace and runs. Example: `skills/coral-minimal-deck/assets/template.js`.
- `references/` — long-form documentation the agent reads on demand (palette tables, layout catalogs, helper API docs). Keep `SKILL.md` lean and push the deep dives in here.

Both directories are optional. Flat skills (`commit-elegant`, `pull-request-elegant`) skip them entirely. The `skills` CLI copies the whole skill directory on install, so subdirectories work out of the box.

## Skills

### commit-elegant

Crafts clean, expressive git commits using emoji conventional commit format. Fully aligned with the [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) spec.

**Features:**
- Pre-commit verification (lint, typecheck, docs)
- Auto-staging with smart partial-stage detection
- Diff analysis for logical grouping
- Automatic commit splitting when changes span multiple concerns
- Scope, body, footer, and `!` breaking change support
- 65+ emoji/type mappings

**Install:**
```bash
npx skills add rockykusuma/agent-skills@commit-elegant
```

### commit-push-elegant

Commit and push in one workflow. Uses **commit-elegant** style for crafting commits, then pushes to remote — including automatic upstream setup for new branches.

**Features:**
- Full commit-elegant workflow (pre-commit checks, auto-staging, diff analysis, commit splitting)
- Automatic upstream detection and `git push -u origin <branch>` for new branches
- Push failure handling with rebase suggestions
- Safe force-push guidance (`--force-with-lease` only when explicitly requested)
- Edge case handling (amend + force push, detached HEAD, protected branches, no remote)

**Install:**
```bash
npx skills add rockykusuma/agent-skills@commit-push-elegant
```

### pull-request-elegant

Creates professional pull requests on Azure DevOps using the `az repos pr` CLI.

**Features:**
- 7-step workflow: validate → push → gather context → title → description → create → confirm
- Smart work item extraction from branch names
- Lean PR description template focused on substance over ceremony
- Full `az repos pr` CLI reference (create, update, draft, reviewers, votes, policies)
- Multiline markdown description handling
- Edge case and anti-pattern guidance

**Install:**
```bash
npx skills add rockykusuma/agent-skills@pull-request-elegant
```

### coral-minimal-deck

Generates polished PowerPoint decks via `pptxgenjs` in a distinctive "coral minimal" aesthetic — coral (`FF5A36`) accent on white with slate-900 sandwich slides. Built for "designed", "modern", "clean" deck requests that should not look template-generated.

**Features:**
- 5-step workflow: gather → setup → write → render/QA → deliver
- Env-aware setup, render, and delivery blocks (Claude.ai sandbox vs local Claude Code CLI)
- Drop-in `template.js` with full palette, fonts, and 6 helpers (`addChrome`, `addTitle`, `addCard`, `arrowRight/Left/Down`, `addCode`)
- 17 slide-layout recipes: title, two-column comparison, icon-card grid, sequence diagram, multi-lane data flow, state machine, layered architecture, struct/type, table, full-bleed code, side-by-side code+diagram, UI mockup, numbered takeaway, big-stat callout, closing, and more
- Syntax-colored code blocks tuned for the dark panel background
- Captures known `pptxgenjs` gotchas (no `\n` in text runs, no `#` in hex, shared opts mutation, arrowhead rendering)
- Brand-color override path (swap `accent` + `accentSoft` only, keep everything else)

**Install:**
```bash
npx skills add rockykusuma/agent-skills@coral-minimal-deck
```

## License

MIT
