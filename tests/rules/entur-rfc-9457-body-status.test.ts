import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);
const rule = "entur-rfc-9457-body-status";

const problemSchema = (properties: Record<string, unknown>) => ({
  openapi: "3.0.3",
  info: { title: "Ticketing", version: "1.0.0" },
  paths: {
    "/items": {
      get: {
        responses: {
          "404": {
            description: "Not Found",
            content: {
              "application/problem+json": {
                schema: { type: "object", properties },
              },
            },
          },
        },
      },
    },
  },
});

testRule({
  rule,
  name: `valid when the error schema defines 'status' (${ruleset})`,
  document: problemSchema({
    title: { type: "string" },
    status: { type: "integer" },
  }),
  rulesetPath,
});

testRule({
  rule,
  name: `flags an error schema missing 'status' (${ruleset})`,
  document: problemSchema({ title: { type: "string" } }),
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
});

