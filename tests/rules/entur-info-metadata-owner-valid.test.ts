import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

/** Resolve a path relative to this test file. */
const resolve = (relativePath: string): string =>
  path.resolve(__dirname, relativePath);

testRule({
  rule: "entur-info-metadata-owner-valid",
  name: "valid for a 'team-' prefixed lower-kebab-case owner",
  document: {
    openapi: "3.0.3",
    info: {
      title: "Ticketing",
      version: "1.0.0",
      "x-entur-metadata": { owner: "team-api" },
    },
    paths: {},
  },
  ruleset: resolve("../../.spectral.yml"),
});

testRule({
  rule: "entur-info-metadata-owner-valid",
  name: "flags an owner that is not lower-kebab-case",
  document: {
    openapi: "3.0.3",
    info: {
      title: "Ticketing",
      version: "1.0.0",
      "x-entur-metadata": { owner: "team-Api" },
    },
    paths: {},
  },
  ruleset: resolve("../../.spectral.yml"),
  errors: [
    {
      code: "entur-info-metadata-owner-valid",
      severity: DiagnosticSeverity.Error,
    },
  ],
});

