const express=require('express');
const router=express.Router();
const{organizationDelete}=require('../../controller/organization');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.delete('/deleteOrganization',organizationDelete);
module.exports=router;