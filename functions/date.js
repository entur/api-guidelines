module.exports = (targetVal, options, context) => {
  if (typeof targetVal !== "string") {
    return [{ message: "Must be a valid calendar date." }]
  }
  if (targetVal.match(/^\d{4}-\d{2}-\d{2}$/) == null) {
    return [{ message: "Must be a valid calendar date." }]
  }

  if (isNaN(Date.parse(targetVal))) {
    return [{ message: "Must be a valid calendar date." }]
  }

  return []
}