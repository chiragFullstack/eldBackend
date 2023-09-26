const express=require('express');
const router=express.Router();
const{getAttendenceRecord}=require('../../controller/attendence');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/getAttendenceRecord',getAttendenceRecord);
module.exports=router;