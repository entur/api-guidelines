import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const RULESETS = [
  ["spectral", resolve("../../.spectral.yml")],
  ["required", resolve("../../.spectral-required.yml")],
] as const;

const rule = "entur-stability-level-api";

for (const [label, rulesetPath] of RULESETS) {
  testRule({
    rule,
    name: `valid for a recognised stability level (${label})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0", "x-stability-level": "beta" },
      paths: {},
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `flags an unrecognised stability level (${label})`,
    document: {
      openapi: "3.0.3",
      info: {
        title: "Ticketing",
        version: "1.0.0",
        "x-stability-level": "experimental",
      },
      paths: {},
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
}

