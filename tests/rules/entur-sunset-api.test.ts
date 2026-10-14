import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const rulesetPath = resolve("../../.spectral.yml");
const rule = "entur-sunset-api";

testRule({
  rule,
  name: "valid when a deprecated API also declares x-sunset",
  document: {
    openapi: "3.0.3",
    info: {
      title: "Ticketing",
      version: "1.0.0",
      "x-deprecated": true,
      "x-sunset": "2030-01-01",
    },
    paths: {},
  },
  rulesetPath,
});

testRule({
  rule,
  name: "flags a deprecated API with no x-sunset",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0", "x-deprecated": true },
    paths: {},
  },
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
});

