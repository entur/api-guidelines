import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);

const problemSchema = (properties: Record<string, unknown>) => ({
  openapi: "3.0.3",
  info: { title: "Ticketing", version: "1.0.0" },
  paths: {
    "/items": {
      get: {
        responses: {
          "404": {
            description: "Not Found",
            content: {
              "application/problem+json": {
                schema: { type: "object", properties },
              },
            },
          },
        },
      },
    },
  },
});

// entur-rfc-9457-body-title
describe("rule entur-rfc-9457-body-title", () => {
  const rule = "entur-rfc-9457-body-title";

  testRule({
    rule,
    name: `valid when the error schema defines 'title' (${ruleset})`,
    document: problemSchema({
      title: { type: "string" },
      status: { type: "integer" },
    }),
    rulesetPath,
  });

  testRule({
    rule,
    name: `flags an error schema missing 'title' (${ruleset})`,
    document: problemSchema({ status: { type: "integer" } }),
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
});

// entur-rfc-9457-body-status
describe("rule entur-rfc-9457-body-status", () => {
  const rule = "entur-rfc-9457-body-status";

  testRule({
    rule,
    name: `valid when the error schema defines 'status' (${ruleset})`,
    document: problemSchema({
      title: { type: "string" },
      status: { type: "integer" },
    }),
    rulesetPath,
  });

  testRule({
    rule,
    name: `flags an error schema missing 'status' (${ruleset})`,
    document: problemSchema({ title: { type: "string" } }),
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
});

// entur-rfc-9457-body-detail
describe("rule entur-rfc-9457-body-detail", () => {
  const rule = "entur-rfc-9457-body-detail";

  testRule({
    rule,
    name: `valid when the error schema defines 'detail' (${ruleset})`,
    document: problemSchema({
      title: { type: "string" },
      detail: { type: "string" },
    }),
    rulesetPath,
  });

  testRule({
    rule,
    name: `warns when the error schema is missing 'detail' (${ruleset})`,
    document: problemSchema({ title: { type: "string" } }),
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Warning }],
  });
});

// entur-rfc-9457-content-type
describe("rule entur-rfc-9457-content-type", () => {
  const rule = "entur-rfc-9457-content-type";

  testRule({
    rule,
    name: `valid when an error response uses a problem media type (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          get: {
            responses: {
              "404": {
                description: "Not Found",
                content: {
                  "application/problem+json": { schema: { type: "object" } },
                },
              },
            },
          },
        },
      },
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `warns when an error response uses a non-problem media type (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          get: {
            responses: {
              "404": {
                description: "Not Found",
                content: { "application/json": { schema: { type: "object" } } },
              },
            },
          },
        },
      },
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Warning }],
  });
});

