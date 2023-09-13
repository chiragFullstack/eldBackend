const express=require('express');
const router=express.Router();
const{sendOtp}=require('../../controller/users');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/sendOtp',sendOtp);
module.exports=router;