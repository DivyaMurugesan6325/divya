const express = require('express');
const attendanceController = require('../controllers/attendance');
//const checkAuthMiddle = require('../middlewares/auth');
const {  Attendancedelete} = require('../validator/attendance/attendanceValidator');
const{schemaAttendance} = require('../validator/attendance/attendanceValidator');
const router = express.Router();
router.post('/createAttendance',schemaAttendance,attendanceController.postAttendance);
router.get('/findAllAttendance',attendanceController.findAllAttendance);
router.get('/findbyid/:id',attendanceController.findAttendanceByid);
router.delete('/delete/:id',Attendancedelete,attendanceController.deletePost);
router.patch('/update/:id',attendanceController.update);

module.exports = router;