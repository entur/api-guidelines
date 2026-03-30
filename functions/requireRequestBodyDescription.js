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
      if (mediaType.schema && mediaType.schema.description) {
        return;
      }
    }
  }

  return [{ message: 'Request body SHOULD have a description, either directly or on the referenced schema.' }];
};