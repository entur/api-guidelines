import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const rulesetPath = resolve("../../.spectral.yml");
const rule = "entur-headers-hyphenated-pascal-case";

const withHeaderName = (name: string) => ({
  openapi: "3.0.3",
  info: { title: "Ticketing", version: "1.0.0" },
  paths: {
    "/items": {
      get: {
        parameters: [
          {
            name,
            in: "header",
            description: "A header",
            schema: { type: "string" },
          },
        ],
        responses: { "200": { description: "OK" } },
      },
    },
  },
});

testRule({
  rule,
  name: "valid for a Hyphenated-Pascal-Case header name",
  document: withHeaderName("Accept-Language"),
  rulesetPath,
});

testRule({
  rule,
  name: "flags a header name that is not Hyphenated-Pascal-Case",
  document: withHeaderName("accept-language"),
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
});

