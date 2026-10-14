import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

/** Resolve a path relative to this test file. */
const resolve = (relativePath: string): string =>
  path.resolve(__dirname, relativePath);

testRule({
  rule: "entur-info-title",
  name: "valid when the info section has a non-empty title",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {},
  },
  rulesetPath: resolve("../../.spectral.yml"),
});

testRule({
  rule: "entur-info-title",
  name: "flags a missing info title",
  document: {
    openapi: "3.0.3",
    info: { version: "1.0.0" },
    paths: {},
  },
  rulesetPath: resolve("../../.spectral.yml"),
  expectedIssues: [
    {
      code: "entur-info-title",
      severity: DiagnosticSeverity.Error,
    },
  ],
});
