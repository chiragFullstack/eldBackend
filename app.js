require('dotenv').config();
const express=require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors=require('cors');
const http=require('http');

const conn=require('./connection');

// registeration of users 
const registerUser=require('./routes/user/registerUser');
const login=require('./routes/user/login');
const listUser=require('./routes/user/driverList');

//registeration of organization 
const addOrganization=require('./routes/organization/addOrganization');
const ListOrganization=require('./routes/organization/OrganizationList');
const deleteOrganization=require('./routes/organization/deleteOrganization');
const organizationDetails=require('./routes/organization/OrganizationDetails');
const editOrganization=require('./routes/organization/editOrganization');

//vehicle registeration and crud
const addVehicleDetails=require('./routes/vehicle/addVehicle');
const vehicledelete=require('./routes/vehicle/deleteVehicle');
const AllVehicleList=require('./routes/vehicle/vehicleList');
const VehicleRecordById=require('./routes/vehicle/vehicleDetails');
const editVehicleDetails=require('./routes/vehicle/editVehicle');

const app=express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());



app.use('/api/register',registerUser);
app.use('/api/login',login);
app.use('/api/driver',listUser);




app.use('/api/organization',addOrganization);
app.use('/api/organization',ListOrganization);
app.use('/api/organization',deleteOrganization);
app.use('/api/organization',organizationDetails);
app.use('/api/organization',editOrganization);



//call vehile api 
app.use('/api/vehicle',addVehicleDetails);
app.use('/api/vehicle',vehicledelete);
app.use('/api/vehicle',AllVehicleList);
app.use('/api/vehicle',VehicleRecordById);
app.use('/api/vehicle',editVehicleDetails);

const PORT=process.env.PORT|5000;

app.listen(PORT,async()=>{
    console.log('server is running');
});

