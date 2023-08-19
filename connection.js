const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'eld'
// });
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'arcopgcy_admin',
    password: '#0N-HerUny%h',
    database: 'arcopgcy_Eld'
});

module.exports = connection;