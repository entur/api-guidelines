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

const rule = "entur-sunset-format-api";

/**
 * This rule uses the custom `date` function (functions/date.js), so it also
 * verifies that custom Spectral functions are bundled and loaded correctly.
 */
for (const [label, rulesetPath] of RULESETS) {
  testRule({
    rule,
    name: `accepts a valid calendar date for info.x-sunset (${label})`,
    document: {
      openapi: "3.0.3",
      info: {
        title: "Ticketing",
        version: "1.0.0",
        "x-deprecated": true,
        "x-sunset": "2030-01-01",
      },
      paths: {},
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `rejects an invalid date for info.x-sunset (${label})`,
    document: {
      openapi: "3.0.3",
      info: {
        title: "Ticketing",
        version: "1.0.0",
        "x-deprecated": true,
        "x-sunset": "not-a-date",
      },
      paths: {},
    },
    rulesetPath,
    expectedIssues: [
      {
        code: rule,
        message: "Must be a valid calendar date.",
        severity: DiagnosticSeverity.Error,
      },
    ],
  });
}

