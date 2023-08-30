const express=require('express');
const router=express.Router();
const{organizationDetails}=require('../../controller/organization');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/OrganizationDetails',organizationDetails);
module.exports=router;