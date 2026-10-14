import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);
const rule = "entur-not-et-client-name-header";

testRule({
  rule,
  name: `valid when no ET-Client-Name header is declared (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: { "/items": { get: { responses: { "200": { description: "OK" } } } } },
  },
  rulesetPath,
});

testRule({
  rule,
  name: `warns when an ET-Client-Name header is declared (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": {
        get: {
          parameters: [
            {
              name: "ET-Client-Name",
              in: "header",
              description: "Client name",
              schema: { type: "string" },
            },
          ],
          responses: { "200": { description: "OK" } },
        },
      },
    },
  },
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Warning }],
});

