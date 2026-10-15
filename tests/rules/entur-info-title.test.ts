import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);

// entur-info-title
{
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
}

// entur-info-title-no-api
{
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
}
