---
name: design-architecture-docs
description: This skill should be used before planning or implementing any task, to check existing DESIGN.md and ARCHITECTURE.md decisions before browsing code or suggesting a library, icon set, pattern, or structure; and whenever a design or architecture decision is made or confirmed during a task, to record it. Triggers include "what UI library should we use", "how is this structured", "should I use X here", starting a new feature, or wrapping up a task that involved a design/architecture choice.
---

# Design & Architecture Decision Index

Maintain two consolidated decision logs at the root of every project: `DESIGN.md` (UI/UX and frontend decisions) and `ARCHITECTURE.md` (structural/technical decisions). These are **indexes of decisions**, not detailed knowledge docs — each entry is 1-3 lines (what was decided and why) with a markdown link to a detailed knowledge doc under `docs/ai-knowledges/` when the topic needs more depth. Never duplicate detailed content into these files; they point, they don't explain in depth.

## Before planning or implementing anything

Read `DESIGN.md` and `ARCHITECTURE.md` (when they exist) before browsing the codebase for conventions or proposing a library, icon set, pattern, or folder structure. These two files should be enough to avoid suggesting something inconsistent with what the project already uses, without opening source files just to confirm an already-decided convention.

## What belongs in DESIGN.md

UI/UX and frontend decisions that affect any visual implementation suggestion:

- Icon library in use (e.g. "icons: icon-park — do not suggest lucide/heroicons/other")
- Design system or component library
- Color palette and design tokens
- Typography
- Spacing and layout conventions
- Accessibility patterns

## What belongs in ARCHITECTURE.md

Structural and technical decisions:

- Chosen stack and why
- Architectural patterns (DDD, hexagonal, layered, etc.)
- Folder structure and organization conventions
- External integrations
- Persistence/messaging decisions

## Creating the files

If a project doesn't have `DESIGN.md`/`ARCHITECTURE.md` yet, create them as soon as the first relevant design or architecture decision comes up — don't wait to be asked.

## Keeping them current

Whenever a task surfaces or confirms a design/architecture decision that isn't registered yet, or that's outdated/diverging from the current code, update the corresponding file as part of the same task. Don't defer this to a later task.

## Entry format

Keep entries short and link out for depth:

```markdown
## Icon library: icon-park

Chosen for consistent stroke style across the app. Do not suggest lucide/heroicons/other alternatives.
See [icon usage guide](docs/ai-knowledges/icon-park-usage.md) for details.
```

## Related skill

For the detailed knowledge docs these files link out to, see the `ai-knowledge-docs` skill.
