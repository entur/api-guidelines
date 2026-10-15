import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);

describe("rule entur-request-body-description", () => {
  const rule = "entur-request-body-description";

  testRule({
    rule,
    name: `valid when the request body has a description (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          post: {
            requestBody: {
              description: "Item to create",
              content: { "application/json": { schema: { type: "object" } } },
            },
            responses: { "201": { description: "Created" } },
          },
        },
      },
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `warns when the request body has no description (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          post: {
            requestBody: {
              content: { "application/json": { schema: { type: "object" } } },
            },
            responses: { "201": { description: "Created" } },
          },
        },
      },
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Warning }],
  });
});

