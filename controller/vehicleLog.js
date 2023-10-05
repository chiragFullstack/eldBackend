const conn=require('../connection');
const bcrypt = require('bcrypt');


const getvehicleLogbyUserId=async(req,res)=>{
    const {userId} =req.query;
    const conn_ = await conn.getConnection();
    const checkUsers = "select 	* from vehicle_logs where userid=?";
    //const checkUsers = "select * from tblAttendence";
   const usersValues = [parseInt(userId)];
    const [resultsLog] = await conn_.execute(checkUsers,usersValues);
    if(resultsLog.length==0){
         res.status(200).json({
            statusCode: 200,
            message: 'Record Not matched',
            data: [],
            status: false
        });
    }else{
        res.status(200).json({
            statusCode: 200,
            message: 'Vehicle Log Record',
            data:resultsLog,
            status: true
        });
    }
}

const getVehicleLogRecordbyDate=async(req,res)=>{
    const {userId, fromdate, todate} =req.query;
    const conn_ = await conn.getConnection();
    const checkUsers = "select * from vehicle_logs where userid=? && created_datetime>=? && created_datetime<=? order by created_datetime DESC";
    //const checkUsers = "select * from tblAttendence";
   const usersValues = [parseInt(userId), fromdate,todate];
    const [resultsLog] = await conn_.execute(checkUsers,usersValues);
    if(resultsLog.length==0){
         res.status(200).json({
            statusCode: 200,
            message: 'Record Not matched',
            data: [],
            status: false
        });
    }else{
        res.status(200).json({
            statusCode: 200,
            message: 'Vechicle Log Record ',
            data:resultsLog,
            status: true
        });
    }
}


module.exports={
    getvehicleLogbyUserId,getVehicleLogRecordbyDate
}
