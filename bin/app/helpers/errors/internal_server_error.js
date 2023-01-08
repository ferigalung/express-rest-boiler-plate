class InternalServerError extends Error {
  constructor (msg, data) {
    super(msg);
    this.data = data || null;
    this.msg = msg || 'Internal Server Error!';
    this.code = 500;
  }
}

module.exports = InternalServerError;
