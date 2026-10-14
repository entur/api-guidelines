import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const rulesetPath = resolve("../../.spectral.yml");
const rule = "entur-rfc-9457-body-title";

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
  name: "valid when the error schema defines 'title'",
  document: problemSchema({
    title: { type: "string" },
    status: { type: "integer" },
  }),
  rulesetPath,
});

testRule({
  rule,
  name: "flags an error schema missing 'title'",
  document: problemSchema({ status: { type: "integer" } }),
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
});

