import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import { lintFile } from "../spectral-util";

/** Resolve a path relative to this test file. */
const resolve = (relativePath: string): string =>
  path.resolve(__dirname, relativePath);

/** Error-severity diagnostics only, as a sorted list of rule codes. */
const errorCodes = (
  results: Awaited<ReturnType<typeof lintFile>>
): string[] =>
  results
    .filter((result) => result.severity === DiagnosticSeverity.Error)
    .map((result) => String(result.code))
    .sort();

describe("reference-spec.json", () => {
  it("lints clean against .spectral.yml", async () => {
    const results = await lintFile(
      resolve("../../specs/reference-spec.json"),
      resolve("../../.spectral.yml")
    );
    expect(errorCodes(results)).toEqual([]);
  });
});


describe("required-valid.json", () => {
  it("has no .spectral-required.yml errors", async () => {
    const results = await lintFile(
      resolve("required-valid.json"),
      resolve("../../.spectral-required.yml")
    );
    expect(errorCodes(results)).toEqual([]);
  });
});