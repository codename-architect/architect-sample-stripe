import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

test("charge source preserves the nested-loop smell (two for loops)", () => {
  const src = readFileSync(
    fileURLToPath(new URL("../src/charge.ts", import.meta.url)),
    "utf8",
  );
  const forLoops = (src.match(/for \(/g) ?? []).length;
  assert.ok(forLoops >= 2, "expected at least two nested for loops");
});

test("source does not hardcode a real Stripe secret key", () => {
  const src = readFileSync(
    fileURLToPath(new URL("../src/charge.ts", import.meta.url)),
    "utf8",
  );
  assert.ok(!/sk_live_/.test(src), "must not contain a live Stripe key");
});
