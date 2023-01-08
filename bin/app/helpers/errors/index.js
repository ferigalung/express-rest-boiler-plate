const BadRequestError = require('./bad_request_error');
const InternalServerError = require('./internal_server_error');
const UnprocessableEntityError = require('./unprocessable_entity');
const UnauthorizedError = require('./unauthorized_error');
const NotFoundError = require('./not_found_error');
const ForbiddenError = require('./forbidden_error');
module.exports = {
  BadRequestError,
  InternalServerError,
  UnprocessableEntityError,
  UnauthorizedError,
  NotFoundError,
  ForbiddenError
};
