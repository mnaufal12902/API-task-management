const express = require('express');
const Controller = require('../controller/member_grup');

const router = express.Router();

router.get('/grup_member', Controller.getGrupMember);
router.post('/grup_member', Controller.createGrupMember);
router.patch('/grup_member', Controller.updateGrupMember);
router.delete('/grup_member', Controller.deleteGrupMember);

module.exports = router;