import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const rulesetPath = resolve("../../.spectral.yml");
const rule = "entur-paths-with-api";

testRule({
  rule,
  name: "valid for a path without 'api'",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: { "/items": { get: { responses: { "200": { description: "OK" } } } } },
  },
  rulesetPath,
});

testRule({
  rule,
  name: "warns for a path containing 'api'",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: { "/api": { get: { responses: { "200": { description: "OK" } } } } },
  },
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Warning }],
});

