const conn=require('../connection');

const addAttendenceRecord=async(req,res)=>{
    const{Status,VIN,Speed,Odometer,EngineHours,Latitude,Longitude,Location,AttendenceType,UserId,RecordDate}=req.body;
    try{
        const conn_ = await conn.getConnection(); // Get a connection from the pool
        const insertVehicle = "INSERT INTO tblAttendence(Status,VIN,Speed,Odometer,EngineHours,Latitude,Longitude,Location,AttendenceType,UserId,RecordDate) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        const vehicleValues = [Status,VIN,Speed,Odometer,EngineHours,Latitude,Longitude,Location,AttendenceType,UserId,RecordDate];
        console.log('Vehicles values---',vehicleValues);
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

module.exports={
    addAttendenceRecord
}
