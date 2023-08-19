const mysql = require('mysql');
// const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'eld'
// });

    const connection = mysql.createConnection({
        host: '208.109.67.112',
        user: 'Yadbir',//'arcopgcy_admin',   //adminEld
        password:'Canteen123!@#', //'Chirag!@#123' //
        database:'Punjabicanteen'
    });

module.exports = connection;