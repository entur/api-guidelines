import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "../helpers/helper";

testRule("entur-info-title", [
  {
    name: "valid when the info section has a non-empty title",
    document: {
      openapi: "3.0.3",
      info: { title: "Ticketing", version: "1.0.0" },
      paths: {},
    },
    errors: [],
  },
  {
    name: "flags a missing info title",
    document: {
      openapi: "3.0.3",
      info: { version: "1.0.0" },
      paths: {},
    },
    errors: [
      {
        code: "entur-info-title",
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);
