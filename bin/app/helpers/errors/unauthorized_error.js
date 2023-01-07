class UnauthorizedError {
  constructor (msg, data) {
    this.data = data || null;
    this.msg = msg || 'Unauthorized!';
    this.code = 401;
  }
}

module.exports = UnauthorizedError;
