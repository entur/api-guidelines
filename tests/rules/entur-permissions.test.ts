import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../helpers/helper";

/** Resolve a path relative to this test file. */
const resolve = (relativePath: string): string =>
  path.resolve(__dirname, relativePath);

testRule(
  "entur-permissions",
  {
    name: "valid for a well-formed permission string",
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          get: {
            responses: { "200": { description: "OK" } },
            "x-entur-permissions": { value: "items:les" },
          },
        },
      },
    },
    errors: [],
  },
  resolve("../../.spectral.yml")
);

testRule(
  "entur-permissions",
  {
    name: "flags a permission string with an invalid action",
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          get: {
            responses: { "200": { description: "OK" } },
            "x-entur-permissions": { value: "items:read" },
          },
        },
      },
    },
    errors: [
      {
        code: "entur-permissions",
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
  resolve("../../.spectral.yml")
);

