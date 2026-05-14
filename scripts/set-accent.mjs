#!/usr/bin/env node
// Re-theme the site by changing a single accent color.
//
// Usage:
//   node scripts/set-accent.mjs "#c8102e"
//
// Updates two places that hold the raw hex:
//   - css/style.css   →  --accent: <hex>;
//   - index.html      →  <meta name="theme-color" content="<hex>" />
//
// Everything else (--accent-hover, --accent-bg, --accent-glow, --accent-tint, etc.)
// is derived from --accent at runtime via color-mix(), so this script doesn't need
// to know the palette structure, one substitution re-themes the whole site.
//
// Safe to run as many times as you want while iterating on a color.

import { readFile, writeFile } from "node:fs/promises";

const hex = process.argv[2];
if (!hex || !/^#[0-9a-fA-F]{6}$/.test(hex)) {
  console.error("usage: node scripts/set-accent.mjs <#rrggbb>");
  console.error("       hex must be 6 digits with a leading '#', e.g. #c8102e");
  process.exit(1);
}
const normalized = hex.toLowerCase();

const targets = [
  {
    path: "css/style.css",
    pattern: /(--accent:\s*)#[0-9a-fA-F]{6}/,
    replacement: `$1${normalized}`,
    label: "--accent",
  },
  {
    path: "index.html",
    pattern: /(name="theme-color"\s+content=")#[0-9a-fA-F]{6}/,
    replacement: `$1${normalized}`,
    label: "theme-color meta",
  },
];

let failed = false;
for (const { path, pattern, replacement, label } of targets) {
  const before = await readFile(path, "utf8");
  const after = before.replace(pattern, replacement);
  if (before === after) {
    console.warn(`${path}: before and after values are the same`);
    failed = true;
    continue;
  }
  await writeFile(path, after);
}

if (failed) process.exit(1);
console.log(`accent set to ${normalized}`);
