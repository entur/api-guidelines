import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

// Rules that run against every ruleset.
for (const rulesetPath of Object.values(RULESETS)) {
  const ruleset = path.basename(rulesetPath);

  // entur-deprecation-api
  describe("rule entur-deprecation-api", () => {
    const rule = "entur-deprecation-api";

    testRule({
      rule,
      name: `valid when x-deprecated is a boolean (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: { title: "Ticketing", version: "1.0.0", "x-deprecated": true },
        paths: {},
      },
      rulesetPath,
    });

    testRule({
      rule,
      name: `flags a non-boolean x-deprecated (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: { title: "Ticketing", version: "1.0.0", "x-deprecated": "yes" },
        paths: {},
      },
      rulesetPath,
      expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
    });
  });

  // entur-stability-level-api
  describe("rule entur-stability-level-api", () => {
    const rule = "entur-stability-level-api";

    testRule({
      rule,
      name: `valid for a recognised stability level (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: { title: "Ticketing", version: "1.0.0", "x-stability-level": "beta" },
        paths: {},
      },
      rulesetPath,
    });

    testRule({
      rule,
      name: `flags an unrecognised stability level (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: {
          title: "Ticketing",
          version: "1.0.0",
          "x-stability-level": "experimental",
        },
        paths: {},
      },
      rulesetPath,
      expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
    });
  });

  // entur-stability-level-operation
  describe("rule entur-stability-level-operation", () => {
    const rule = "entur-stability-level-operation";

    testRule({
      rule,
      name: `valid for a recognised operation stability level (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: { title: "Ticketing", version: "1.0.0" },
        paths: {
          "/items": {
            get: {
              responses: { "200": { description: "OK" } },
              "x-stability-level": "stable",
            },
          },
        },
      },
      rulesetPath,
    });

    testRule({
      rule,
      name: `flags an unrecognised operation stability level (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: { title: "Ticketing", version: "1.0.0" },
        paths: {
          "/items": {
            get: {
              responses: { "200": { description: "OK" } },
              "x-stability-level": "experimental",
            },
          },
        },
      },
      rulesetPath,
      expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
    });
  });

  // entur-sunset-format-api
  //
  // The sunset format rules use the custom `date` function (functions/date.js),
  // so they also verify that custom Spectral functions are bundled and loaded
  // correctly.
  describe("rule entur-sunset-format-api", () => {
    const rule = "entur-sunset-format-api";

    testRule({
      rule,
      name: `accepts a valid calendar date for info.x-sunset (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: {
          title: "Ticketing",
          version: "1.0.0",
          "x-deprecated": true,
          "x-sunset": "2030-01-01",
        },
        paths: {},
      },
      rulesetPath,
    });

    testRule({
      rule,
      name: `rejects an invalid date for info.x-sunset (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: {
          title: "Ticketing",
          version: "1.0.0",
          "x-deprecated": true,
          "x-sunset": "not-a-date",
        },
        paths: {},
      },
      rulesetPath,
      expectedIssues: [
        {
          code: rule,
          message: "Must be a valid calendar date.",
          severity: DiagnosticSeverity.Error,
        },
      ],
    });
  });

  // entur-sunset-format-operation
  describe("rule entur-sunset-format-operation", () => {
    const rule = "entur-sunset-format-operation";

    testRule({
      rule,
      name: `accepts a valid calendar date for an operation x-sunset (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: { title: "Ticketing", version: "1.0.0" },
        paths: {
          "/items": {
            get: {
              deprecated: true,
              responses: { "200": { description: "OK" } },
              "x-sunset": "2030-01-01",
            },
          },
        },
      },
      rulesetPath,
    });

    testRule({
      rule,
      name: `rejects an invalid date for an operation x-sunset (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: { title: "Ticketing", version: "1.0.0" },
        paths: {
          "/items": {
            get: {
              deprecated: true,
              responses: { "200": { description: "OK" } },
              "x-sunset": "not-a-date",
            },
          },
        },
      },
      rulesetPath,
      expectedIssues: [
        {
          code: rule,
          message: "Must be a valid calendar date.",
          severity: DiagnosticSeverity.Error,
        },
      ],
    });
  });
}

// Rules that only run against the full ruleset (RULESETS.all).
{
  const rulesetPath = RULESETS.all;
  const ruleset = path.basename(rulesetPath);

  // entur-sunset-api
  describe("rule entur-sunset-api", () => {
    const rule = "entur-sunset-api";

    testRule({
      rule,
      name: `valid when a deprecated API also declares x-sunset (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: {
          title: "Ticketing",
          version: "1.0.0",
          "x-deprecated": true,
          "x-sunset": "2030-01-01",
        },
        paths: {},
      },
      rulesetPath,
    });

    testRule({
      rule,
      name: `flags a deprecated API with no x-sunset (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: { title: "Ticketing", version: "1.0.0", "x-deprecated": true },
        paths: {},
      },
      rulesetPath,
      expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
    });
  });

  // entur-sunset-operation
  describe("rule entur-sunset-operation", () => {
    const rule = "entur-sunset-operation";

    testRule({
      rule,
      name: `valid when a deprecated operation also declares x-sunset (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: { title: "Ticketing", version: "1.0.0" },
        paths: {
          "/items": {
            get: {
              deprecated: true,
              "x-sunset": "2030-01-01",
              responses: { "200": { description: "OK" } },
            },
          },
        },
      },
      rulesetPath,
    });

    testRule({
      rule,
      name: `flags a deprecated operation with no x-sunset (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: { title: "Ticketing", version: "1.0.0" },
        paths: {
          "/items": {
            get: { deprecated: true, responses: { "200": { description: "OK" } } },
          },
        },
      },
      rulesetPath,
      expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Information }],
    });
  });
}

