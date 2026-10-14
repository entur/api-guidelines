import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);
const rule = "info-description";

testRule({
  rule,
  name: `valid when info has a description (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0", description: "Ticketing API" },
    paths: {},
  },
  rulesetPath,
});

testRule({
  rule,
  name: `flags a missing info description (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {},
  },
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
});

