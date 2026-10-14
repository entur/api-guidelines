import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const rulesetPath = resolve("../../.spectral.yml");
const rule = "entur-post-responses-validation";

testRule({
  rule,
  name: "valid when POST uses an allowed response code",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": { post: { responses: { "201": { description: "Created" } } } },
    },
  },
  rulesetPath,
});

testRule({
  rule,
  name: "flags a POST using a disallowed response code",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": { post: { responses: { "418": { description: "Teapot" } } } },
    },
  },
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
});

