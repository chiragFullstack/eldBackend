const express=require('express');
const router=express.Router();
const{updateTripNo}=require('../../controller/attendence');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put('/updateTripNo',updateTripNo);

module.exports=router;