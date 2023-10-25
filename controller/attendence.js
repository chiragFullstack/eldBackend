const { parse } = require('dotenv');
const conn=require('../connection');
const moment = require('moment');

const checkAttendenceRecord=async(req,res)=>{    
const {userId} =req.query;
    const conn_ = await conn.getConnection();
    const checkUsers = "select * from tblAttendence where UserId=?";
    //const checkUsers = "select * from tblAttendence";
   const usersValues = [parseInt(userId)];
    const [resultsUser] = await conn_.execute(checkUsers,usersValues);
    if(resultsUser.length==0){
         res.status(200).json({
            statusCode: 200,
            message: 'Record Not matched',
            data: [],
            status: false
        });
    }else{
        console.log(resultsUser.length)
        res.status(200).json({
            statusCode: 200,
            message: 'Attendence Record ',
            data:resultsUser,
            status: true
        });
    }    
}

const addAttendenceRecord=async(req,res)=>{    
    const{Status,VIN,Speed,Odometer,EngineHours,Latitude,Longitude,Location,AttendenceType,UserId,coDriver,tripNo,shippingAddress,RecordDate}=req.body;
    try{
        const currentDateTime = moment();
        // Format the date and time
        var utcMoment = moment.utc();
        const formattedDateTime = new Date( utcMoment.format() );
        const currentTime = moment().format();
        const formattedTime = moment().format('HH:mm:ss');
        console.log('Formatted Time:', formattedTime);
        const conn_ = await conn.getConnection(); // Get a connection from the pool
        const insertVehicle = "INSERT INTO tblAttendence(Status,VIN,Speed,Odometer,EngineHours,Latitude,Longitude,Location,AttendenceType,UserId,coDriver,tripNo,shippingAddress,RecordDate,timeRecord) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        const vehicleValues = [Status,VIN,Speed,Odometer,EngineHours,Latitude,Longitude,Location,AttendenceType,UserId,coDriver,tripNo,shippingAddress,formattedDateTime,formattedTime];
        console.log('Vehicles values---',vehicleValues);
        const data=await conn_.execute(insertVehicle, vehicleValues);
        if(data){
            console.log('Attendence Record Saved:', data[0].insertId);
            res.status(200).json({
                statusCode:200,
                message:'Record Saved',
                data:data[0].insertId,
                status:true
            });
        }else{
            res.status(400).json({
                statusCode:400,
                message:'error',
                data:[],
                status:true
            });
        }
        conn_.release();
    }catch(err){
        console.error('Error:', err.message);
        res.status(500).json({
          statusCode: 500,
          message:err.message,
          data: [],
          status: false
        });
    } 
}


const updateCoDriver=async(req,res)=>{    
    const{id,driverName}=req.body;
    try{
        
        const conn_ = await conn.getConnection(); // Get a connection from the pool
        const insertVehicle = "update tblAttendence set coDriver=? where id=?";
        const vehicleValues = [driverName, parseInt(id)];
        
        const data=await conn_.execute(insertVehicle, vehicleValues);
        if(data){
            console.log('Attendence Record Saved:', data);
            res.status(200).json({
                statusCode:200,
                message:'Record Saved',
                data:data,
                status:true
            });
        }else{
            res.status(400).json({
                statusCode:400,
                message:'error',
                data:[],
                status:true
            });
        }
        conn_.release();
    }catch(err){
        console.error('Error:', err.message);
        res.status(500).json({
          statusCode: 500,
          message:err.message,
          data: [],
          status: false
        });
    } 
}

const updateTripNo=async(req,res)=>{    
    const{id,tripNo}=req.body;
    try{
        const conn_ = await conn.getConnection(); // Get a connection from the pool
        const insertVehicle = "update tblAttendence set tripNo=? where id=?";
        const vehicleValues = [tripNo, parseInt(id)];
        const data=await conn_.execute(insertVehicle, vehicleValues);
        if(data){
            console.log('Attendence Record Saved:', data);
            res.status(200).json({
                statusCode:200,
                message:'Record Saved',
                data:data,
                status:true
            });
        }else{
            res.status(400).json({
                statusCode:400,
                message:'error',
                data:[],
                status:true
            });
        }
        conn_.release();
    }catch(err){
        console.error('Error:', err.message);
        res.status(500).json({
          statusCode: 500,
          message:err.message,
          data: [],
          status: false
        });
    } 
}


