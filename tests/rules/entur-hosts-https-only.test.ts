import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);
const rule = "entur-hosts-https-only";

testRule({
  rule,
  name: `valid when all server URLs use HTTPS (${ruleset})`,
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
  name: `flags a non-HTTPS server URL (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    servers: [{ url: "http://api.entur.io/v1" }],
    paths: {},
  },
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
});

