import * as path from "node:path";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const rulesetPath = resolve("../../.spectral.yml");
const rule = "info-contact";

// This built-in spectral:oas rule is turned off in .spectral.yml. A document
// missing info.contact would warn if the rule were enabled, so asserting no
// diagnostics here guards that the "off" toggle stays in place.
testRule({
  rule,
  name: "is disabled: no diagnostic even when info.contact is missing",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0", description: "Ticketing API" },
    paths: {},
  },
  rulesetPath,
});

