class UnauthorizedError extends Error {
  constructor (msg, data) {
    super(msg);
    this.data = data || null;
    this.msg = msg || 'Unauthorized!';
    this.code = 401;
  }
}

module.exports = UnauthorizedError;
