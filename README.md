# agent-skills

A collection of skills for AI coding agents.

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

## License

MIT
