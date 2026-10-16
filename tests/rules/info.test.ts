import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);

// entur-info-title
describe("rule entur-info-title", () => {
  const rule = "entur-info-title";

  testRule({
    rule,
    name: `valid when the info section has a non-empty title (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {},
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `flags a missing info title (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { version: "1.0.0" },
      paths: {},
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
});

// entur-info-title-no-api
describe("rule entur-info-title-no-api", () => {
  const rule = "entur-info-title-no-api";

  testRule({
    rule,
    name: `valid when the title does not contain 'api' (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {},
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `warns when the title contains the word 'api' (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing API", version: "1.0.0" },
      paths: {},
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Warning }],
  });
});

// info-description
describe("rule info-description", () => {
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
});

// info-contact
describe("rule info-contact", () => {
  const rule = "info-contact";

  // This built-in spectral:oas rule is turned off in .spectral.yml. A document
  // missing info.contact would warn if the rule were enabled, so asserting no
  // diagnostics here guards that the "off" toggle stays in place.
  testRule({
    rule,
    name: `is disabled: no diagnostic even when info.contact is missing (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0", description: "Ticketing API" },
      paths: {},
    },
    rulesetPath,
  });
});
