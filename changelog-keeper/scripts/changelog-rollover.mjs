#!/usr/bin/env node
// Deterministic Keep-a-Changelog rollover: moves the current "[Unreleased]"
// content into a dated release section once the local main/master branch
// has been fully pushed to its remote tracking branch. No LLM judgment
// involved — pure git ref comparison + text splicing.
//
// Usage: node changelog-rollover.mjs [path/to/CHANGELOG.md]
// Run from inside the target git repository (or pass an absolute path).

import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

function git(args) {
  try {
    return execSync(`git ${args}`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

function resolveMainBranch() {
  for (const name of ["main", "master"]) {
    if (git(`rev-parse --verify --quiet ${name}`)) return name;
  }
  return null;
}

function todayLocalISO() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const changelogPath = resolve(process.cwd(), process.argv[2] || "CHANGELOG.md");

if (!existsSync(changelogPath)) {
  console.error(`CHANGELOG.md não encontrado em ${changelogPath}`);
  process.exit(1);
}

const branch = resolveMainBranch();
if (!branch) {
  console.log("Não foi possível localizar branch main/master local — pulando checagem de push.");
  process.exit(0);
}

const localSha = git(`rev-parse ${branch}`);
const remoteSha = git(`rev-parse origin/${branch}`);

if (!remoteSha) {
  console.log(`Sem remote tracking para origin/${branch} — assumindo que nada foi publicado ainda. Nenhuma alteração feita.`);
  process.exit(0);
}

if (localSha !== remoteSha) {
  console.log(`${branch} tem commits ainda não enviados ao origin — "Unreleased" permanece como está. Nenhuma alteração feita.`);
  process.exit(0);
}

const rawContent = readFileSync(changelogPath, "utf8");
const usesCRLF = rawContent.includes("\r\n");
const content = rawContent.replace(/\r\n/g, "\n");

const headerMatch = /^## \[Unreleased\][ \t]*$/m.exec(content);
if (!headerMatch) {
  console.log('Nenhuma seção "## [Unreleased]" encontrada no CHANGELOG — nenhuma alteração feita.');
  process.exit(0);
}

const headerEnd = headerMatch.index + headerMatch[0].length;
const afterHeader = content.slice(headerEnd);
const nextHeadingMatch = /^## \[/m.exec(afterHeader);
const blockEnd = nextHeadingMatch ? headerEnd + nextHeadingMatch.index : content.length;

const block = content.slice(headerEnd, blockEnd);

if (block.trim() === "") {
  console.log('Seção "[Unreleased]" já está vazia — nenhuma alteração feita.');
  process.exit(0);
}

const date = todayLocalISO();
const rest = content.slice(blockEnd);
const emptied = content.slice(0, headerEnd) + "\n\n" + rest;

const existingDateMatch = new RegExp(`^## \\[${date}\\][ \\t]*$`, "m").exec(emptied);

let finalContent;
if (existingDateMatch) {
  const insertAt = existingDateMatch.index + existingDateMatch[0].length;
  finalContent = emptied.slice(0, insertAt) + "\n\n" + block.trim() + emptied.slice(insertAt);
  console.log(`Movido o conteúdo de "[Unreleased]" para a seção existente "[${date}]".`);
} else {
  finalContent = content.slice(0, headerEnd) + `\n\n## [${date}]` + block + rest;
  console.log(`Movido o conteúdo de "[Unreleased]" para a nova seção "[${date}]".`);
}

if (usesCRLF) finalContent = finalContent.replace(/\n/g, "\r\n");

writeFileSync(changelogPath, finalContent, "utf8");
