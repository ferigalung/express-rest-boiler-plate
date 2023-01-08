const express = require('express');
const router = express.Router();
const commandHandler = require('../../modules/members/commands/handler');
const queryhandler = require('../../modules/members/queries/handler');
const { verifyJwt } = require('../helpers/auth/jwtAuth');

router.get('/', verifyJwt, queryhandler.getAllMembers);
router.get('/:memberId', verifyJwt, queryhandler.getOneMember);
router.post('/', verifyJwt, commandHandler.postInsertOneMember);
router.put('/:memberId', verifyJwt, commandHandler.putUpdateOneMember);
router.delete('/:memberId', verifyJwt, commandHandler.deleteOneMember);

module.exports = router;
