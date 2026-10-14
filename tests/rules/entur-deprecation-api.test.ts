import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const RULESETS = [
  ["spectral", resolve("../../.spectral.yml")],
  ["required", resolve("../../.spectral-required.yml")],
] as const;

const rule = "entur-deprecation-api";

for (const [label, rulesetPath] of RULESETS) {
  testRule({
    rule,
    name: `valid when x-deprecated is a boolean (${label})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0", "x-deprecated": true },
      paths: {},
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `flags a non-boolean x-deprecated (${label})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0", "x-deprecated": "yes" },
      paths: {},
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
}

