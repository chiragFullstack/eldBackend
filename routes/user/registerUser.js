const express=require('express');
const router=express.Router();
const{addUsersDetails}=require('../../controller/users');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/addUser',addUsersDetails);
module.exports=router;