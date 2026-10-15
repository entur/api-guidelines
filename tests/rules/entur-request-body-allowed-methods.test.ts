import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);

describe("rule entur-request-body-allowed-methods", () => {
  const rule = "entur-request-body-allowed-methods";

  testRule({
    rule,
    name: `valid when GET has no request body (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: { "/items": { get: { responses: { "200": { description: "OK" } } } } },
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `flags a request body on GET (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          get: {
            requestBody: {
              description: "Nope",
              content: { "application/json": { schema: { type: "object" } } },
            },
            responses: { "200": { description: "OK" } },
          },
        },
      },
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
});

