import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

/** Resolve a path relative to this test file. */
const resolve = (relativePath: string): string =>
  path.resolve(__dirname, relativePath);
const RULESETS = [
  ["spectral", resolve("../../.spectral.yml")],
  ["required", resolve("../../.spectral-required.yml")],
] as const;

const rule = "entur-permissions";

for (const [label, rulesetPath] of RULESETS) {
  testRule({
    rule,
    name: `valid for a well-formed permission string (${label})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          get: {
            responses: { "200": { description: "OK" } },
            "x-entur-permissions": { value: "items:les" },
          },
        },
      },
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `flags a permission string with an invalid action (${label})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          get: {
            responses: { "200": { description: "OK" } },
            "x-entur-permissions": { value: "items:read" },
          },
        },
      },
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
}

