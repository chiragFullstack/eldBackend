const express=require('express');
const router=express.Router();
const{getAttendenceRecordToday}=require('../../controller/attendence');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/getAttendenceRecord',getAttendenceRecordToday);
module.exports=router;