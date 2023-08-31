const express=require('express');
const router=express.Router();
const{addVehicleDetails}=require('../../controller/vehicle');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/addVehicleDetails',addVehicleDetails);
module.exports=router;