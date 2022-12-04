class BadRequestError {
  constructor (msg, data) {
    this.success = false;
    this.data = data || null;
    this.msg = msg || 'Bad Request Error!';
    this.code = 400;
  }
}

module.exports = BadRequestError;
