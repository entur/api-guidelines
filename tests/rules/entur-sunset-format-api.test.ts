import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rule = "entur-sunset-format-api";

/**
 * This rule uses the custom `date` function (functions/date.js), so it also
 * verifies that custom Spectral functions are bundled and loaded correctly.
 */
for (const rulesetPath of Object.values(RULESETS)) {
  const ruleset = path.basename(rulesetPath);

  testRule({
    rule,
    name: `accepts a valid calendar date for info.x-sunset (${ruleset})`,
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
    name: `rejects an invalid date for info.x-sunset (${ruleset})`,
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

