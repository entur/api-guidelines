import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const rulesetPath = resolve("../../.spectral.yml");
const rule = "entur-rfc-9457-body-detail";

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
  name: "valid when the error schema defines 'detail'",
  document: problemSchema({
    title: { type: "string" },
    detail: { type: "string" },
  }),
  rulesetPath,
});

testRule({
  rule,
  name: "warns when the error schema is missing 'detail'",
  document: problemSchema({ title: { type: "string" } }),
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Warning }],
});

