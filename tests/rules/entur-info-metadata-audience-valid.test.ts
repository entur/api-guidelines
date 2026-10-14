import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

/** Resolve a path relative to this test file. */
const resolve = (relativePath: string): string =>
  path.resolve(__dirname, relativePath);

testRule({
  rule: "entur-info-metadata-audience-valid",
  name: "valid for a recognised audience value",
  document: {
    openapi: "3.0.3",
    info: {
      title: "Ticketing",
      version: "1.0.0",
      "x-entur-metadata": { audience: "partner" },
    },
    paths: {},
  },
  ruleset: resolve("../../.spectral.yml"),
});

testRule({
  rule: "entur-info-metadata-audience-valid",
  name: "flags an unrecognised audience value",
  document: {
    openapi: "3.0.3",
    info: {
      title: "Ticketing",
      version: "1.0.0",
      "x-entur-metadata": { audience: "public" },
    },
    paths: {},
  },
  ruleset: resolve("../../.spectral.yml"),
  errors: [
    {
      code: "entur-info-metadata-audience-valid",
      severity: DiagnosticSeverity.Error,
    },
  ],
});

