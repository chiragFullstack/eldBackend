const express=require('express');
const router=express.Router();
//const{generateLogReport}=require('../../controller/vehicleLog');
const{generateGraph}=require('../../controller/vehicleLog');
//const{generateLogReportWithPdf}=require('../../controller/vehicleLog');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/generateLogReport',generateGraph);
module.exports=router;