
const conn=require('../connection');
const bcrypt = require('bcrypt');



const addUsersDetails=async(req,res)=>{
    const{firstName,lastName,userName,password,role,email, phoneNo,licenseNo, state, expiration, exempt,startingperiod,hosrules, allowpersonalName, allowYardMove }=req.body;
    const status=0;
    let User_Id=0;
    console.log(req.body);
     //insert the data into the user Table 
    const saltRounds = 10; // Number of salt rounds
    bcrypt.hash(password, saltRounds,async (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            return;
        }else{
            // Store the hash in the database
            console.log('Hashed Password:', hash);
           try{
                const conn_ = await conn.getConnection();
                const insertQuery = "INSERT INTO tblusers(userName, password, role, email,status) VALUES (?, ?,?,?,?)";
                const values = [userName, hash,role,email,status];
                const data=await conn_.execute(insertQuery, values);
                const getId="select id from tblusers where userName=? and password=?";
                const getValue=[userName,hash];
                const [getdata]=await conn_.execute(getId, getValue);
                
                if(getdata.length>0){
                    console.log('get User Id ----',getdata[0].id);
                    User_Id=parseInt(getdata[0].id);
                    const insertUsers = "INSERT INTO tbluser_details(firstname,lastname,user_id, phone_no, license_no, state, expiration, exempt, starting_period,hos_rules,allow_personal_name, allow_yard_move) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
                    const usersValues = [firstName, lastName,User_Id,phoneNo,licenseNo,state,expiration,exempt,startingperiod,hosrules,allowpersonalName,allowYardMove];
                    const Userdata=await conn_.execute(insertUsers, usersValues);
                    if(Userdata){
                        res.status(200).json({
                            statusCode:200,
                            message:"Driver Registered",
                            status:true
                        });
                    }else{
                        res.status(400).json({
                            statusCode:400,
                            message:"check Details",
                            status:false
                        });
                    }
                }
           }catch(error){
                res.status(400).json({
                    statusCode:400,
                    message:error.message,
                    status:false
                });
           }          
        }
    });   
}

const getUser=async(req,res)=>{
        conn.query('SELECT * FROM tblusers', (error, results) => {
        if (error){
            res.status(400).json({
                statusCode:400,
                message:error.message,
                data:[],
                status:true
            });
        }else{
            res.status(200).json({
                statusCode:200,
                message:results,
                status:true
            });
        }
      });
}

const sendOtp=async(req,res)=>{
    const email=parseInt(req.body.email);
    console.log('email',email);
    // 
    const conn_ = await conn.getConnection();
    const checkUsers = "select * from tblusers where email=?";
    const usersValues = [user_Id];
    const [resultsUser] = await conn_.execute(checkUsers, usersValues);
    if(resultsUser.length==0){
         res.status(400).json({
            statusCode: 400,
            message: 'Invalid Student ID',
            data: [],
            status: false
        });
    }else{
        const emailId = resultsUser[0].email;
        const responseData={
            "otp":"1111",
            "user_Id":resultsUser[0].id,
            "email":emailId
        }
        res.status(200).json({
            statusCode: 200,
            message: 'OTP has been sent to Email-Id',
            data:responseData,
            status: true
        });
    }
}

const updatePassword=async(req,res)=>{
    const {email,otp,newPassword}=req.body;
    console.log(req.body);
    if(parseInt(otp)==1111){
        console.log('otp matched');
        const conn_ = await conn.getConnection();
        const saltRounds = 10; // Number of salt rounds
        bcrypt.hash(newPassword, saltRounds,async (err, hash) => {
            const insertQuery = "update tblusers set password=? where email=?";
            const values = [hash,email];
            const data=await conn_.execute(insertQuery, values); 
            res.status(200).json({
                statusCode: 200,
                message: 'password has been updated',
                data:data,
                status: false
            });
        });
    }else{
        res.status(400).json({
            statusCode: 400,
            message: 'OTP doesnot matched',
            data:[],
            status: false
        });
    }
}

const checkLoginDetails=async(req,res)=>{
    const{userName,password}=req.body;
    console.log('all data ---',req.body);
    const status=0;
    try {
      const conn_ = await conn.getConnection(); // Get a connection from the pool
      const checkUsers = "select * from tblusers where userName=?";
      const usersValues = [userName];
      const [resultsUser] = await conn_.execute(checkUsers, usersValues);
      console.log('with correct users name ', resultsUser.length);
      if(resultsUser.length==0){
        res.status(400).json({
            statusCode: 400,
            message: 'Invalid Creds',
            data: [],
            status: false
        });
      }else{
        const savedPassword = resultsUser[0].password;
        const passwordMatch = await bcrypt.compare(password, savedPassword);
        if (passwordMatch) {
            console.log('Password is correct', resultsUser[0]);
            res.status(200).json({
            statusCode: 200,
            message: 'Valid user name and Password',
            data: resultsUser[0],
            status: true
            });
        } else {
            console.log('Password is incorrect');
            res.status(400).json({
            statusCode: 400,
            message: 'Invalid Password',
            data: [],
            status: true
            });
        }
      }
      
      conn_.release(); // Release the connection back to the pool
    } catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error',
        data: [],
        status: false
      });
    }
}


const getDriverName=async(req,res)=>{
    try{
        const conn_ = await conn.getConnection(); // Get a connection from the pool
        const listOrg = "SELECT user_id,firstname,lastname FROM tbluser_details";
        const [resultsOrganization] = await conn_.execute(listOrg);
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



const getDriverProfile=async(req,res)=>{
    try{
        const driverId=req.query.id;
        let status=0;
        const conn_ = await conn.getConnection(); // Get a connection from the pool
        const qry = "select tblOrganization_Driver.vehicleId, vehicle_details.truck_no, vehicle_details.plate_no,vehicle_details.VIN_no,vehicle_details.model,tblorganization_details.name as organizationName, tblorganization_details.contact_No, tblorganization_details.Address, tblorganization_details.MCno from vehicle_details inner join tblOrganization_Driver on vehicle_details.id=tblOrganization_Driver.vehicleId inner join tblorganization_details on tblorganization_details.userId=tblOrganization_Driver.organizationId where tblOrganization_Driver.driverId=?";
        const qryValues=[driverId];
        const [resultsProfile] = await conn_.execute(qry,qryValues);
        if(resultsProfile){
            let vehicleId=resultsProfile[0].vehicleId;
            console.log('vehicle Id---',vehicleId);
            const qryvehicle = "select tbluser_details.firstname, tbluser_details.lastname, tbluser_details.user_id from tbluser_details inner join tblOrganization_Driver on tblOrganization_Driver.driverId=tbluser_details.user_id where tblOrganization_Driver.vehicleId=?";
            const qryVehicleValues=[vehicleId];
            const [resultsVehicle] = await conn_.execute(qryvehicle,qryVehicleValues);
            resultsProfile[0]["coworkerName"]=resultsVehicle[1].firstname+" "+resultsVehicle[1].lastname;
            resultsProfile[0]["coworkerId"]=resultsVehicle[1].user_id;
            console.log(resultsProfile);
            res.status(200).json({
                statusCode:200,
                message:'all record',
                data:resultsProfile,
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

module.exports={
    addUsersDetails,checkLoginDetails,getUser,getDriverName,
    getDriverProfile,sendOtp,updatePassword
}