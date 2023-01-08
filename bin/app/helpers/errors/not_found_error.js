class NotFoundError extends Error {
  constructor (msg, data) {
    super(msg);
    this.data = data || null;
    this.msg = msg || 'Data Not Found!';
    this.code = 404;
  }
}

module.exports = NotFoundError;
