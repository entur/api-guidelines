import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);
const rule = "entur-patch-responses-validation";

testRule({
  rule,
  name: `valid when PATCH uses an allowed response code (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items/{itemId}": {
        patch: { responses: { "200": { description: "OK" } } },
      },
    },
  },
  rulesetPath,
});

testRule({
  rule,
  name: `flags a PATCH using a disallowed response code (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items/{itemId}": {
        patch: { responses: { "418": { description: "Teapot" } } },
      },
    },
  },
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
});

