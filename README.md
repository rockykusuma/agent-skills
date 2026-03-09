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

## License

MIT
