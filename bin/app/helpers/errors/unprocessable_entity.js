class UnprocessableEntityError {
  constructor (msg, data) {
    this.data = data || null;
    this.msg = msg || 'Unprocessable Entity Error!';
    this.code = 422;
  }
}

module.exports = UnprocessableEntityError;
