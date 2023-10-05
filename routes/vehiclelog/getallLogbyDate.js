const express=require('express');
const router=express.Router();
const{getVehicleLogRecordbyDate}=require('../../controller/vehicleLog');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/getvehicleLogbyDate',getVehicleLogRecordbyDate);
module.exports=router;