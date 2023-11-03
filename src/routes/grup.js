const express = require('express');
const Controller = require('../controller/grup');

const router = express.Router();

router.get('/group', Controller.getGrup);
router.post('/group', Controller.createGrup);

module.exports = router;