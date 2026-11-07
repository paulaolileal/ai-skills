---
name: changelog-keeper
description: This skill should be used before every commit that changes code, to deterministically roll over a project's CHANGELOG.md and add/update the Unreleased entry for the change; and when a project has no CHANGELOG.md yet, to create one following Keep a Changelog. Triggers include "commit this", "update the changelog", "add a changelog entry", or any commit workflow in a git repository.
---

# Changelog Keeper

Keep every project's `CHANGELOG.md` at the root in [Keep a Changelog](https://keepachangelog.com/) format, with a reliable, deterministic rollover step that never relies on the model's judgment about whether something was already published.

## If the project has no CHANGELOG.md

Create one at the root, in Keep a Changelog format, with an empty `## [Unreleased]` section. Do this as part of the first commit of the project.

## Before every commit

Run the rollover script for the repository at the current working directory — do not read `CHANGELOG.md` and decide manually whether to roll over, the script already handles it deterministically:

```
node "<path-to-this-skill>/scripts/changelog-rollover.mjs"
```

The script:

- Resolves the local `main` or `master` branch and compares its SHA with `origin/<branch>` (no fetch — it relies on the remote ref already updated by a previous push).
- If **a push already happened** (local SHA == remote SHA): moves all current content of `## [Unreleased]` into a dated `## [YYYY-MM-DD]` section, merging into an existing section with that same date if one exists.
- If **no push happened yet**, there's no remote tracking branch, or `[Unreleased]` is already empty: makes no changes, and reports why.

Pass a path as the first argument to use a `CHANGELOG.md` other than the default (`CHANGELOG.md` at the current directory root):

```
node "<path-to-this-skill>/scripts/changelog-rollover.mjs" "path/to/CHANGELOG.md"
```

Show the script's output before doing anything else.

## After rollover, before the commit

Add or update the entry for the current change in the (now correctly positioned) `## [Unreleased]` section, following the standard Keep a Changelog categories (`Added`, `Changed`, `Fixed`, `Removed`, etc.). Write entries in English.

If a later commit changes or complements something that already has an entry in `[Unreleased]` for the **same logical change**, and that section hasn't been released yet (no push happened), edit the existing entry instead of creating a new one — keep one entry per feature/change, not one per commit. Once a section has become a released, pushed version, never edit its entries again.

This changelog update is part of the same commit as the code change — never a separate commit.
