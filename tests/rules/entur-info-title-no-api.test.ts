import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../helpers/helper";

testRule("entur-info-title-no-api", [
  {
    name: "valid when the title does not contain 'api'",
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {},
    },
    errors: [],
  },
  {
    name: "warns when the title contains the word 'api'",
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing API", version: "1.0.0" },
      paths: {},
    },
    errors: [
      {
        code: "entur-info-title-no-api",
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);

