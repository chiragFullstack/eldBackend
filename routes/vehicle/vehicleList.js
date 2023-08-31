const express=require('express');
const router=express.Router();
const{AllVehicleList}=require('../../controller/vehicle');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/AllVehicleList',AllVehicleList);
module.exports=router;