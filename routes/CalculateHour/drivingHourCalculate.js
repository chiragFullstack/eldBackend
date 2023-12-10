const express=require('express');
const router=express.Router();
const{calcualteDrivingHour}=require('../../controller/hourCount');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/getTotalDrivingHour',calcualteDrivingHour);
module.exports=router;