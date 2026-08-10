import { createRulesetFunction } from "@stoplight/spectral-core";

/**
 * "conditionallyDefined" lints that a field must _only_ be defined if another field in the same object has a certain value.
 * 
 * The target of this function must be an object.
 * then use functionOptions to specify:
 *   - field: The field in the target that should be defined or not
 *   - conditionalField: The field in the target that needs to have certain value
 *   - havingValue: The value that the conditionalField must have. If not specified, conditionalField must be non-null.
 * 
 * Note: Neither "field" nor "conditionalField" can be a json path, only a direct field of the target object.
 */
export default createRulesetFunction(
  {
    input: { type: "object" },
    options: {
      type: "object",
      additionalProperties: false,
      properties: {
        field: {
          type: "string"

        },
        conditionalField: {
          type: "string"
        },
        havingValue: {}
      },
      required: ["field", "conditionalField"],
    },

  },
  function conditionallyDefined(targetVal, { field, conditionalField, havingValue}, context) {
    const fieldValue = targetVal[field]
    const conditionalFieldValue = targetVal[conditionalField]

    if (havingValue !== undefined ? (conditionalFieldValue === havingValue) : (conditionalFieldValue != null)) {
      if (fieldValue == null) {
        return [{
          message: `\"${field}\" should be defined when \"${conditionalField}\" is ${havingValue !== undefined ? JSON.stringify(havingValue) : "non-nullable"} `,
          path: [...context.path, conditionalField]
        }]
      }
    } else {
      if (fieldValue != null) {
        return [{
          message: `Should only be defined when \"${conditionalField}\" is ${havingValue !== undefined ? JSON.stringify(havingValue) : "non-nullable"} `,
          path: [...context.path, field]
        }]
      }
    }

    return []
  }
)
