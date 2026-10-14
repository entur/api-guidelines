import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rule = "entur-stability-level-api";

for (const rulesetPath of Object.values(RULESETS)) {
  const ruleset = path.basename(rulesetPath);

  testRule({
    rule,
    name: `valid for a recognised stability level (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0", "x-stability-level": "beta" },
      paths: {},
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `flags an unrecognised stability level (${ruleset})`,
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

