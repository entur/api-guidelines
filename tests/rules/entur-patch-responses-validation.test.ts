import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const rulesetPath = resolve("../../.spectral.yml");
const rule = "entur-patch-responses-validation";

testRule({
  rule,
  name: "valid when PATCH uses an allowed response code",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items/{itemId}": {
        patch: { responses: { "200": { description: "OK" } } },
      },
    },
  },
  rulesetPath,
});

testRule({
  rule,
  name: "flags a PATCH using a disallowed response code",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items/{itemId}": {
        patch: { responses: { "418": { description: "Teapot" } } },
      },
    },
  },
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
});

