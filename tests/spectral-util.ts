import * as fs from "node:fs";
import {Document, type ISpectralDiagnostic, type Ruleset, Spectral,} from "@stoplight/spectral-core";
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
 * Run a single scenario against one rule of a repo ruleset. Call once per case.
 *
 * Only diagnostics produced by `rule` are considered, so each `document` only
 * needs to contain enough to exercise that rule.
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

    expect(ruleResults).toEqual(
      errors.map((error) => expect.objectContaining(error))
    );
  });
}

/**
 * Lint a whole spec file on disk against a ruleset and return every diagnostic.
 *
 * Intended for integration tests over the reference specs, where we care about
 * the full set of findings rather than a single rule.
 *
 * @param specPath    Absolute path to the OpenAPI document to lint.
 * @param rulesetFile Absolute path to the ruleset file.
 */
export async function lintFile(
  specPath: string,
  rulesetFile: string
): Promise<ISpectralDiagnostic[]> {
  const spectral = new Spectral();
  spectral.setRuleset(await loadRuleset(rulesetFile));

  const document = new Document(
    fs.readFileSync(specPath, "utf8"),
    JsonParser,
    specPath
  );

  return spectral.run(document);
}
