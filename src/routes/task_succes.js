const express = require('express');
const Controller = require('../controller/task_succes');

const router = express.Router();

router.get('/task_succes', Controller.getTaskSC);
router.get('/count_task_succes', Controller.getCountTaskSC);

module.exports = router;