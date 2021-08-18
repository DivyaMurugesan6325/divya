const express = require('express');
const router = express.Router();
//const userRoute = require('./user');
const attendanceRouter = require('./attendance');
//router.use('/user',userRoute);
router.use('/attendance',attendanceRouter);

module.exports = router;