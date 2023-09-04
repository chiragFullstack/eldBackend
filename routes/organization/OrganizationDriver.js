const express=require('express');
const router=express.Router();
const{assignOrganizationDriver}=require('../../controller/organization');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/assignedOrganizationDriver',assignOrganizationDriver);
module.exports=router;