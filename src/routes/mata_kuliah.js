const express = require('express');
const Controller = require('../controller/mata_kuliah');

const router = express.Router();

router.get('/mata_kuliah', Controller.getMatkul);
router.post('/mata_kuliah', Controller.createMatkul);

module.exports = router;