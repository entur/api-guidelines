import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);
const rule = "entur-openapi-version-3";

testRule({
  rule,
  name: `valid for an OpenAPI 3.x version (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {},
  },
  rulesetPath,
});

testRule({
  rule,
  name: `flags a non-3.x OpenAPI version (${ruleset})`,
  document: {
    openapi: "4.0.0",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {},
  },
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
});

