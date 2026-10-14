import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const rulesetPath = resolve("../../.spectral.yml");
const rule = "entur-path-parameters-camelCase-alphanumeric";

testRule({
  rule,
  name: "valid for a lowerCamelCase path parameter name",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items/{itemId}": {
        get: {
          parameters: [
            {
              name: "itemId",
              in: "path",
              required: true,
              description: "Item id",
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
  name: "flags a path parameter name that is not lowerCamelCase",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items/{item_id}": {
        get: {
          parameters: [
            {
              name: "item_id",
              in: "path",
              required: true,
              description: "Item id",
              schema: { type: "string" },
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

