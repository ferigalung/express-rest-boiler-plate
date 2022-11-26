require('dotenv').config();
const pkg = require('./package.json');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// default route
app.get('/', (req, res) => {
  res.json({
    success: true,
    data: null,
    message: `${pkg.name} running perfectly`
  });
});

// routes
app.use('/members/v1', require('./app/routes/members'));

app.listen(port, () => {
  console.log(`${pkg.name} running and listening on port ${port}`);
});
