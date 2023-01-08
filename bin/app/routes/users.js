const express = require('express');
const router = express.Router();
const commandHandler = require('../../modules/users/commands/handler');
const basicAuth = require('../helpers/auth/basicAuth');

router.post('/login', basicAuth, commandHandler.postLoginUser);
router.post('/register', basicAuth, commandHandler.postRegisterUser);

module.exports = router;
