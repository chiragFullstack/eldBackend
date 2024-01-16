require('dotenv').config();
const express=require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors=require('cors');
const http=require('http');

//library to create an cron job in node 
let cron = require('node-cron');
const moment = require('moment-timezone');

const establishConnection = require('./connection');

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


const vehicleLogByUserId=require('./routes/vehiclelog/getallLogbyUserId');
const vehicleLogByDate=require('./routes/vehiclelog/getallLogbyDate');

const vehicleLogReport=require('./routes/vehiclelog/logreport');
const pendingLogReport=require('./routes/Attendence/pendingLog');
const certifiedLogReport=require('./routes/Attendence/certifiedLog');
const updateLog=require('./routes/Attendence/updateLog');

const attendence=require('./routes/Attendence/addAttendence');
const getattendence=require('./routes/Attendence/getAttendence');
const getattendenceFull=require('./routes/Attendence/getAttendenceFull');
const updateDriver=require('./routes/Attendence/updateCoDriver');
const updateTripNo=require('./routes/Attendence/updateTripNo');
const updateShippingAddress=require('./routes/Attendence/updateShippingAddress'); 


const totalHour=require('./routes/CalculateHour/drivingHourCalculate');


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
app.use('/api/driver',getattendenceFull);
app.use('/api/driver',updateDriver);
app.use('/api/driver',updateTripNo);
app.use('/api/driver',updateShippingAddress);


app.use('/api/driver',totalHour);

app.use('/api/vehicleLog',vehicleLogByUserId);
app.use('/api/vehicleLog',vehicleLogByDate);


app.use('/api/report',vehicleLogReport);
app.use('/api/report',pendingLogReport);
app.use('/api/report',certifiedLogReport);
app.use('/api/report',updateLog);

const PORT=process.env.PORT||5000;

app.listen(PORT,async()=>{
    console.log('server is running');
});


function calculateDrivingHours(data) {
    let totalDrivingTime = 0;
    let drivingStartTime = null;
  
    for (let i = 0; i < data.length; i++) {
      const { status, datetime } = data[i];
      const currentTime = moment(datetime, "YYYY-MM-DDTHH:mm:ss");
  
      if (status === 'DRIVE') {
        drivingStartTime = currentTime;
      } else if (status !== 'DRIVE' && drivingStartTime !== null) {
        const drivingEndTime = currentTime;
        const timeDiffInSeconds = (drivingEndTime - drivingStartTime) / 1000; // Convert milliseconds to seconds
        totalDrivingTime += timeDiffInSeconds;
        drivingStartTime = null; // Reset driving start time
      }
    }
  
    const totalHours = Math.floor(totalDrivingTime / 3600); // Calculate total hours
    const totalMinutes = Math.floor((totalDrivingTime % 3600) / 60); // Calculate remaining minutes
  
    return `${totalHours}:${totalMinutes < 10 ? '0' : ''}${totalMinutes}`;
  }

  
// cron.schedule('* * * * * *', async() => {
//    try{
//     const conn_ = await conn.getConnection();
//     // Get the current time
//     const query="SELECT r.* FROM tblAttendence r JOIN ( SELECT MAX(RecordDate) as max_datetime FROM tblAttendence WHERE AttendenceType = 'onDuty' AND UserID = 1 ) AS max_entry ON r.RecordDate = max_entry.max_datetime WHERE r.AttendenceType = 'onDuty' AND r.UserID = 1";
//     const [results] = await conn_.query(query);
//     let startId=parseInt(results[0].id);
    
//     const queryData=`SELECT AttendenceType,RecordDate from tblAttendence where id>=${startId} AND UserID = 1`;
//     const [resultsData] = await conn_.query(queryData);
//     const shiftDataWithDates = resultsData.map(entry => ({
//         ...entry,
//         datetime: moment(entry.datetime, "YYYY-MM-DDTHH:mm:ss"),
//       }));
//   // Check if the last entry is "drive" and the difference is greater than 7 hours 45 minutes
//   const lastEntry = shiftDataWithDates[shiftDataWithDates.length - 1];
//   const currentTime = moment();
//   const timeDiffLastEntry = currentTime.diff(lastEntry.datetime, 'seconds');
//     console.log(resultsData);
//   if (lastEntry.status === 'DRIVE' && timeDiffLastEntry > (7 * 3600 + 45 * 60)) {
//     console.log("Last drive entry is more than 7 hours 45 minutes ago.");
//   }


//    }catch(err){
//     console.error(err);
//    }

// });


cron.schedule('* * * * * *', async () => {
  try {
    const conn = await establishConnection(); // Establish database connection

    const query = "SELECT r.* FROM tblAttendence r JOIN ( SELECT MAX(RecordDate) as max_datetime FROM tblAttendence WHERE AttendenceType = 'onDuty' AND UserID = 1 ) AS max_entry ON r.RecordDate = max_entry.max_datetime WHERE r.AttendenceType = 'onDuty' AND r.UserID = 1";

    const [results] = await conn.query(query);
    let startId = parseInt(results[0].id);

    const queryData = `SELECT AttendenceType, RecordDate from tblAttendence where id>=${startId} AND UserID = 1`;
    const [resultsData] = await conn.query(queryData);

    const shiftDataWithDates = resultsData.map(entry => ({
      ...entry,
      datetime: moment(entry.RecordDate, "YYYY-MM-DDTHH:mm:ss"), // Assuming the datetime field is RecordDate
    }));

    // Check if the last entry is "drive" and the difference is greater than 7 hours 45 minutes
    const lastEntry = shiftDataWithDates[shiftDataWithDates.length - 1];
    const currentTime = moment();
    const timeDiffLastEntry = currentTime.diff(lastEntry.datetime, 'seconds');

    console.log(resultsData);

    if (lastEntry.AttendenceType === 'DRIVE' && timeDiffLastEntry > (7 * 3600 + 45 * 60)) {
      console.log("Last drive entry is more than 7 hours 45 minutes ago.");
    }

    // Close the database connection
    await conn.end();
  } catch (err) {
    console.error(err);
  }
});
