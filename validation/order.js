const isEmpty = require('./is-empty')

module.exports = function validateOrderInput(foods) {
  const errors = {}

  if (!Array.isArray(foods)) {
    errors.foods = 'Order must have food ids'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
