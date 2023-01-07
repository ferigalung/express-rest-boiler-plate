const error = (params, meta) => ({
  success: false,
  data: params.data || null,
  msg: params.msg || 'Unknown Error!',
  code: params.code || 500,
  meta
});

const success = (params, meta) => ({
  success: true,
  data: params.data || null,
  msg: params.msg || 'Successfully process the request!',
  code: params.code || 200,
  meta
});

module.exports = {
  error,
  success
};
