const express=require('express');
const router=express.Router();
const{updatePendingLog}=require('../../controller/attendence');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.patch('/updateCertifiedLog',updatePendingLog);
module.exports=router;