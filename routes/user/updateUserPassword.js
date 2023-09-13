const express=require('express');
const router=express.Router();
const{updatePassword}=require('../../controller/users');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.put('/changePassword',updatePassword);
module.exports=router;