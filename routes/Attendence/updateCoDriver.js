const express=require('express');
const router=express.Router();
const{updateCoDriver}=require('../../controller/attendence');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put('/updateCoDriver',updateCoDriver);

module.exports=router;