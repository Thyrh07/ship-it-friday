// Ship It Friday — make.fun entry (program/v1)
// Writes one line to /output/entry.txt: the funniest git commit message an
// AI coding agent writes right before breaking production on a Friday.
// Sealed gate: UTF-8 text, 1-159 characters, not only whitespace.

import { mkdirSync, writeFileSync } from "node:fs";

// The entry line. Commit-message format ("fix: ..."), confident cheerful
// AI-agent voice, Friday 4:59pm rush, punch lands at the end: there is no
// rollback plan — only vibes.
const OUTPUT =
  "fix: deploy to prod at 4:59pm on Friday \u2014 the rollback plan is just vibes";

const GATE_MIN_CHARS = 1;
const GATE_MAX_CHARS = 159;

// The judge's last criterion: the line must read as a real commit message.
// Enforce the conventional-commit prefix in code, not just by eyeballing.
const COMMIT_PREFIXES = ["fix: ", "feat: ", "chore: ", "refactor: ", "docs: "];

function validate(line: string): void {
  if (line.length < GATE_MIN_CHARS || line.length > GATE_MAX_CHARS) {
    throw new Error(
      `entry must be ${GATE_MIN_CHARS}-${GATE_MAX_CHARS} characters, got ${line.length}`
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (!COMMIT_PREFIXES.some((prefix) => line.startsWith(prefix))) {
    throw new Error(
      `entry must start with a conventional-commit prefix (${COMMIT_PREFIXES.join(", ")})`
    );
  }
}

validate(OUTPUT);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", OUTPUT, "utf8");
