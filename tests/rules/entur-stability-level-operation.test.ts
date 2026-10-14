import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const RULESETS = [
  ["spectral", resolve("../../.spectral.yml")],
  ["required", resolve("../../.spectral-required.yml")],
] as const;

const rule = "entur-stability-level-operation";

for (const [label, rulesetPath] of RULESETS) {
  testRule({
    rule,
    name: `valid for a recognised operation stability level (${label})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          get: {
            responses: { "200": { description: "OK" } },
            "x-stability-level": "stable",
          },
        },
      },
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `flags an unrecognised operation stability level (${label})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          get: {
            responses: { "200": { description: "OK" } },
            "x-stability-level": "experimental",
          },
        },
      },
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
}

