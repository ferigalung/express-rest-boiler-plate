const express = require('express');
const router = express.Router();
const commandHandler = require('../../modules/members/commands/handler');
const queryhandler = require('../../modules/members/queries/handler');
// const jwtAuth = require('../helpers/auth/jwtAuth');

router.get('/', queryhandler.getAllMembers);
router.get('/:memberId', queryhandler.getOneMember);
router.post('/', commandHandler.postInsertOneMember);
router.put('/:memberId', commandHandler.putUpdateOneMember);
router.delete('/:memberId', commandHandler.deleteOneMember);

module.exports = router;
