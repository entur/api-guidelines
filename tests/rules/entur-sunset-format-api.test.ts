import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../helpers/helper";

/** Resolve a path relative to this test file. */
const resolve = (relativePath: string): string =>
  path.resolve(__dirname, relativePath);

/**
 * This rule uses the custom `date` function (functions/date.js), so it also
 * verifies that custom Spectral functions are bundled and loaded correctly.
 */
testRule(
  "entur-sunset-format-api",
  {
    name: "accepts a valid calendar date for info.x-sunset",
    document: {
      openapi: "3.0.3",
      info: {
        title: "Ticketing",
        version: "1.0.0",
        "x-deprecated": true,
        "x-sunset": "2030-01-01",
      },
      paths: {},
    },
    errors: [],
  },
  resolve("../../.spectral.yml")
);

testRule(
  "entur-sunset-format-api",
  {
    name: "rejects an invalid date for info.x-sunset",
    document: {
      openapi: "3.0.3",
      info: {
        title: "Ticketing",
        version: "1.0.0",
        "x-deprecated": true,
        "x-sunset": "not-a-date",
      },
      paths: {},
    },
    errors: [
      {
        code: "entur-sunset-format-api",
        message: "Must be a valid calendar date.",
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
  resolve("../../.spectral.yml")
);

