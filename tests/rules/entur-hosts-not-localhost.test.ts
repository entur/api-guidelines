import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);
const rule = "entur-hosts-not-localhost";

testRule({
  rule,
  name: `valid for a non-localhost server URL (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    servers: [{ url: "https://api.entur.io/v1" }],
    paths: {},
  },
  rulesetPath,
});

testRule({
  rule,
  name: `warns for a localhost server URL (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    servers: [{ url: "https://localhost/v1" }],
    paths: {},
  },
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Warning }],
});

