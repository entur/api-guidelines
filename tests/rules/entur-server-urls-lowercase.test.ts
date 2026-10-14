import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../spectral-util";

const resolve = (p: string): string => path.resolve(__dirname, p);
const rulesetPath = resolve("../../.spectral.yml");
const rule = "entur-server-urls-lowercase";

testRule({
  rule,
  name: "valid for a lowercase server URL",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    servers: [{ url: "https://api.entur.io/v1" }],
    paths: {},
  },
  rulesetPath,
});

testRule({
  rule,
  name: "flags a server URL containing uppercase characters",
  document: {
    openapi: "3.0.3",
    info: { title: "Ticketing", version: "1.0.0" },
    servers: [{ url: "https://API.entur.io/v1" }],
    paths: {},
  },
  rulesetPath,
  expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
});

