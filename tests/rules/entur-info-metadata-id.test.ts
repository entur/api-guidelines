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

const rule = "entur-info-metadata-id";

for (const [label, rulesetPath] of RULESETS) {
  testRule({
    rule,
    name: `valid when info.x-entur-metadata.id is present (${label})`,
    document: {
      openapi: "3.0.3",
      info: {
        title: "Ticketing",
        version: "1.0.0",
        "x-entur-metadata": { id: "ticketing" },
      },
      paths: {},
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `flags a missing info.x-entur-metadata.id (${label})`,
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
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
}

