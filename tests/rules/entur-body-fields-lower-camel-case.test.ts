import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);

describe("rule entur-body-fields-lower-camel-case", () => {
  const rule = "entur-body-fields-lower-camel-case";

  testRule({
    rule,
    name: `valid for lowerCamelCase body field names (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {},
      components: {
        schemas: {
          Item: { type: "object", properties: { itemName: { type: "string" } } },
        },
      },
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `flags a body field name that is not lowerCamelCase (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {},
      components: {
        schemas: {
          Item: { type: "object", properties: { Item_Name: { type: "string" } } },
        },
      },
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
});

