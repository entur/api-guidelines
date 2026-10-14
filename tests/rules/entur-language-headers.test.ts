import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const rulesetPath = resolve("../../.spectral.yml");
const rule = "entur-language-headers";

const withAcceptLanguageExample = (example: string) => ({
  openapi: "3.0.3",
  info: { title: "Ticketing", version: "1.0.0" },
  paths: {
    "/items": {
      get: {
        parameters: [
          {
            name: "Accept-Language",
            in: "header",
            description: "Preferred language",
            schema: { type: "string" },
            example,
          },
        ],
        responses: { "200": { description: "OK" } },
      },
    },
  },
});

testRule({
  rule,
  name: "valid for a BCP 47 language that is not a macrolanguage",
  document: withAcceptLanguageExample("nb"),
  rulesetPath,
});

testRule({
  rule,
  name: "flags a macrolanguage code",
  document: withAcceptLanguageExample("no"),
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
});

