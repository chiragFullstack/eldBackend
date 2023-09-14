const express=require('express');
const router=express.Router();
const{resetPassword}=require('../../controller/users');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.put('/resetPassword',resetPassword);
module.exports=router;