const express=require('express');
const router=express.Router();
const{VehicleRecordById}=require('../../controller/vehicle');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/VehicleRecordById',VehicleRecordById);
module.exports=router;