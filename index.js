require('dotenv').config();
const pkg = require('./package.json');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { connectToDb } = require('./bin/app/helpers/databases/mongodb/db');
const logger = require('./bin/app/helpers/utils/logger');
const wrapper = require('./bin/app/helpers/utils/wrapper');
// const basicAuth = require('express-basic-auth');
const errorHandling = require('./bin/app/helpers/errors/global_error_handler');

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
// app.use(basicAuth({
//   users: {
//     admin: 'admin'
//   },
//   unauthorizedResponse: {
//     success: false,
//     data: null,
//     msg: 'Unauthorized Error!',
//     code: 401
//   }
// }));

// default route
app.get('/', (req, res) => {
  res.json(wrapper.success({ data: null, msg: `${pkg.name} running perfectly` }));
});

// routes
app.use('/members/v1', require('./bin/app/routes/members'));

// error handling
app.use(errorHandling);

// db connection
connectToDb(err => {
  if (!err) {
    logger.info('MongoDB connection set successfully');
    app.listen(port, () => {
      logger.info(`${pkg.name} running and listening on port ${port}`);
    });
    return;
  }
  logger.error('MongoDB connection failed');
});
