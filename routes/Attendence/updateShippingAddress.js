const express=require('express');
const router=express.Router();
const{updateShippingAddress}=require('../../controller/attendence');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put('/updateShippingAddress',updateShippingAddress);

module.exports=router;