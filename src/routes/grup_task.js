const express = require('express');
const Controller = require('../controller/grup_task');

const router = express.Router();

router.get('/grup_task', Controller.getAllTugas);
router.post('/grup_task', Controller.createTugas);
router.patch('/grup_task', Controller.updateTugas);
router.delete('/grup_task', Controller.deleteTugas);

module.exports = router;