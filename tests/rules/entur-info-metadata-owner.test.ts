import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const RULESETS = [
  ["spectral", resolve("../../.spectral.yml")],
  ["required", resolve("../../.spectral-required.yml")],
] as const;

const rule = "entur-info-metadata-owner";

for (const [label, rulesetPath] of RULESETS) {
  testRule({
    rule,
    name: `valid when owner is present (${label})`,
    document: {
      openapi: "3.0.3",
      info: {
        title: "Ticketing",
        version: "1.0.0",
        "x-entur-metadata": { owner: "team-api" },
      },
      paths: {},
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `flags a missing owner (${label})`,
    document: {
      openapi: "3.0.3",
      info: {
        title: "Ticketing",
        version: "1.0.0",
        "x-entur-metadata": { audience: "partner" },
      },
      paths: {},
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
}

