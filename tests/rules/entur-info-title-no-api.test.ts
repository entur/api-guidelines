import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);

testRule({
  rule: "entur-info-title-no-api",
  name: `valid when the title does not contain 'api' (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {},
  },
  rulesetPath,
});

testRule({
  rule: "entur-info-title-no-api",
  name: `warns when the title contains the word 'api' (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing API", version: "1.0.0" },
    paths: {},
  },
  rulesetPath,
  expectedIssues: [
    {
      code: "entur-info-title-no-api",
      severity: DiagnosticSeverity.Warning,
    },
  ],
});

