import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

/** Resolve a path relative to this test file. */
const resolve = (relativePath: string): string =>
  path.resolve(__dirname, relativePath);

testRule({
  rule: "entur-info-title-no-api",
  name: "valid when the title does not contain 'api'",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {},
  },
  rulesetPath: resolve("../../.spectral.yml"),
});

testRule({
  rule: "entur-info-title-no-api",
  name: "warns when the title contains the word 'api'",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing API", version: "1.0.0" },
    paths: {},
  },
  rulesetPath: resolve("../../.spectral.yml"),
  errors: [
    {
      code: "entur-info-title-no-api",
      severity: DiagnosticSeverity.Warning,
    },
  ],
});

