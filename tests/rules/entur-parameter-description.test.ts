import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const rulesetPath = resolve("../../.spectral.yml");
const rule = "entur-parameter-description";

testRule({
  rule,
  name: "valid when a parameter has a description",
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

testRule({
  rule,
  name: "warns when a parameter has no description",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": {
        get: {
          parameters: [
            { name: "status", in: "query", schema: { type: "string" } },
          ],
          responses: { "200": { description: "OK" } },
        },
      },
    },
  },
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Warning }],
});

