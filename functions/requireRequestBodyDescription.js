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
    for (const mediaType of Object.values(targetVal.content)) {
      if (mediaType.schema) {
        if (mediaType.schema.description) {
          return;
        }
        // Check if schema is an array with items that have a description
        if (mediaType.schema.type === 'array' && mediaType.schema.items && mediaType.schema.items.description) {
          return;
        }
      }
    }
  }

  return [{ message: 'Request body SHOULD have a description, either directly or on the referenced schema.' }];
};