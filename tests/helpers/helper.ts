import * as fs from "node:fs";
import {Document, type ISpectralDiagnostic, type Ruleset, Spectral,} from "@stoplight/spectral-core";
import {Json as JsonParser} from "@stoplight/spectral-parsers";
import {bundleAndLoadRuleset} from "@stoplight/spectral-ruleset-bundler/with-loader";
import {commonjs} from "@stoplight/spectral-ruleset-bundler/plugins/commonjs";
import {fetch} from "@stoplight/spectral-runtime";

// Cache the bundled rulesets so the bundling only runs once per ruleset during a test run.
const rulesetCache = new Map<string, Promise<Ruleset>>();

function loadRuleset(rulesetFile: string): Promise<Ruleset> {
  let cached = rulesetCache.get(rulesetFile);
  if (!cached) {
    // The repo's custom functions are a mix of CommonJS (`module.exports`) and
    // ESM. The `commonjs` plugin lets the bundler handle both, matching how the
    // Spectral CLI loads them.
    cached = bundleAndLoadRuleset(rulesetFile, { fs, fetch }, [commonjs()]);
    rulesetCache.set(rulesetFile, cached);
  }
  return cached;
}

export type RuleTest = Readonly<{
  /** Human-readable description of the scenario. */
  name: string;
  /** The OpenAPI document (as a plain object) to lint. */
  document: Record<string, unknown>;
  /** The diagnostics expected from the rule under test (empty = valid). */
  errors: ReadonlyArray<Partial<ISpectralDiagnostic>>;
}>;

/**
 * Run a single scenario against one rule of a repo ruleset. Call once per case.
 *
 * Only diagnostics produced by `ruleName` are considered, so each `document`
 * only needs to contain enough to exercise that rule.
 *
 * @param ruleName The rule id under test (e.g. "entur-info-title").
 * @param test     The scenario to run.
 * @param ruleset  Absolute path to the ruleset file.
 */
export default function testRule(
  ruleName: string,
  test: RuleTest,
  ruleset: string
): void {
  it(`${ruleName}: ${test.name}`, async () => {
    const spectral = new Spectral();
    spectral.setRuleset(await loadRuleset(ruleset));

    const document = new Document(
      JSON.stringify(test.document),
      JsonParser,
      "document.json"
    );

    const results = await spectral.run(document);
    const ruleResults = results.filter(({ code }) => code === ruleName);

    expect(ruleResults).toEqual(
      test.errors.map((error) => expect.objectContaining(error))
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
