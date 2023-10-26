const express=require('express');
const router=express.Router();
const{getPendingAttendenceLog}=require('../../controller/attendence');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/getPendingLog',getPendingAttendenceLog);
module.exports=router;