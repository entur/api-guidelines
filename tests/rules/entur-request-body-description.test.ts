import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const rulesetPath = resolve("../../.spectral.yml");
const rule = "entur-request-body-description";

testRule({
  rule,
  name: "valid when the request body has a description",
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
});

testRule({
  rule,
  name: "warns when the request body has no description",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": {
        post: {
          requestBody: {
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

