/**
 * Custom Spectral function to check if a response/request body content has examples.
 * Handles arrays with $ref in items by resolving the reference and checking for examples.
 */

module.exports = (targetVal, options, context) => {
  // Check if there's a direct example or examples at the content level
  if (targetVal.example || targetVal.examples) {
    return;
  }

  // Check if there's a schema
  if (!targetVal.schema) {
    return [{ message: 'Missing example: no schema' }];
  }

  const schema = targetVal.schema;

  // Check if schema has direct example or examples
  if (schema.example || schema.examples) {
    return;
  }

  // Check if it's an array with items (which may have been resolved by Spectral)
  if (schema.type === 'array' && schema.items) {
    // Spectral resolves $refs, so schema.items should be the actual resolved object
    const items = schema.items;

    // Check if items has example or examples
    if (items.example || items.examples) {
      return; // Valid - items schema has examples
    }
  }

  // No examples found - return violation
  return [{ message: 'Missing example' }];
};
