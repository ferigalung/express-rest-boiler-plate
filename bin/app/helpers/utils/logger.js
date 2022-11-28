const pino = require('pino')();

const info = (msg, ctx = 'app', scope = '') => {
  const log = pino.child({ ctx, scope });
  log.info(msg);
};

const error = (msg, ctx = 'app', scope = '') => {
  const log = pino.child({ ctx, scope });
  log.error(msg);
};

module.exports = {
  info,
  error
};
