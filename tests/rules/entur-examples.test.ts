import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);

// entur-example-parameter
{
  const rule = "entur-example-parameter";

  // This rule is `recommended: false`, so it is disabled under the default
  // ruleset. A parameter without an example would warn if it were enabled, so
  // asserting no diagnostics guards that it stays opt-in.
  testRule({
    rule,
    name: `is disabled: no diagnostic when a parameter has no example (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          get: {
            parameters: [
              {
                name: "status",
                in: "query",
                description: "Filter by status",
                schema: { type: "string" },
              },
            ],
            responses: { "200": { description: "OK" } },
          },
        },
      },
    },
    rulesetPath,
  });
}

// entur-example-schema-property
{
  const rule = "entur-example-schema-property";

  // This rule is `recommended: false`, so it is disabled under the default
  // ruleset. A schema property without an example would warn if it were enabled,
  // so asserting no diagnostics guards that it stays opt-in.
  testRule({
    rule,
    name: `is disabled: no diagnostic when a schema property has no example (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {},
      components: {
        schemas: {
          Item: { type: "object", properties: { name: { type: "string" } } },
        },
      },
    },
    rulesetPath,
  });
}

// entur-request-body-examples
{
  const rule = "entur-request-body-examples";

  testRule({
    rule,
    name: `valid when the request body content has an example (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          post: {
            requestBody: {
              description: "Item to create",
              content: {
                "application/json": {
                  schema: { type: "object" },
                  example: { id: "1" },
                },
              },
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
    name: `warns when the request body content has no example (${ruleset})`,
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
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Warning }],
  });
}

// entur-response-body-examples
{
  const rule = "entur-response-body-examples";

  testRule({
    rule,
    name: `valid when the response body content has an example (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          get: {
            responses: {
              "200": {
                description: "OK",
                content: {
                  "application/json": {
                    schema: { type: "object" },
                    example: { id: "1" },
                  },
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
    name: `warns when the response body content has no example (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          get: {
            responses: {
              "200": {
                description: "OK",
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
}

