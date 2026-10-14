import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);
const rule = "entur-rfc-9457-content-type";

testRule({
  rule,
  name: `valid when an error response uses a problem media type (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": {
        get: {
          responses: {
            "404": {
              description: "Not Found",
              content: {
                "application/problem+json": { schema: { type: "object" } },
              },
            },
          },
        },
      },
    },
  },
  rulesetPath,
});

testRule({
  rule,
  name: `warns when an error response uses a non-problem media type (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": {
        get: {
          responses: {
            "404": {
              description: "Not Found",
              content: { "application/json": { schema: { type: "object" } } },
            },
          },
        },
      },
    },
  },
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Warning }],
});

