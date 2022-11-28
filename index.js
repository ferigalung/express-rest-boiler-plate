require('dotenv').config();
const pkg = require('./package.json');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { connectToDb } = require('./bin/app/helpers/databases/mongodb/db');
const wrapper = require('./bin/app/helpers/utils/wrapper');
const logger = require('./bin/app/helpers/utils/logger');

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

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

// default route
app.get('/', (req, res) => {
  res.json(wrapper(null, null, `${pkg.name} running perfectly`));
});

// routes
app.use('/members/v1', require('./bin/app/routes/members'));
