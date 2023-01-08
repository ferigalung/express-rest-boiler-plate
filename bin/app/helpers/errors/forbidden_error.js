class ForbiddenError extends Error {
  constructor (msg, data) {
    super(msg);
    this.data = data || null;
    this.msg = msg || 'Forbidden Error!';
    this.code = 403;
  }
}

module.exports = ForbiddenError;
