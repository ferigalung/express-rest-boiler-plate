const express = require('express');
const router = express.Router();
const commandHandler = require('../../modules/members/commands/handler');
const queryhandler = require('../../modules/members/queries/handler');
const { verifyJwt } = require('../helpers/auth/jwtAuth');
const multer = require('multer');
const upload = multer();

router.get('/', verifyJwt, queryhandler.getAllMembers);
router.get('/:memberId', verifyJwt, queryhandler.getOneMember);
router.post('/', verifyJwt, upload.single('profilePic'), commandHandler.postInsertOneMember);
router.put('/:memberId', upload.single('profilePic'), verifyJwt, commandHandler.putUpdateOneMember);
router.delete('/:memberId', verifyJwt, commandHandler.deleteOneMember);

module.exports = router;
