import * as fs from "node:fs";
import {Document, type ISpectralDiagnostic, type Ruleset, Spectral,} from "@stoplight/spectral-core";
import { DiagnosticSeverity } from "@stoplight/types";
import {Json as JsonParser} from "@stoplight/spectral-parsers";
import {bundleAndLoadRuleset} from "@stoplight/spectral-ruleset-bundler/with-loader";
import {commonjs} from "@stoplight/spectral-ruleset-bundler/plugins/commonjs";
import {fetch} from "@stoplight/spectral-runtime";

function loadRuleset(rulesetFile: string): Promise<Ruleset> {
  return bundleAndLoadRuleset(rulesetFile, { fs, fetch }, [commonjs()]);
}

export type RuleTest = Readonly<{
  /** The rule id under test (e.g. "entur-info-title") */
  rule: string;
  /** Human-readable description of what is tested */
  name: string;
  /** The OpenAPI document (as a plain object) to lint */
  document: Record<string, unknown>;
  /** Absolute path to the ruleset file */
  ruleset: string;
  /** The diagnostics expected from the rule (omitted = valid). */
  errors?: ReadonlyArray<Partial<ISpectralDiagnostic>>;
}>;

/**
 * Test a single spectral rule
 */
export default function testRule({
  rule,
  name,
  document,
  ruleset,
  errors = [],
}: RuleTest): void {
  it(`${rule}: ${name}`, async () => {
    const spectral = new Spectral();
    spectral.setRuleset(await loadRuleset(ruleset));

    const doc = new Document(
      JSON.stringify(document),
      JsonParser,
      "document.json"
    );

    const results = await spectral.run(doc);
    const ruleResults = results.filter(({ code }) => code === rule);

    // toEqual checks the result count and order against this array; wrapping
    // each expected error in objectContaining makes the per-element check a
    // subset match, so a case only asserts the fields it lists (e.g. code,
    // severity) and ignores the rest (message, path, range, ...).
    expect(ruleResults).toEqual(
      errors.map((error) => expect.objectContaining(error))
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
  /** The error-severity diagnostics expected (omitted = clean). */
  errors?: ReadonlyArray<Partial<ISpectralDiagnostic>>;
}>;

/**
 * Lint a whole spec file on disk against a ruleset.
 */
export function testSpec({
  name,
  specPath,
  rulesetPath,
  errors = [],
}: SpecTest): void {
  it(name, async () => {
    const spectral = new Spectral();
    spectral.setRuleset(await loadRuleset(rulesetPath));

    const doc = new Document(
      fs.readFileSync(specPath, "utf8"),
      JsonParser,
      specPath
    );

    const results = await spectral.run(doc);
    const errorResults = results.filter(
      ({ severity }) => severity === DiagnosticSeverity.Error
    );

    expect(errorResults).toEqual(
      errors.map((error) => expect.objectContaining(error))
    );
  });
}
