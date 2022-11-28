const express = require('express');
const router = express.Router();
const handler = require('../../modules/members/handlers/api_handlers');

router.get('/', handler.getAllMembers);
router.get('/:id', handler.getOneMember);

module.exports = router;
