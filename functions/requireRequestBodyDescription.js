/**
 * Custom Spectral function to check if a request body has a description,
 * either directly on the requestBody or on the resolved schema reference.
 */
module.exports = (targetVal) => {
  // Check if there's a direct description on the requestBody
  if (targetVal.description) {
    return;
  }

  // Check if the resolved schema has a description
  if (targetVal.content) {
    for (const [mediaTypeName, mediaType] of Object.entries(targetVal.content)) {
      if (!mediaType.schema) {
        return [{ message: `Request body SHOULD have a description, either directly or on the referenced schema. Media type "${mediaTypeName}" has no schema.` }];
      }

      const schema = mediaType.schema;

      // Direct description on schema
      if (schema.description) {
        continue;
      }

      // Array schema with items that have a description
      if (schema.type === 'array' && schema.items && schema.items.description) {
        continue;
      }

      return [{ message: `Request body SHOULD have a description, either directly or on the referenced schema. Media type "${mediaTypeName}" is missing a description.` }];
    }

    // All media types have descriptions
    return;
  }

  return [{ message: 'Request body SHOULD have a description, either directly or on the referenced schema.' }];
};