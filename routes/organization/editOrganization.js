const express=require('express');
const router=express.Router();
const{editOrganizationDetails}=require('../../controller/organization');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.put('/editOrganization',editOrganizationDetails);
module.exports=router;