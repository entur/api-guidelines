module.exports = (targetVal, options, context) => {
  if (typeof targetVal !== "object") {
    return [{message: "\"x-entur-permissions\" must be an object."}]
  }

  const messages = []
  for (const prop of Object.getOwnPropertyNames(targetVal)) {
    if (!["value", "description"].includes(prop)) {
      messages.push({ message: `Unrecognized property \"${prop}\"`, path: [...context.path, prop] })
    }
  }
  if (targetVal.description != null && typeof targetVal.description !== "string") {
      messages.push({ message: "\"description\" property must be a string", path: [...context.path, "description"] })
  }

  messages.push(...xEnturPermissionsValue(targetVal.value, [...context.path, "value"]))

  return messages
}

function xEnturPermissionsValue(targetVal, path = []) {
  if (typeof targetVal === "string") {
    const match = targetVal.toLocaleLowerCase().match(/^[0-9a-zæøå][0-9a-zæøå.\\-]{0,99}:(les|opprett|endre|slett)$/)
    if (!match) {
      return [{ message: "Must match format \"permission:(les/opprett/endre/slett)\"", path}]
    } else {
      return []
    }
  } else if (typeof targetVal === "object") {
    const props = Object.getOwnPropertyNames(targetVal);

    if (props.length != 1 || !["any", "all"].includes(props[0])) {
      return [{ message: "Must be an object with either \"any\" or \"all\"", path}]
    }

    const val = targetVal[props[0]];
    if (!Array.isArray(val)) {
      return [{ message: "Must be an array", path: [...path, props[0]] }]
    }

    return val.flatMap((x, index) => xEnturPermissionsValue(x, [...path, props[0], index]));
  } else {
    return [{ message: "Must be either an object or a string", path }]

  }

}