
const conn=require('../connection');
const bcrypt = require('bcrypt');



const addUsersDetails=async(req,res)=>{
    const{firstName,lastName,userName,password,role,email, phoneNo,licenseNo, state, expiration, exempt,startingperiod,hosrules, allowpersonalName, allowYardMove }=req.body;
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
                message:results,
                status:true
            });
        }
      });
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






module.exports={
    addUsersDetails,checkLoginDetails,getUser
}