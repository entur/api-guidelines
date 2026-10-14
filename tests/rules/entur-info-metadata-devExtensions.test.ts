import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

/** Resolve a path relative to this test file. */
const resolve = (relativePath: string): string =>
  path.resolve(__dirname, relativePath);

testRule({
  rule: "entur-info-metadata-devExtensions",
  name: "valid when every devExtension is 'x-' prefixed",
  document: {
    openapi: "3.0.3",
    info: {
      title: "Ticketing",
      version: "1.0.0",
      "x-entur-metadata": { devExtensions: ["x-kotlin-implements"] },
    },
    paths: {},
  },
  rulesetPath: resolve("../../.spectral.yml"),
});

testRule({
  rule: "entur-info-metadata-devExtensions",
  name: "flags a devExtension without the 'x-' prefix",
  document: {
    openapi: "3.0.3",
    info: {
      title: "Ticketing",
      version: "1.0.0",
      "x-entur-metadata": { devExtensions: ["kotlin-implements"] },
    },
    paths: {},
  },
  rulesetPath: resolve("../../.spectral.yml"),
  errors: [
    {
      code: "entur-info-metadata-devExtensions",
      severity: DiagnosticSeverity.Error,
    },
  ],
});

