const express = require('express');
const admin = require('./adminController');
const authService = require("../middleware/isAuthRole")
const router = express.Router();

router.get('/login',authService.adminRole, admin.adminLogin);
router.get('/list', admin.totalUserRegisterd);
router.post('/book', admin.slotes);

module.exports = router;