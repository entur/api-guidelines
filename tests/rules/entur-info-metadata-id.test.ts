import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

/** Resolve a path relative to this test file. */
const resolve = (relativePath: string): string =>
  path.resolve(__dirname, relativePath);

testRule({
  rule: "entur-info-metadata-id",
  name: "valid when info.x-entur-metadata.id is present",
  document: {
    openapi: "3.0.3",
    info: {
      title: "Ticketing",
      version: "1.0.0",
      "x-entur-metadata": { id: "ticketing" },
    },
    paths: {},
  },
  rulesetPath: resolve("../../.spectral.yml"),
});

testRule({
  rule: "entur-info-metadata-id",
  name: "flags a missing info.x-entur-metadata.id",
  document: {
    openapi: "3.0.3",
    info: {
      title: "Ticketing",
      version: "1.0.0",
      "x-entur-metadata": { owner: "team-api" },
    },
    paths: {},
  },
  rulesetPath: resolve("../../.spectral.yml"),
  expectedIssues: [
    {
      code: "entur-info-metadata-id",
      severity: DiagnosticSeverity.Error,
    },
  ],
});

