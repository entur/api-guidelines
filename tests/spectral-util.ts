import * as fs from "node:fs";
import {Document, type ISpectralDiagnostic, Spectral,} from "@stoplight/spectral-core";
import { DiagnosticSeverity } from "@stoplight/types";
import {Json as JsonParser} from "@stoplight/spectral-parsers";
import {bundleAndLoadRuleset} from "@stoplight/spectral-ruleset-bundler/with-loader";
import {commonjs} from "@stoplight/spectral-ruleset-bundler/plugins/commonjs";
import {fetch} from "@stoplight/spectral-runtime";

export type RuleTest = Readonly<{
  /** The rule id under test (e.g. "entur-info-title") */
  rule: string;
  /** Human-readable description of what is tested */
  name: string;
  /** The OpenAPI document (as a plain object) to lint */
  document: Record<string, unknown>;
  /** Absolute path to the ruleset file */
  rulesetPath: string;
  /** The diagnostics expected from the rule (omitted = valid). */
  expectedIssues?: ReadonlyArray<Partial<ISpectralDiagnostic>>;
}>;

/**
 * Test a single spectral rule
 */
export default function testRule({
  rule,
  name,
  document,
  rulesetPath,
  expectedIssues = [],
}: RuleTest): void {
  it(`${rule}: ${name}`, async () => {
    const doc = new Document(
      JSON.stringify(document),
      JsonParser,
      "document.json"
    );

    const spectral = await setupSpectral(rulesetPath);
    const results = await spectral.run(doc);
    const ruleIssues = results.filter(({ code }) => code === rule);

    // toEqual checks the result count and order against this array; wrapping
    // each expected issue in objectContaining makes the per-element check a
    // subset match, so a case only asserts the fields it lists (e.g. code,
    // severity) and ignores the rest (message, path, range, ...).
    expect(ruleIssues).toEqual(
      expectedIssues.map((issue) => expect.objectContaining(issue))
    );
  });
}

export type SpecTest = Readonly<{
  /** Human-readable description of what is tested */
  name: string;
  /** Absolute path to the OpenAPI document to lint */
  specPath: string;
  /** Absolute path to the ruleset file */
  rulesetPath: string;
  /** The error- and warning-severity diagnostics expected (omitted = clean). */
  expectedIssues?: ReadonlyArray<Partial<ISpectralDiagnostic>>;
}>;

/**
 * Lint a whole spec file on disk against a ruleset.
 */
export function testSpec({
  name,
  specPath,
  rulesetPath,
  expectedIssues = [],
}: SpecTest): void {
  it(name, async () => {
    const doc = new Document(
      fs.readFileSync(specPath, "utf8"),
      JsonParser,
      specPath
    );

    const spectral = await setupSpectral(rulesetPath);
    const results = await spectral.run(doc);
    const warningsAndErrors = results.filter(
      ({ severity }) =>
        severity === DiagnosticSeverity.Error ||
        severity === DiagnosticSeverity.Warning
    );

    expect(warningsAndErrors).toEqual(
      expectedIssues.map((issue) => expect.objectContaining(issue))
    );
  });
}

/** Create a Spectral instance with the given ruleset loaded. */
async function setupSpectral(rulesetPath: string): Promise<Spectral> {
  const spectral = new Spectral();
  spectral.setRuleset(
      await bundleAndLoadRuleset(rulesetPath, { fs, fetch }, [commonjs()])
  );
  return spectral;
}