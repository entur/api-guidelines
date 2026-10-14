import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const rulesetPath = resolve("../../.spectral.yml");
const rule = "entur-sunset-operation";

testRule({
  rule,
  name: "valid when a deprecated operation also declares x-sunset",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": {
        get: {
          deprecated: true,
          "x-sunset": "2030-01-01",
          responses: { "200": { description: "OK" } },
        },
      },
    },
  },
  rulesetPath,
});

testRule({
  rule,
  name: "flags a deprecated operation with no x-sunset",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": {
        get: { deprecated: true, responses: { "200": { description: "OK" } } },
      },
    },
  },
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Information }],
});

