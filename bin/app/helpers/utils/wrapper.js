const wrapper = (msg, data = null) => ({
  status: true,
  data,
  msg,
  code: 200
});

module.exports = wrapper;
