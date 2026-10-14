import * as path from "node:path";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);
const rule = "entur-example-schema-property";

// This rule is `recommended: false`, so it is disabled under the default
// ruleset. A schema property without an example would warn if it were enabled,
// so asserting no diagnostics guards that it stays opt-in.
testRule({
  rule,
  name: `is disabled: no diagnostic when a schema property has no example (${ruleset})`,
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    paths: {},
    components: {
      schemas: {
        Item: { type: "object", properties: { name: { type: "string" } } },
      },
    },
  },
  rulesetPath,
});

