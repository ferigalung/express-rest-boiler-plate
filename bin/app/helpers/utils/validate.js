const { UnprocessableEntityError } = require('../errors');

const validate = (schema, payload) => {
  let { error, value } = schema.validate(payload);
  if (error) {
    error = new UnprocessableEntityError(error.details[0]?.message);
  }
  return { error, value };
};

module.exports = validate;
