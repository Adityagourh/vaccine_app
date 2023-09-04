const express = require('express');
const user = require('../controller/userController')
const router = express.Router();

router.get('/login', user.loginUser);
router.post('/register', user.registerUser);

module.exports = router;