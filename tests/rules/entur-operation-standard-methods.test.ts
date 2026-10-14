import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const rulesetPath = resolve("../../.spectral.yml");
const rule = "entur-operation-standard-methods";

testRule({
  rule,
  name: "valid when operations use standard HTTP methods",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": { get: { responses: { "200": { description: "OK" } } } },
    },
  },
  rulesetPath,
});

testRule({
  rule,
  name: "warns on a non-standard HTTP method",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": { trace: { responses: { "200": { description: "OK" } } } },
    },
  },
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Warning }],
});

