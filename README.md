# ai-skills

Personal Claude Code skills, distributable via [skills.sh](https://skills.sh).

## Skills

| Skill | What it does |
| --- | --- |
| [`design-architecture-docs`](design-architecture-docs/SKILL.md) | Keeps `DESIGN.md`/`ARCHITECTURE.md` as consolidated decision indexes, read before planning and updated as decisions are made. |
| [`ai-knowledge-docs`](ai-knowledge-docs/SKILL.md) | Maintains the `docs/ai-knowledges/` knowledge base: one short, focused doc per subtopic. |
| [`reusable-scripts`](reusable-scripts/SKILL.md) | Decides whether a one-off utility script should be kept in `scripts/` and registered, instead of discarded. |
| [`changelog-keeper`](changelog-keeper/SKILL.md) | Creates and maintains `CHANGELOG.md` in Keep a Changelog format, with a deterministic rollover script run before every commit. |

## Local setup

Each skill folder is linked into `~/.claude/skills/` (via NTFS junction on Windows, symlink elsewhere) so Claude Code discovers it automatically:

```
mklink /J "%USERPROFILE%\.claude\skills\<skill-name>" "<path-to-this-repo>\<skill-name>"
```
