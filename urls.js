const express = require('express');
const userRouter = require('./user-app/routes/userRoutes')
const slotRouter = require('./user-app/routes/slotRoutes')
const adminRouter = require('./admin-app/adminRoutes');
const urls = express.Router();

urls.use("/user", userRouter);
urls.use("/slot", slotRouter);
urls.use("/admin", adminRouter);

module.exports = urls;