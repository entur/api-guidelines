import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);

// entur-paths-format
describe("rule entur-paths-format", () => {
  const rule = "entur-paths-format";

  testRule({
    rule,
    name: `valid for a lower-kebab-case path (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: { "/items": { get: { responses: { "200": { description: "OK" } } } } },
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `flags a path that is not lower-kebab-case (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: { "/Items": { get: { responses: { "200": { description: "OK" } } } } },
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
});

// entur-paths-with-api
describe("rule entur-paths-with-api", () => {
  const rule = "entur-paths-with-api";

  testRule({
    rule,
    name: `valid for a path without 'api' (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: { "/items": { get: { responses: { "200": { description: "OK" } } } } },
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `warns for a path containing 'api' (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: { "/api": { get: { responses: { "200": { description: "OK" } } } } },
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Warning }],
  });
});

