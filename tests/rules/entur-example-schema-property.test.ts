import * as path from "node:path";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const rulesetPath = resolve("../../.spectral.yml");
const rule = "entur-example-schema-property";

// This rule is `recommended: false`, so it is disabled under the default
// ruleset. A schema property without an example would warn if it were enabled,
// so asserting no diagnostics guards that it stays opt-in.
testRule({
  rule,
  name: "is disabled: no diagnostic when a schema property has no example",
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

