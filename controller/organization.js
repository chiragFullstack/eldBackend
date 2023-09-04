const conn=require('../connection');
const bcrypt = require('bcrypt');
const moment = require('moment');


const addOrganizationDetails=async(req,res)=>{
    const{orgName,contactNo,userName,password,email,companyAddress,McNo}=req.body;
    const status=0;
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
                const conn_ = await conn.getConnection(); // Get a connection from the pool
                const insertQuery = "INSERT INTO tblusers(userName, password, role, email,status) VALUES (?, ?,?,?,?)";
                const values = [userName, hash,"organization",email,status];
                const [resultsUser]=await conn_.execute(insertQuery, values);
                console.log('Insertion successful:', resultsUser.insertId);
                const User_Id=parseInt(resultsUser.insertId);
                const insertOrg = "INSERT INTO tblorganization_details(name,contact_no,Address,MCno,email,userId) VALUES (?,?,?,?,?,?)";
                const orgValues = [orgName,contactNo,companyAddress,McNo,email,User_Id];
                console.log('Organization values---',orgValues);
                const data=await conn_.execute(insertOrg, orgValues);
                if(data){
                    console.log('Insertion successful into Users details :', resultsUser);
                    res.status(200).json({
                        statusCode:200,
                        message:'Record Saved',
                        data:resultsUser.insertId,
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
    });   
}


const organizationList=async(req,res)=>{
    try{
        const conn_ = await conn.getConnection(); // Get a connection from the pool
        const listOrg = "SELECT * FROM tblorganization_details";
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
            message:error.message,
            data:[],
            status:true
        });
    }
}

const organizationDetails=async(req,res)=>{
    try{
        let id=0;
        if(req.query.id){
            id= parseInt(req.query.id);
        }else{
            id= parseInt(req.body.id);
        }
        const conn_ = await conn.getConnection(); // Get a connection from the pool
        const listOrg = "SELECT * FROM tblorganization_details where id=?";
        const orgValues = [id];
        const [resultsOrganization] = await conn_.execute(listOrg,orgValues);
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
            message:error.message,
            data:[],
            status:true
        });
    }
}


const organizationDelete=async(req,res)=>{
    try{
        let id=0;
        if(req.query.id){
            id= parseInt(req.query.id);
        }else{
            id= parseInt(req.body.id);
        }
        const conn_ = await conn.getConnection(); // Get a connection from the pool
        const listOrg = "delete  FROM tblorganization_details where id=?";
        const orgValues = [id];
        const [resultsOrganization] = await conn_.execute(listOrg, orgValues);
        if(resultsOrganization){
            res.status(200).json({
                statusCode:200,
                message:resultsOrganization,
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
    }catch(err){
        res.status(500).json({
            statusCode:500,
            message:err.message,
            data:[],
            status:true
        });
    }
}

const editOrganizationDetails=async(req,res)=>{
    const{id,orgName,contactNo,companyAddress,McNo}=req.body;    
    console.log(req.body);
     //insert the data into the user Table 
            // Store the hash in the database
            try{
                const conn_ = await conn.getConnection(); // Get a connection from the pool
                const updateOrg = "update tblorganization_details set name=?,contact_no=?,Address=?,MCno=? where id=?";
                const orgValues = [orgName,contactNo,companyAddress,McNo,id];
                console.log('Organization values---',orgValues);
                const data=await conn_.execute(updateOrg, orgValues);
                if(data){
                    console.log('Updated successful into Users details :',data);
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



const assignOrganizationDriver=async(req,res)=>{
    const{orgId,driverId,vehicleId}=req.body;
    try{
        var utcMoment = moment.utc();
        const formattedDateTime = new Date( utcMoment.format() );
        const conn_ = await conn.getConnection(); // Get a connection from the pool
        const OrgDriver = "insert into tblOrganization_Driver(organizationId,driverId,vehicleId,assignedDate)values(?,?,?,?)";
        const orgDriverValues = [orgId,driverId,vehicleId,formattedDateTime];
        console.log('Organization values---',orgDriverValues);
        const data=await conn_.execute(OrgDriver, orgDriverValues);
        if(data){
            console.log('Assigned Driver Sucessfully  :',data);
            res.status(200).json({
                statusCode:200,
                message:'Record Updated',
                data:data,
                status:true
            });
        }else{
            res.status(400).json({
                statusCode:400,
                message:"Check Record Properly ",
                data:[],
                status:true
            });
        }
        conn_.release();
    }catch(err){
        console.error('Error:', err.message);
        res.status(400).json({
          statusCode: 400,
          message:err.message,
          data: [],
          status: false
        });
    }
}


module.exports={
    addOrganizationDetails,organizationList,organizationDelete,
    organizationDetails,editOrganizationDetails,assignOrganizationDriver
}