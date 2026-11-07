---
name: reusable-scripts
description: This skill should be used before writing a one-off utility script (migrations, seeding, reports, file conversion, maintenance tasks) to check whether a reusable script already exists, and after writing one with a reasonable chance of future reuse, to decide where it should live. Triggers include "write a script to...", "run a migration", "seed the database", "generate a report", "convert these files".
---

# Reusable Utility Scripts

## Before writing a new script

Check both `docs/ai-knowledges/` (see the `ai-knowledge-docs` skill) and the project's `scripts/` folder for an existing reusable script covering the same case (migrations, seeds, maintenance, reports, automation, etc.). Update or parametrize the existing one instead of duplicating it.

## Deciding where a new script lives

When about to write a one-off utility script, judge whether it has a reasonable chance of being needed again:

- **Genuinely disposable** (used once, tied to a context that won't repeat): fine to write it in a temp location and discard it after use.
- **Reasonable chance of reuse**: don't delete it after use. Save it to the project's `scripts/` folder (create it if missing) instead of a temp location.

## Registering a reusable script

For every script kept in `scripts/`, create or update a knowledge doc in `docs/ai-knowledges/` explaining what it does, when to use it, and how to run it (parameters, prerequisites), with a markdown link to the script file.
