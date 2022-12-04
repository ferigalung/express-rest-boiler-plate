const wrapper = (msg, data = null, meta) => ({
  success: true,
  data,
  msg,
  code: 200,
  meta
});

module.exports = wrapper;
