const express=require('express');
const router=express.Router();
const{assignedVehicleToDriver}=require('../../controller/vehicle');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/assignDrivertoVehicle',assignedVehicleToDriver);
module.exports=router;