const express=require('express');
const router=express.Router();
const{editVehicleDetails}=require('../../controller/vehicle');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.put('/editVehicleDetails',editVehicleDetails);
module.exports=router;