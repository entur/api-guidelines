import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rule = "entur-permissions";

for (const rulesetPath of Object.values(RULESETS)) {
  const ruleset = path.basename(rulesetPath);

  testRule({
    rule,
    name: `valid for a well-formed permission string (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          get: {
            responses: { "200": { description: "OK" } },
            "x-entur-permissions": { value: "items:les" },
          },
        },
      },
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `flags a permission string with an invalid action (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          get: {
            responses: { "200": { description: "OK" } },
            "x-entur-permissions": { value: "items:read" },
          },
        },
      },
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
}

