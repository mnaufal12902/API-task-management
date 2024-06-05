const express = require('express');
const Controller = require('../controller/auth');

const router = express.Router();

router.post('/auth', Controller.loginUser);
router.patch('/auth', Controller.updatePasswordUser);

module.exports = router;