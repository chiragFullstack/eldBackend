const express=require('express');
const router=express.Router();
const{getvehicleLogbyUserId}=require('../../controller/vehicleLog');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/getvehicleLogbyUserId',getvehicleLogbyUserId);
module.exports=router;