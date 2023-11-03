const express = require('express');
const Controller = require('../controller/users');

const router = express.Router();

router.post('/users', Controller.createUser);
router.patch('/users', Controller.updateUsers);
router.delete('/users', Controller.deleteUsers);

module.exports = router;