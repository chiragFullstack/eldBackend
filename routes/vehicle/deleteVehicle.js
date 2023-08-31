const express=require('express');
const router=express.Router();
const{vehicledelete}=require('../../controller/vehicle');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.delete('/vehicledelete',vehicledelete);
module.exports=router;