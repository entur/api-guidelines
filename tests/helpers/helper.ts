import * as fs from "node:fs";
import * as path from "node:path";
import {
  Spectral,
  Document,
  type Ruleset,
  type ISpectralDiagnostic,
} from "@stoplight/spectral-core";
import { Json as JsonParser } from "@stoplight/spectral-parsers";
import { bundleAndLoadRuleset } from "@stoplight/spectral-ruleset-bundler/with-loader";
import { commonjs } from "@stoplight/spectral-ruleset-bundler/plugins/commonjs";
import { fetch } from "@stoplight/spectral-runtime";

const DEFAULT_RULESET = path.resolve(__dirname, "..", "..", ".spectral.yml");

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

export type Scenario = ReadonlyArray<
  Readonly<{
    /** Human-readable description of the scenario. */
    name: string;
    /** The OpenAPI document (as a plain object) to lint. */
    document: Record<string, unknown>;
    /** The diagnostics expected from the rule under test (empty = valid). */
    errors: ReadonlyArray<Partial<ISpectralDiagnostic>>;
  }>
>;

/**
 * Run a set of scenarios against a single rule of one of the repo rulesets.
 *
 * Only diagnostics produced by `ruleName` are considered, so each `document`
 * only needs to contain enough to exercise that rule.
 *
 * @param ruleName The rule id under test (e.g. "entur-info-title").
 * @param tests    The scenarios to run.
 * @param ruleset  Absolute path to the ruleset file. Defaults to `../../.spectral.yml`.
 */
export default function testRule(
  ruleName: string,
  tests: Scenario,
  ruleset = DEFAULT_RULESET
): void {
  describe(ruleName, () => {
    for (const testCase of tests) {
      it(testCase.name, async () => {
        const spectral = new Spectral();
        spectral.setRuleset(await loadRuleset(ruleset));

        const document = new Document(
          JSON.stringify(testCase.document),
          JsonParser,
          "document.json"
        );

        const results = await spectral.run(document);
        const ruleResults = results.filter(({ code }) => code === ruleName);

        expect(ruleResults).toEqual(
          testCase.errors.map((error) => expect.objectContaining(error))
        );
      });
    }
  });
}

