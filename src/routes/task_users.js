const express = require('express');
const Controller = require('../controller/task_users');

const router = express.Router();

router.get('/task_users', Controller.getAllTaskUsers);
router.post('/task_users', Controller.createTaskUsers);
// router.patch('/tugas', Controller.updateTugas);
router.delete('/task_users', Controller.deleteTaskUsers);

module.exports = router;