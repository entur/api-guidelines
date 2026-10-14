import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const RULESETS = [
  ["spectral", resolve("../../.spectral.yml")],
  ["required", resolve("../../.spectral-required.yml")],
] as const;

const rule = "entur-sunset-format-operation";

for (const [label, rulesetPath] of RULESETS) {
  testRule({
    rule,
    name: `accepts a valid calendar date for an operation x-sunset (${label})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          get: {
            deprecated: true,
            responses: { "200": { description: "OK" } },
            "x-sunset": "2030-01-01",
          },
        },
      },
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `rejects an invalid date for an operation x-sunset (${label})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          get: {
            deprecated: true,
            responses: { "200": { description: "OK" } },
            "x-sunset": "not-a-date",
          },
        },
      },
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

