const express=require('express');
const router=express.Router();
const{addAttendenceRecord}=require('../../controller/attendence');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/addAttendenceRecord',addAttendenceRecord);

module.exports=router;