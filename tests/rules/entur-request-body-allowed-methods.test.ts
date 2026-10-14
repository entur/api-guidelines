import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const rulesetPath = resolve("../../.spectral.yml");
const rule = "entur-request-body-allowed-methods";

testRule({
  rule,
  name: "valid when GET has no request body",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: { "/items": { get: { responses: { "200": { description: "OK" } } } } },
  },
  rulesetPath,
});

testRule({
  rule,
  name: "flags a request body on GET",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": {
        get: {
          requestBody: {
            description: "Nope",
            content: { "application/json": { schema: { type: "object" } } },
          },
          responses: { "200": { description: "OK" } },
        },
      },
    },
  },
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
});

