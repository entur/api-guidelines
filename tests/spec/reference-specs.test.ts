import * as path from "node:path";
import { testSpec } from "../spectral-util";

/** Resolve a path relative to this test file. */
const resolve = (relativePath: string): string =>
  path.resolve(__dirname, relativePath);

testSpec({
  name: "reference-spec.json lints clean against .spectral.yml",
  specPath: resolve("../../specs/reference-spec.json"),
  rulesetPath: resolve("../../.spectral.yml"),
});

testSpec({
  name: "required-valid.json has no .spectral-required.yml errors",
  specPath: resolve("../../specs/required-valid.json"),
  rulesetPath: resolve("../../.spectral-required.yml"),
});