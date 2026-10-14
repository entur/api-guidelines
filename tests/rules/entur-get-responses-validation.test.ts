import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);

testRule({
  rule: "entur-get-responses-validation",
  name: `valid when a GET uses an allowed response code (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": {
        get: {
          responses: { "200": { description: "OK" } },
        },
      },
    },
  },
  rulesetPath,
});

testRule({
  rule: "entur-get-responses-validation",
  name: `flags a GET using a disallowed response code (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": {
        get: {
          responses: { "201": { description: "Created" } },
        },
      },
    },
  },
  rulesetPath,
  expectedIssues: [
    {
      code: "entur-get-responses-validation",
      severity: DiagnosticSeverity.Error,
    },
  ],
});

