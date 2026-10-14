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

const rule = "entur-info-metadata-owner-valid";

for (const [label, rulesetPath] of RULESETS) {
  testRule({
    rule,
    name: `valid for a 'team-' prefixed lower-kebab-case owner (${label})`,
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
    name: `flags an owner that is not lower-kebab-case (${label})`,
    document: {
      openapi: "3.0.3",
      info: {
        title: "Ticketing",
        version: "1.0.0",
        "x-entur-metadata": { owner: "team-Api" },
      },
      paths: {},
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
}

