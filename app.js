require('dotenv').config();
const express=require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors=require('cors');
const http=require('http');

const conn=require('./connection');

const registerUser=require('./routes/user/registerUser');
const login=require('./routes/user/login');
const listUser=require('./routes/user/driverList');

const app=express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());



app.use('/api/register',registerUser);
app.use('/api/login',login);
app.use('/api/driver',listUser);

const PORT=process.env.PORT|5000;


app.listen(PORT,async()=>{
    console.log('server is running');
});

