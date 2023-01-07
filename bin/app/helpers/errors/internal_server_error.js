class InternalServerError {
  constructor (msg, data) {
    this.data = data || null;
    this.msg = msg || 'Internal Server Error!';
    this.code = 500;
  }
}

module.exports = InternalServerError;
