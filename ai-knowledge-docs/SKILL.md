---
name: ai-knowledge-docs
description: This skill should be used before starting a task that might be covered by prior domain, business, or architecture knowledge, before creating a new knowledge doc, or when an existing knowledge doc needs updating, splitting, or removal. Triggers include documenting a business rule, domain knowledge, a known issue and its fix, or any "how does X work in this codebase" question whose answer should be preserved for future tasks.
---

# AI Knowledge Base Maintenance

Maintain a knowledge base of short, focused markdown documents under the fixed path `docs/ai-knowledges/` at the project root (create the folder if missing). Never use another path or name (`docs/knowledge/`, `.claude/knowledge/`, a loose root-level folder, etc.) — the fixed path keeps it predictable across every project.

## Purpose

These documents are a knowledge base for the agent itself in future tasks on this codebase: business rules, detailed architectural decisions, known problems and their solutions, domain/stack knowledge, and similar.

## Before starting a task or creating a new entry

1. Check `DESIGN.md`/`ARCHITECTURE.md` at the project root first for the high-level decision (see the `design-architecture-docs` skill).
2. Then search `docs/ai-knowledges/` for a document already covering the topic. Update the existing document instead of duplicating it.

## Document rules

- **Frontmatter required** at the top of every doc: title, tags/subject, date.
- **Clear filename** that identifies the content at a glance.
- **One coherent subtopic per document.** "Migrations", "Realtime", "runner auth" are separate documents, not sections of a general "architecture" doc.
- **Cross-link related documents** with markdown links, and link back from `DESIGN.md`/`ARCHITECTURE.md` when the subtopic is design- or architecture-related.
- **Keep it short and direct** — no filler. These are read in full for context on future tasks, so a bloated doc costs context every time it's consulted.
- **Size is a warning sign.** If a doc passes roughly 150-200 lines, or no longer fits a one-sentence summary, split it into smaller per-subtopic documents — even if that means revisiting an old doc that grew too large.
- **Update or remove stale docs.** Don't let obsolete content accumulate. If a doc is removed, also remove the entry pointing to it from `DESIGN.md`/`ARCHITECTURE.md`.

## Entry template

```markdown
---
title: <short title>
tags: [<subject>, <area>]
date: <YYYY-MM-DD>
---

<short, direct content>

See also: [related doc](./related-doc.md)
```

## Related skills

- `design-architecture-docs` — the consolidated index these documents are linked from.
- `reusable-scripts` — scripts worth keeping should be registered here too.
