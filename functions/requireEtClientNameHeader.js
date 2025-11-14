const METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head', 'trace'];

const isEtClientNameParam = (param) => {
  if (!param || typeof param !== 'object') {
    return false;
  }

  return (
    param.name === 'ET-Client-Name' &&
    param.in === 'header' &&
    param.required === true
  );
};

const hasHeader = (params) => Array.isArray(params) && params.some(isEtClientNameParam);

module.exports = (targetVal, _opts, context) => {
  if (!targetVal || typeof targetVal !== 'object') {
    return;
  }

  const pathHasHeader = hasHeader(targetVal.parameters);
  const results = [];

  for (const property in targetVal) {
    if (!METHODS.includes(property)) {
      continue;
    }

    const operation = targetVal[property];

    if (pathHasHeader || hasHeader(operation.parameters)) {
      continue;
    }

    results.push({
      message: context?.rule?.message,
      path: [...context.path, property, 'parameters'],
    });
  }

  return results;
};
