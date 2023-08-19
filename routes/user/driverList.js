const express=require('express');
const router=express.Router();
const{getUser}=require('../../controller/users');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/listUser',getUser);
module.exports=router;