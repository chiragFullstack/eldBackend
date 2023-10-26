const express=require('express');
const router=express.Router();
const{getCertifiedAttendenceLog}=require('../../controller/attendence');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/getCertifiedLog',getCertifiedAttendenceLog);
module.exports=router;