import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

/** Resolve a path relative to this test file. */
const resolve = (relativePath: string): string =>
  path.resolve(__dirname, relativePath);

testRule(
  "entur-info-metadata-audience-valid",
  {
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
    errors: [],
  },
  resolve("../../.spectral.yml")
);

testRule(
  "entur-info-metadata-audience-valid",
  {
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
    errors: [
      {
        code: "entur-info-metadata-audience-valid",
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
  resolve("../../.spectral.yml")
);

