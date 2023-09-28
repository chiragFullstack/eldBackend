require('dotenv').config();
const express=require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors=require('cors');
const http=require('http');

//library to create an cron job in node 
let cron = require('node-cron');


const conn=require('./connection');

// registeration of users 
const registerUser=require('./routes/user/registerUser');
const login=require('./routes/user/login');
const listUser=require('./routes/user/driverList');
const otpSend=require('./routes/user/sendOTP');
const changePassword=require('./routes/user/updateUserPassword');
const resetPassword=require('./routes/user/resetPassword');



const allDriverName=require('./routes/user/driverNameList');
const driverProfile=require('./routes/user/driverProfile');


//registeration of organization 
const addOrganization=require('./routes/organization/addOrganization');
const ListOrganization=require('./routes/organization/OrganizationList');
const deleteOrganization=require('./routes/organization/deleteOrganization');
const organizationDetails=require('./routes/organization/OrganizationDetails');
const editOrganization=require('./routes/organization/editOrganization');
const assignedDriver=require('./routes/organization/OrganizationDriver');


//vehicle registeration and crud
const addVehicleDetails=require('./routes/vehicle/addVehicle');
const vehicledelete=require('./routes/vehicle/deleteVehicle');
const AllVehicleList=require('./routes/vehicle/vehicleList');
const VehicleRecordById=require('./routes/vehicle/vehicleDetails');
const editVehicleDetails=require('./routes/vehicle/editVehicle');
const unAssignedVehicleList=require('./routes/vehicle/getVehiclelistForAssign');
const assignDrivertoVehicle=require('./routes/vehicle/assignDriver');


const attendence=require('./routes/Attendence/addAttendence');
const getattendence=require('./routes/Attendence/getAttendence');


const app=express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());



app.use('/api/register',registerUser);
app.use('/api/login',login);
app.use('/api/reset/',otpSend);
app.use('/api/reset/',changePassword);
app.use('/api/reset/',resetPassword);

app.use('/api/driver',listUser);
app.use('/api/driver',allDriverName);
app.use('/api/driver',driverProfile);


app.use('/api/organization',addOrganization);
app.use('/api/organization',ListOrganization);
app.use('/api/organization',deleteOrganization);
app.use('/api/organization',organizationDetails);
app.use('/api/organization',editOrganization);
app.use('/api/organization',assignedDriver);



//call vehile api 
app.use('/api/vehicle',addVehicleDetails);
app.use('/api/vehicle',vehicledelete);
app.use('/api/vehicle',AllVehicleList);
app.use('/api/vehicle',VehicleRecordById);
app.use('/api/vehicle',editVehicleDetails);
app.use('/api/vehicle',unAssignedVehicleList);
app.use('/api/vehicle',assignDrivertoVehicle)


app.use('/api/driver',attendence);
app.use('/api/driver',getattendence);


const PORT=process.env.PORT||5000;

app.listen(PORT,async()=>{
    console.log('server is running');
});

cron.schedule('* * * * * *', () => {
    console.log('running every minute to 1 from 5');
  });