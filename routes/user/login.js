const express=require('express');
const router=express.Router();
const{checkLoginDetails}=require('../../controller/users');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/checkLogin',upload.none(),checkLoginDetails);
module.exports=router;