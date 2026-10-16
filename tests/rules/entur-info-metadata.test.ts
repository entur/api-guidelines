import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

for (const rulesetPath of Object.values(RULESETS)) {
  const ruleset = path.basename(rulesetPath);

  // entur-info-metadata-id
  describe("rule entur-info-metadata-id", () => {
    const rule = "entur-info-metadata-id";

    testRule({
      rule,
      name: `valid when info.x-entur-metadata.id is present (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: {
          title: "Ticketing",
          version: "1.0.0",
          "x-entur-metadata": { id: "ticketing" },
        },
        paths: {},
      },
      rulesetPath,
    });

    testRule({
      rule,
      name: `flags a missing info.x-entur-metadata.id (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: {
          title: "Ticketing",
          version: "1.0.0",
          "x-entur-metadata": { owner: "team-api" },
        },
        paths: {},
      },
      rulesetPath,
      expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
    });
  });

  // entur-info-metadata-id-kebab-case
  describe("rule entur-info-metadata-id-kebab-case", () => {
    const rule = "entur-info-metadata-id-kebab-case";

    testRule({
      rule,
      name: `valid for a lower-kebab-case id (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: {
          title: "Ticketing",
          version: "1.0.0",
          "x-entur-metadata": { id: "ticketing-api" },
        },
        paths: {},
      },
      rulesetPath,
    });

    testRule({
      rule,
      name: `flags an id that is not lower-kebab-case (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: {
          title: "Ticketing",
          version: "1.0.0",
          "x-entur-metadata": { id: "Ticketing" },
        },
        paths: {},
      },
      rulesetPath,
      expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
    });
  });

  // entur-info-metadata-parent-id-kebab-case
  describe("rule entur-info-metadata-parent-id-kebab-case", () => {
    const rule = "entur-info-metadata-parent-id-kebab-case";

    testRule({
      rule,
      name: `valid for a lower-kebab-case parentId (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: {
          title: "Ticketing",
          version: "1.0.0",
          "x-entur-metadata": { parentId: "parent-ticketing" },
        },
        paths: {},
      },
      rulesetPath,
    });

    testRule({
      rule,
      name: `flags a parentId that is not lower-kebab-case (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: {
          title: "Ticketing",
          version: "1.0.0",
          "x-entur-metadata": { parentId: "Parent" },
        },
        paths: {},
      },
      rulesetPath,
      expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
    });
  });

  // entur-info-metadata-owner
  describe("rule entur-info-metadata-owner", () => {
    const rule = "entur-info-metadata-owner";

    testRule({
      rule,
      name: `valid when owner is present (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: {
          title: "Ticketing",
          version: "1.0.0",
          "x-entur-metadata": { owner: "team-api" },
        },
        paths: {},
      },
      rulesetPath,
    });

    testRule({
      rule,
      name: `flags a missing owner (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: {
          title: "Ticketing",
          version: "1.0.0",
          "x-entur-metadata": { audience: "partner" },
        },
        paths: {},
      },
      rulesetPath,
      expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
    });
  });

  // entur-info-metadata-owner-valid
  describe("rule entur-info-metadata-owner-valid", () => {
    const rule = "entur-info-metadata-owner-valid";

    testRule({
      rule,
      name: `valid for a 'team-' prefixed lower-kebab-case owner (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: {
          title: "Ticketing",
          version: "1.0.0",
          "x-entur-metadata": { owner: "team-api" },
        },
        paths: {},
      },
      rulesetPath,
    });

    testRule({
      rule,
      name: `flags an owner that is not lower-kebab-case (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: {
          title: "Ticketing",
          version: "1.0.0",
          "x-entur-metadata": { owner: "team-Api" },
        },
        paths: {},
      },
      rulesetPath,
      expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
    });
  });

  // entur-info-metadata-audience
  describe("rule entur-info-metadata-audience", () => {
    const rule = "entur-info-metadata-audience";

    testRule({
      rule,
      name: `valid when audience is present (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: {
          title: "Ticketing",
          version: "1.0.0",
          "x-entur-metadata": { audience: "partner" },
        },
        paths: {},
      },
      rulesetPath,
    });

    testRule({
      rule,
      name: `flags a missing audience (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: {
          title: "Ticketing",
          version: "1.0.0",
          "x-entur-metadata": {},
        },
        paths: {},
      },
      rulesetPath,
      expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
    });
  });

  // entur-info-metadata-audience-valid
  describe("rule entur-info-metadata-audience-valid", () => {
    const rule = "entur-info-metadata-audience-valid";

    testRule({
      rule,
      name: `valid for a recognised audience value (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: {
          title: "Ticketing",
          version: "1.0.0",
          "x-entur-metadata": { audience: "feil" },
        },
        paths: {},
      },
      rulesetPath,
    });

    testRule({
      rule,
      name: `flags an unrecognised audience value (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: {
          title: "Ticketing",
          version: "1.0.0",
          "x-entur-metadata": { audience: "public" },
        },
        paths: {},
      },
      rulesetPath,
      expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
    });
  });

  // entur-info-metadata-devExtensions
  describe("rule entur-info-metadata-devExtensions", () => {
    const rule = "entur-info-metadata-devExtensions";

    testRule({
      rule,
      name: `valid when every devExtension is 'x-' prefixed (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: {
          title: "Ticketing",
          version: "1.0.0",
          "x-entur-metadata": { devExtensions: ["x-kotlin-implements"] },
        },
        paths: {},
      },
      rulesetPath,
    });

    testRule({
      rule,
      name: `flags a devExtension without the 'x-' prefix (${ruleset})`,
      document: {
        openapi: "3.0.3",
        info: {
          title: "Ticketing",
          version: "1.0.0",
          "x-entur-metadata": { devExtensions: ["kotlin-implements"] },
        },
        paths: {},
      },
      rulesetPath,
      expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
    });
  });
}

