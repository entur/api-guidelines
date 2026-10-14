import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

/** Resolve a path relative to this test file. */
const resolve = (relativePath: string): string =>
  path.resolve(__dirname, relativePath);

testRule({
  rule: "entur-get-responses-validation",
  name: "valid when a GET uses an allowed response code",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": {
        get: {
          responses: { "200": { description: "OK" } },
        },
      },
    },
  },
  ruleset: resolve("../../.spectral.yml"),
});

testRule({
  rule: "entur-get-responses-validation",
  name: "flags a GET using a disallowed response code",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {
      "/items": {
        get: {
          responses: { "201": { description: "Created" } },
        },
      },
    },
  },
  ruleset: resolve("../../.spectral.yml"),
  errors: [
    {
      code: "entur-get-responses-validation",
      severity: DiagnosticSeverity.Error,
    },
  ],
});

