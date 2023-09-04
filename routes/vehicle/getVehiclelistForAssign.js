const express=require('express');
const router=express.Router();
const{getVehicleListForAssign}=require('../../controller/vehicle');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/unAssignedVehicleList',getVehicleListForAssign);
module.exports=router;