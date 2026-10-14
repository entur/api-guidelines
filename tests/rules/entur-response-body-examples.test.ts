import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const rulesetPath = resolve("../../.spectral.yml");
const rule = "entur-response-body-examples";

testRule({
  rule,
  name: "valid when the response body content has an example",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": {
        get: {
          responses: {
            "200": {
              description: "OK",
              content: {
                "application/json": {
                  schema: { type: "object" },
                  example: { id: "1" },
                },
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
  name: "warns when the response body content has no example",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": {
        get: {
          responses: {
            "200": {
              description: "OK",
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

