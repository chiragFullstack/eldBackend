
const conn=require('../connection');
const bcrypt = require('bcrypt');



const deleteNoticeBySchool=(req,res)=>{
    let id=0;
    if(req.query.id){
        id= parseInt(req.query.id);
    }else{
        id= parseInt(req.body.id);
    }
    pool.query('delete from tblnotice where id=$1',[id],(err,result)=>{
        if(err){console.log(err);
            res.status(400).json({
                message:err,
                statusCode:400,
                status:false,  
            });
        }
        else{
            res.status(200).json({
                message:'All Notice',
                statusCode:200,
                status:true,
                data:result.rows
            });
        }
    });
}



const addUsersDetails=async(req,res)=>{
    const{firstName,lastName,userName,password,role,email, phoneNo,licenseNo, state, expiration, exempt,startingperiod,hosrules, allowpersonalName, allowYardMove }=req.body;
    const status=0;
     //insert the data into the user Table 
    const saltRounds = 10; // Number of salt rounds
    bcrypt.hash(password, saltRounds,async (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            return;
        }else{
            // Store the hash in the database
            console.log('Hashed Password:', hash);
            await conn.connect((err) => {
                if (err) {
                    console.error('Error connecting to MySQL:', err);
                    return;
                }
                const insertQuery = "INSERT INTO tblusers(userName, password, role, email,status) VALUES (?, ?,?,?,?)";
                const values = [userName, hash,role,email,status];
                conn.query(insertQuery, values, (err, results) => {
                   if (err) {
                       console.error('Error executing INSERT query:', err);
                       return;
                   }
           
                    console.log('Insertion successful:', results.insertId);
                    const User_Id=parseInt(results.insertId);
           //const{firstName,lastName,userName,password,role,email, phoneNo,licenseNo, state, expiration, exempt,startingperiod,hosrules, allowpersonalName, allowYardMove }=req.body;
                const insertUsers = "INSERT INTO tbluser_details(firstname,lastname,user_id, phone_no, license_no, state, expiration, exempt, starting_period,hos_rules,allow_personal_name, allow_yard_move) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
                const usersValues = [firstName, lastName,User_Id,phoneNo,licenseNo,state,expiration,exempt,startingperiod,hosrules,allowpersonalName,allowYardMove];
                console.log('user values---',usersValues);
                conn.query(insertUsers, usersValues, (errUser, resultsUser) => {
                   if (errUser) {
                       console.error('Error executing INSERT query:', errUser);
                       res.status(400).json({
                           statusCode:400,
                           message:'error',
                           data:[],
                           status:true
                       });
                   }else{
                       console.log('Insertion successful into Users details :', resultsUser);
                       res.status(200).json({
                           statusCode:200,
                           message:'Record Saved',
                           data:resultsUser.insertId,
                           status:true
                       });
                   }
                    
                });
           
                    conn.end((endErr) => {
                        if (endErr) {
                            console.error('Error closing connection:', endErr);
                        } else {
                            console.log('Connection closed');
                        }
                    });
                });
            });           
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
                message:'all Users ',
                status:true
            });
        }
        
      });
    

        // if(err){
        //     res.status(400).json({
        //         statusCode:400,
        //         message:err.message,
        //         status:true
        //     });
        // }else{
        //     console.log('connected');
        //     res.status(200).json({
        //         statusCode:200,
        //         message:'all Users ',
        //         status:true
        //     });
        // }
        
        
      
    // conn.query('SELECT * FROM tblusers', (error, results) => {
    //     if (error) throw error;
    //     console.log('Results:', results);
    //   });
    // res.status(200).json({
    //     statusCode:200,
    //     message:'all Users ',
    //     data:results.rows,
    //     status:true
    // });
}

const checkLoginDetails=async(req,res)=>{
    const{userName,password}=req.body;
    console.log('all data ---',req.body);
    const status=0;
     //insert the data into the user Table 
    const saltRounds = 10; // Number of salt rounds
    await conn.connect((err) => {
        const checkUsers = "select * from tblusers where userName=?";
        const usersValues = [userName];
        conn.query(checkUsers, usersValues, (errUser, resultsUser) => {
            if(errUser){
                console.log('while checking the error :',errUser);
                res.status(400).json({
                    statusCode:400,
                    message:'Invalid User Name',
                    data:[],
                    status:true
                });
            }else{
                const savedPassword=resultsUser[0].password;
                bcrypt.compare(password, savedPassword, (err, result) => {
                    if (err) {
                        console.error('Error comparing passwords:', err);
                        return;
                    }
                
                    if (result) {
                        console.log('Password is correct',resultsUser[0]);
                        res.status(200).json({
                            statusCode:200,
                            message:'Valid  user name and Password',
                            data:resultsUser[0],
                            status:true
                        });
                    } else {
                        console.log('Password is incorrect');
                        res.status(400).json({
                            statusCode:400,
                            message:'Invalid  Password',
                            data:[],
                            status:true
                        });
                        
                    }
                });
            }
        });
       
        conn.end((endErr) => {
            if (endErr) {
                console.error('Error closing connection:', endErr);
            } else {
                console.log('Connection closed');
            }
        });

   });
}


const addNotice=async(req, res) =>{
    const{schoolId,message,noticedate}=req.body;
    console.log(schoolId,'---',req.body);
    pool.connect();
    pool.query('insert into tblnotice(schoolid,message,noticedate)values($1,$2,$3) RETURNING *',[schoolId,message,noticedate],(err,result)=>{
        if(err){console.log(err); 
            res.status(400).json({
                statusCode:400,
                message:err,
                status:false
            });
        }
        else{
            res.status(200).json({
                statusCode:200,
                message:'Room Record Inserted',
                data:result.rows[0],
                status:true
            });
        }
    });    
}


const editNotice=async(req, res) =>{
    const{id,schoolId,message,noticedate}=req.body;
    let school_id = parseInt(schoolId)
    console.log(school_id,'---',req.body);
    pool.connect();
    pool.query('update tblnotice set schoolid=$1,message=$2,noticedate=$3 where id='+id+' RETURNING *',[school_id,message,noticedate],(err,result)=>{
        if(err){console.log(err); 
            res.status(err.code).json({
                statusCode:err.code,
                message:err.message,
                status:false
            });
        }
        else{
            res.status(200).json({
                statusCode:200,
                message:'Room Record Inserted',
                data:result.rows,
                status:true
            });
        }
    });    
}

module.exports={
    addUsersDetails,checkLoginDetails,getUser
}