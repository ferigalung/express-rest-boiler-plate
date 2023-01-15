const success = ({ data = null, meta, msg = 'Successfully process the request!', code = 200 }) => ({
  success: true,
  data,
  msg,
  code,
  meta
});

module.exports = {
  success
};
