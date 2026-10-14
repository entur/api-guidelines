import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);
const rule = "entur-query-parameters-lower-camel-case";

testRule({
  rule,
  name: `valid for a lowerCamelCase query parameter name (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": {
        get: {
          parameters: [
            {
              name: "pageSize",
              in: "query",
              description: "Page size",
              schema: { type: "integer" },
            },
          ],
          responses: { "200": { description: "OK" } },
        },
      },
    },
  },
  rulesetPath,
});

testRule({
  rule,
  name: `flags a query parameter name that is not lowerCamelCase (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": {
        get: {
          parameters: [
            {
              name: "page_size",
              in: "query",
              description: "Page size",
              schema: { type: "integer" },
            },
          ],
          responses: { "200": { description: "OK" } },
        },
      },
    },
  },
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
});

