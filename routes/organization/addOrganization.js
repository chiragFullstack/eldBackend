const express=require('express');
const router=express.Router();
const{addOrganizationDetails}=require('../../controller/organization');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/addOrganization',upload.none(),addOrganizationDetails);
module.exports=router;