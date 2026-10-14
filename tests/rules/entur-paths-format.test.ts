import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const rulesetPath = resolve("../../.spectral.yml");
const rule = "entur-paths-format";

testRule({
  rule,
  name: "valid for a lower-kebab-case path",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: { "/items": { get: { responses: { "200": { description: "OK" } } } } },
  },
  rulesetPath,
});

testRule({
  rule,
  name: "flags a path that is not lower-kebab-case",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: { "/Items": { get: { responses: { "200": { description: "OK" } } } } },
  },
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
});

