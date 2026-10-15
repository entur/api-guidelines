import * as path from "node:path";
import { DiagnosticSeverity } from "@stoplight/types";
import testRule, { RULESETS } from "../spectral-util";

const rulesetPath = RULESETS.all;
const ruleset = path.basename(rulesetPath);

// entur-get-responses-validation
{
  const rule = "entur-get-responses-validation";

  testRule({
    rule,
    name: `valid when a GET uses an allowed response code (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          get: { responses: { "200": { description: "OK" } } },
        },
      },
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `flags a GET using a disallowed response code (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": {
          get: { responses: { "201": { description: "Created" } } },
        },
      },
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
}

// entur-post-responses-validation
{
  const rule = "entur-post-responses-validation";

  testRule({
    rule,
    name: `valid when POST uses an allowed response code (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": { post: { responses: { "201": { description: "Created" } } } },
      },
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `flags a POST using a disallowed response code (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items": { post: { responses: { "418": { description: "Teapot" } } } },
      },
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
}

// entur-put-responses-validation
{
  const rule = "entur-put-responses-validation";

  testRule({
    rule,
    name: `valid when PUT uses an allowed response code (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items/{itemId}": {
          put: { responses: { "200": { description: "OK" } } },
        },
      },
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `flags a PUT using a disallowed response code (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items/{itemId}": {
          put: { responses: { "418": { description: "Teapot" } } },
        },
      },
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
}

// entur-patch-responses-validation
{
  const rule = "entur-patch-responses-validation";

  testRule({
    rule,
    name: `valid when PATCH uses an allowed response code (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items/{itemId}": {
          patch: { responses: { "200": { description: "OK" } } },
        },
      },
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `flags a PATCH using a disallowed response code (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items/{itemId}": {
          patch: { responses: { "418": { description: "Teapot" } } },
        },
      },
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
}

// entur-delete-responses-validation
{
  const rule = "entur-delete-responses-validation";

  testRule({
    rule,
    name: `valid when DELETE uses an allowed response code (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items/{itemId}": {
          delete: { responses: { "204": { description: "No Content" } } },
        },
      },
    },
    rulesetPath,
  });

  testRule({
    rule,
    name: `flags a DELETE using a disallowed response code (${ruleset})`,
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {
        "/items/{itemId}": {
          delete: { responses: { "201": { description: "Created" } } },
        },
      },
    },
    rulesetPath,
    expectedIssues: [{ code: rule, severity: DiagnosticSeverity.Error }],
  });
}

