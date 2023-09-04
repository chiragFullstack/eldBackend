const express=require('express');
const router=express.Router();
const{getDriverProfile}=require('../../controller/users');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/driverProfile',getDriverProfile);
module.exports=router;