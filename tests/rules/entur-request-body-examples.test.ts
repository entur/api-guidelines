import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);
const rule = "entur-request-body-examples";

testRule({
  rule,
  name: `valid when the request body content has an example (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": {
        post: {
          requestBody: {
            description: "Item to create",
            content: {
              "application/json": {
                schema: { type: "object" },
                example: { id: "1" },
              },
            },
          },
          responses: { "201": { description: "Created" } },
        },
      },
    },
  },
  rulesetPath,
});

testRule({
  rule,
  name: `warns when the request body content has no example (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": {
        post: {
          requestBody: {
            description: "Item to create",
            content: { "application/json": { schema: { type: "object" } } },
          },
          responses: { "201": { description: "Created" } },
        },
      },
    },
  },
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Warning }],
});

