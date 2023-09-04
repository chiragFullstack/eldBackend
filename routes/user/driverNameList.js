const express=require('express');
const router=express.Router();
const{getDriverName}=require('../../controller/users');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/getDriverName',getDriverName);
module.exports=router;