class BadRequestError extends Error {
  constructor (msg, data) {
    super(msg);
    this.data = data || null;
    this.msg = msg || 'Bad Request Error!';
    this.code = 400;
  }
}

module.exports = BadRequestError;
