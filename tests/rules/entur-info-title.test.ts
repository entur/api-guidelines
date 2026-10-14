import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);

testRule({
  rule: "entur-info-title",
  name: `valid when the info section has a non-empty title (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {},
  },
  rulesetPath,
});

testRule({
  rule: "entur-info-title",
  name: `flags a missing info title (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { version: "1.0.0" },
    paths: {},
  },
  rulesetPath,
  expectedIssues: [
    {
      code: "entur-info-title",
      severity: DiagnosticSeverity.Error,
    },
  ],
});
