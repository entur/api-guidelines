import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);
const rule = "entur-sunset-api";

testRule({
  rule,
  name: `valid when a deprecated API also declares x-sunset (${ruleset})`,
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
  name: `flags a deprecated API with no x-sunset (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0", "x-deprecated": true },
    paths: {},
  },
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
});

