const express = require('express');
const Controller = require('../controller/tugas.js');

const router = express.Router();

router.get('/tugas', Controller.getAllTugas);
router.post('/tugas', Controller.createTugas);
router.patch('/tugas', Controller.updateTugas);
router.delete('/tugas', Controller.deleteTugas);

module.exports = router;