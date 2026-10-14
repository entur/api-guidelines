import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rule = "entur-deprecation-api";

for (const rulesetPath of Object.values(RULESETS)) {
  const ruleset = path.basename(rulesetPath);

  testRule({
    rule,
    name: `valid when x-deprecated is a boolean (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0", "x-deprecated": true },
      paths: {},
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `flags a non-boolean x-deprecated (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0", "x-deprecated": "yes" },
      paths: {},
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
}

