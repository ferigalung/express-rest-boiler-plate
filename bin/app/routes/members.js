const express = require('express');
const router = express.Router();
const handler = require('../../modules/members/handlers/api_handlers');

router.get('/', handler.getAllMembers);
router.get('/:memberId', handler.getOneMember);
router.post('/', handler.postInsertOneMember);
router.put('/:memberId', handler.putUpdateOneMember);
router.delete('/:memberId', handler.deleteOneMember);

module.exports = router;
