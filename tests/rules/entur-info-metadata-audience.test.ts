import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rule = "entur-info-metadata-audience";

for (const rulesetPath of Object.values(RULESETS)) {
  const ruleset = path.basename(rulesetPath);

  testRule({
    rule,
    name: `valid when audience is present (${ruleset})`,
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
  });

  testRule({
    rule,
    name: `flags a missing audience (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: {
        title: "Ticketing",
        version: "1.0.0",
        "x-entur-metadata": { },
      },
      paths: {},
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
}

