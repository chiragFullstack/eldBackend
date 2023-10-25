const express=require('express');
const router=express.Router();
const{checkAttendenceRecord}=require('../../controller/attendence');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/getAttendenceRecordfull',checkAttendenceRecord);
module.exports=router;