const updateShippingAddress=async(req,res)=>{    
    const{id,shippingAddress}=req.body;
    try{
        const conn_ = await conn.getConnection(); // Get a connection from the pool
        const insertVehicle = "update tblAttendence set shippingAddress=? where id=?";
        const vehicleValues = [shippingAddress, parseInt(id)];
        const data=await conn_.execute(insertVehicle, vehicleValues);
        if(data){
            console.log('Attendence Record Saved:', data);
            res.status(200).json({
                statusCode:200,
                message:'Record Saved',
                data:data,
                status:true
            });
        }else{
            res.status(400).json({
                statusCode:400,
                message:'error',
                data:[],
                status:true
            });
        }
        conn_.release();
    }catch(err){
        console.error('Error:', err.message);
        res.status(500).json({
          statusCode: 500,
          message:err.message,
          data: [],
          status: false
        });
    } 
}


const getAttendenceRecordToday=async(req,res)=>{
    const {userId, fromdate} =req.query;
    const conn_ = await conn.getConnection();
    let checkUsers='';
    let usersValues=[];
    let [resultsUser]=[];
        // Create a Moment.js object for the specific date "2023-10-23"
        const inputDate = moment(fromdate, "YYYY-MM-DD");

        // Convert to UTC
        const utcDate = inputDate.utc();

        // Format the UTC date
        const formattedUTCDate = utcDate.format('YYYY-MM-DD');
        console.log(formattedUTCDate);
    if (fromdate !== "") {
        checkUsers = "select location, odometer, AttendenceType, EngineHours, UserId, timeRecord, DATE(RecordDate) as date from tblAttendence where UserId=? && DATE(RecordDate) =?";
        usersValues = [parseInt(userId), formattedUTCDate];
        [resultsUser] = await conn_.execute(checkUsers,usersValues);
      }
    if(resultsUser.length==0){
         res.status(200).json({
            statusCode: 200,
            message: 'Record Not matched',
            data: [],
            status: false
        });
    }else{
        const newKey = "Origin";
        const newValue = "Manual";

        // Iterate through the array and add the new key-value pair to each object
        for (const obj of resultsUser) {
             obj[newKey] = newValue;
        }
        console.log(resultsUser);
        res.status(200).json({
            statusCode: 200,
            message: 'Attendence Record ',
            data:resultsUser,
            status: true
        });
    }
}

const getAttendenceRecord=async(req,res)=>{
    const {userId, fromdate, todate} =req.query;
    const conn_ = await conn.getConnection();
    let checkUsers='';
    let usersValues=[];
    let [resultsUser]=[];
    console.log(fromdate);
      
    if (fromdate !== "") {
          // Create a Moment.js object for the specific date "2023-10-23"
          const inputDate = moment(fromdate, "YYYY-MM-DD");

          // Convert to UTC
          const utcDate = inputDate.utc();
  
          // Format the UTC date
          const formattedUTCfromDate = utcDate.format('YYYY-MM-DD');
        checkUsers = "select location, odometer, AttendenceType, EngineHours, UserId, timeRecord, DATE(RecordDate) as date from tblAttendence where UserId=? && RecordDate>=?";
        usersValues = [parseInt(userId), formattedUTCfromDate];
      
        if (todate) {
            // Create a Moment.js object for the specific date "2023-10-23"
          const inputDate2 = moment(fromdate, "YYYY-MM-DD");

          // Convert to UTC
          const utcDate2 = inputDate2.utc();
  
          // Format the UTC date
          const formattedUTCToDate = utcDate2.format('YYYY-MM-DD');
          checkUsers += " && DATE(RecordDate)<=?";
          console.log('rinnung');
          usersValues.push(todformattedUTCToDateate);
        }
      
        checkUsers += " order by RecordDate DESC";
      
        [resultsUser] = await conn_.execute(checkUsers, usersValues);
      }
  
    if(resultsUser.length==0){
         res.status(200).json({
            statusCode: 200,
            message: 'Record Not matched',
            data: [],
            status: false
        });
    }else{
        const newKey = "Origin";
        const newValue = "Manual";

        // Iterate through the array and add the new key-value pair to each object
        for (const obj of resultsUser) {
             obj[newKey] = newValue;
        }
        console.log(resultsUser);
        res.status(200).json({
            statusCode: 200,
            message: 'Attendence Record ',
            data:resultsUser,
            status: true
        });
    }
}

module.exports={
    addAttendenceRecord,getAttendenceRecord,updateTripNo,updateCoDriver,updateShippingAddress,checkAttendenceRecord,getAttendenceRecordToday
}
