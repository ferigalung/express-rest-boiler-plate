class UnprocessableEntityError extends Error {
  constructor (msg, data) {
    super(msg);
    this.data = data || null;
    this.msg = msg || 'Unprocessable Entity Error!';
    this.code = 422;
  }
}

module.exports = UnprocessableEntityError;
