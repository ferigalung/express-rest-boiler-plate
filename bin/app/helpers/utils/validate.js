const validate = (schema, payload) => {
  let { error, value } = schema.validate(payload);
  if (error) {
    error = {
      success: false,
      data: null,
      msg: error.details[0]?.message,
      code: 422
      // meta: error.details?.map(item => ({
      //   key: item.context?.key,
      //   msg: item.message
      // }))
    };
  }
  return { error, value };
};

module.exports = validate;
