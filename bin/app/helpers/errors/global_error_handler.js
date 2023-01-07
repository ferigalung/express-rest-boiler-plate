const errorHandling = (err, req, res, next) => {
  return res.status(err.code).json({
    status: false,
    data: err.data || null,
    msg: err.msg || 'Internal Server Error!',
    code: err.code || 500
  });
};

module.exports = errorHandling;
