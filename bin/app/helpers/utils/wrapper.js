const wrapper = (msg, data = null, status = true) => ({
  status,
  data,
  msg
});

module.exports = wrapper;
