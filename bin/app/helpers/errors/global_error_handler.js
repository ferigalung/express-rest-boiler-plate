const errorHandling = (err, req, res, next) => {
  const code = typeof (err.code) === 'number' ? err.code : 500;
  return res.status(code).json({
    status: false,
    data: err.data || null,
    msg: err.msg || err || 'Internal Server Error!',
    code
  });
};

module.exports = errorHandling;
