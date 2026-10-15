import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);

// entur-server-urls-lowercase
{
  const rule = "entur-server-urls-lowercase";

  testRule({
    rule,
    name: `valid for a lowercase server URL (${ruleset})`,
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
    name: `flags a server URL containing uppercase characters (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      servers: [{ url: "https://API.entur.io/v1" }],
      paths: {},
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
}

// entur-hosts-https-only
{
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
}

// entur-hosts-not-localhost
{
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
}

