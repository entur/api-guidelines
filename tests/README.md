# Spectral rule tests
Unit tests for the Entur Spectral rulesets (`../.spectral.yml` and
`../.spectral-required.yml`) written in **TypeScript** with
[Jest](https://jestjs.io/) + [ts-jest](https://kulshekhar.github.io/ts-jest/).
The structure follows the
[Testing Spectral Style Guides with Jest](https://apisyouwonthate.com/blog/testing-spectral-style-guides-with-jest/)
article: a shared `helpers/helper.ts` exposes a default `testRule` function, and
there is **one test file per rule** named `<rule-id>.test.ts`. Each scenario
provides a small `document` plus the `errors` expected from the rule under test
(custom functions from `../functions/` are bundled in via `bundleAndLoadRuleset`).
## Setup
```bash
cd tests
npm install
```
## Running the tests
```bash
npm test            # run once
npm run test:watch  # watch mode
npm run typecheck   # tsc --noEmit
```
## Project layout
| Path                   | Purpose                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `helpers/helper.ts`    | Default-exported `testRule(ruleName, scenarios, ruleset?)`.    |
| `rules/<rule>.test.ts` | One file per rule, driving `testRule` with scenarios.          |
| `jest.config.js`       | Jest + ts-jest configuration.                                  |
| `tsconfig.json`        | TypeScript configuration for the tests.                        |
## Writing a new rule test
Create `rules/<rule-id>.test.ts`:
```ts
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../helpers/helper";
testRule("my-rule", [
  {
    name: "valid case",
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {},
    },
    errors: [],
  },
  {
    name: "flags the violation",
    document: {
      /* ...minimal document that triggers the rule... */
    },
    errors: [
      { code: "my-rule", severity: DiagnosticSeverity.Error },
    ],
  },
]);
```
Only diagnostics from the named rule are asserted, so each `document` only needs
enough to exercise that one rule. `DiagnosticSeverity` values: `Error` = 0,
`Warning` = 1, `Information` = 2, `Hint` = 3.
To test the publish-gating ruleset instead, pass its filename as the third arg:
```ts
testRule("entur-permissions", [ /* ...scenarios... */ ], ".spectral-required.yml");
```
