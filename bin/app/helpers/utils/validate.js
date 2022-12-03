const validate = (schema, payload) => {
  let { error, value } = schema.validate(payload);
  if (error) {
    error = {
      status: false,
      data: null,
      msg: 'Validation Error!',
      code: 422,
      meta: error.details?.map(item => ({
        key: item.context?.key,
        msg: item.message
      }))
    };
  }
  return { error, value };
};

module.exports = validate;
