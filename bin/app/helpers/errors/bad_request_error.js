class BadRequestError {
  constructor (msg, data) {
    this.data = data || null;
    this.msg = msg || 'Bad Request Error!';
    this.code = 400;
  }
}

module.exports = BadRequestError;
