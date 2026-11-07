# ai-skills

Personal [Claude Code](https://claude.com/claude-code) skills, distributable via [skills.sh](https://skills.sh).

## Why

These skills started as always-on rules in a personal global `CLAUDE.md`. Rules that only make sense as a reaction to something (planning a task, writing a one-off script, committing code) don't need to be loaded into every single session — they work better as skills Claude Code triggers on demand, and as a side benefit they become reusable across machines, projects, and teams instead of living in one person's dotfiles.

## Skills

| Skill | What it does |
| --- | --- |
| [`design-architecture-docs`](design-architecture-docs/SKILL.md) | Keeps `DESIGN.md`/`ARCHITECTURE.md` as consolidated decision indexes, read before planning and updated as decisions are made. |
| [`ai-knowledge-docs`](ai-knowledge-docs/SKILL.md) | Maintains the `docs/ai-knowledges/` knowledge base: one short, focused doc per subtopic. |
| [`reusable-scripts`](reusable-scripts/SKILL.md) | Decides whether a one-off utility script should be kept in `scripts/` and registered, instead of discarded. |
| [`changelog-keeper`](changelog-keeper/SKILL.md) | Creates and maintains `CHANGELOG.md` in Keep a Changelog format, with a deterministic rollover script run before every commit. |

Each skill is self-contained: a `SKILL.md` with its trigger description and instructions, plus any bundled `scripts/` it needs.

## Installing a skill

### Via skills.sh

Once published, install any of these skills the same way as any other skills.sh package — see [skills.sh](https://skills.sh) for the install command for your setup (e.g. the Agent Board skills.sh integration).

### Manually, from this repo

Claude Code discovers skills placed under `~/.claude/skills/<skill-name>/`. Link (don't copy) a skill folder from this repo so it stays in sync with future edits here:

**Windows** (junction, no admin required):
```powershell
mklink /J "%USERPROFILE%\.claude\skills\<skill-name>" "<path-to-this-repo>\<skill-name>"
```

**macOS/Linux** (symlink):
```bash
ln -s "<path-to-this-repo>/<skill-name>" "$HOME/.claude/skills/<skill-name>"
```

The same works for a project-local `.claude/skills/` folder instead of the global one, if a skill should only apply to one repo.

## Repository layout

```
ai-skills/
├── <skill-name>/
│   ├── SKILL.md       # frontmatter (name, description/triggers) + instructions
│   └── scripts/        # optional bundled scripts
├── CHANGELOG.md
└── README.md
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for what changed in each skill.
