const conn=require('../connection');
const bcrypt = require('bcrypt');


const addVehicleDetails=async(req,res)=>{
    const{truck_no,plate_no,VIN_no,model,make,year,status,user_id}=req.body;
    try{
        const conn_ = await conn.getConnection(); // Get a connection from the pool
        const insertVehicle = "INSERT INTO vehicle_details(truck_no,plate_no,VIN_no, model, make, year, status, user_id) VALUES (?,?,?,?,?,?,?,?)";
        const vehicleValues = [truck_no,plate_no,VIN_no,model,make,year,status,user_id];
        console.log('Vehicles values---',vehicleValues);
        const data=await conn_.execute(insertVehicle, vehicleValues);
        if(data){
            console.log('Insertion successful into vehicle details :', data);
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



const vehicledelete=async(req,res)=>{
    try{
        let id=0;
        if(req.query.id){
            id= parseInt(req.query.id);
        }else{
            id= parseInt(req.body.id);
        }
        const conn_ = await conn.getConnection(); // Get a connection from the pool
        const vehicleDelete = "delete FROM vehicle_details where id=?";
        const vehicleValues = [id];
        const [resultsVehicle] = await conn_.execute(vehicleDelete, vehicleValues);
        if(resultsVehicle){
            res.status(200).json({
                statusCode:200,
                message:resultsVehicle,
                status:true
            });
        }else{
            res.status(400).json({
                statusCode:400,
                message:"ID not matched",
                data:[],
                status:true
            });
        }
        conn_.release();
    }catch(err){
        res.status(500).json({
            statusCode:500,
            message:err.message,
            data:[],
            status:true
        });
    }
}



const AllVehicleList=async(req,res)=>{
    try{
        const conn_ = await conn.getConnection(); // Get a connection from the pool
        const listOrg = "SELECT * FROM vehicle_details";
        const [resultsOrganization] = await conn_.execute(listOrg);
        if(resultsOrganization){
            res.status(200).json({
                statusCode:200,
                message:'All record ',
                data:resultsOrganization,
                status:true
            });
        }else{
            res.status(400).json({
                statusCode:400,
                message:error.message,
                data:[],
                status:true
            });
        }
        conn_.release();
    }catch(err){
        res.status(500).json({
            statusCode:500,
            message:error.message,
            data:[],
            status:true
        });
    }
}

const VehicleRecordById=async(req,res)=>{
    try{
        let id=0;
        if(req.query.id){
            id= parseInt(req.query.id);
        }else{
            id= parseInt(req.body.id);
        }
        const conn_ = await conn.getConnection(); // Get a connection from the pool
        const vehicleQry = "SELECT * FROM vehicle_details where id=?";
        const vehicleValues = [id];
        const [resultsVehicle] = await conn_.execute(vehicleQry,vehicleValues);
        if(resultsVehicle){
            res.status(200).json({
                statusCode:200,
                message:'Record ',
                data:resultsVehicle,
                status:true
            });
        }else{
            res.status(400).json({
                statusCode:400,
                message:error.message,
                data:[],
                status:true
            });
        }
        conn_.release();
    }catch(err){
        res.status(500).json({
            statusCode:500,
            message:error.message,
            data:[],
            status:true
        });
    }
}


const editVehicleDetails=async(req,res)=>{
    const{id,truck_no,plate_no,VIN_no,model,make,year,status,user_id}=req.body;
    console.log(req.body);
    try{
        const conn_ = await conn.getConnection(); // Get a connection from the pool
        const updateVehicle = "update vehicle_details set truck_no=?,plate_no=?,VIN_no=?,model=?,make=?,year=?,status=?,user_id=? where id=?";
        const VehicleValues = [truck_no,plate_no,VIN_no,model,make,year,status,user_id,id];
        console.log('Vehicle values---',VehicleValues);
        const data=await conn_.execute(updateVehicle, VehicleValues);
        if(data){
            console.log('Updated successful into vehicle details :',data);
            res.status(200).json({
                statusCode:200,
                message:'Record Updated',
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


const getVehicleListForAssign=async(req,res)=>{
    try{
        const orgId=req.query.orgId;
        console.log('organization Id ',orgId);
        let status=0;
        const conn_ = await conn.getConnection(); // Get a connection from the pool
        const qry = "SELECT id,VIN_no FROM vehicle_details where user_id=?";
        const qryValues=[orgId];
        const [resultsOrganization] = await conn_.execute(qry,qryValues);
        if(resultsOrganization){
            res.status(200).json({
                statusCode:200,
                message:resultsOrganization,
                status:true
            });
        }else{
            res.status(400).json({
                statusCode:400,
                message:error.message,
                data:[],
                status:true
            });
        }
    }catch(err){
        res.status(500).json({
            statusCode:500,
            message:err.message,
            data:[],
            status:true
        });
    }
}
const assignedVehicleToDriver=async(req,res)=>{
    const {organizationId,driverId,vehicleId}=req.body;  //1,1 
    try{
        let status=0;
        const conn_ = await conn.getConnection();// Get a connection from the pool
        const qryVehicle = "SELECT * FROM tblOrganization_Driver where vehicleId=?";
        const qryVehicleCheck=[vehicleId];
        const [resultsVehicleCheckData] = await conn_.execute(qryVehicle,qryVehicleCheck);
        console.log('count vehicle data---',resultsVehicleCheckData.length);
        if(resultsVehicleCheckData.length<2){
            const qry = "SELECT * FROM tblOrganization_Driver where driverId=? and vehicleId!=?";
            const qryValue=[driverId,status];
            const [resultsData] = await conn_.execute(qry,qryValue);
            console.log('count driver  data---',resultsData.length);
            if(resultsData.length<1){
                console.log('record ',resultsData.length);
                status=1;
                const qryvehicle = "update vehicle_details set status=? where id=?";
                const qryVehicleValue=[status,vehicleId];
                const [resultsVehicleData] = await conn_.execute(qryvehicle,qryVehicleValue);

                const qryOrganizationDriver = "update tblOrganization_Driver set vehicleId=? where driverId=?";
                const qryOrganizationDriverValue=[vehicleId,driverId];
                const [resultsOrgnizationData] = await conn_.execute(qryOrganizationDriver,qryOrganizationDriverValue);
                
                console.log(resultsVehicleData);
                console.log(resultsOrgnizationData);
                res.status(200).json({
                    statusCode:200,
                    message:"Vehicle assigned to Driver ",
                    status:true
                });
            }else{
                res.status(400).json({
                    statusCode:400,
                    message:"already Assigned Vehicle ",
                    data:[],
                    status:true
                });
            }
        }else{
            res.status(400).json({
                statusCode:400,
                message:"Can't Assigned More Driver",
                data:[],
                status:true
            });
        }
        
    }catch(err){
        res.status(500).json({
            statusCode:500,
            message:err.message,
            data:[],
            status:true
        });
    }
}


module.exports={
    addVehicleDetails,vehicledelete,AllVehicleList,
    VehicleRecordById,editVehicleDetails,getVehicleListForAssign,
    assignedVehicleToDriver
}