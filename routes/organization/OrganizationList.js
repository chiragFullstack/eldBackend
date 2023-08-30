const express=require('express');
const router=express.Router();
const{organizationList}=require('../../controller/organization');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/listOrganization',organizationList);
module.exports=router;