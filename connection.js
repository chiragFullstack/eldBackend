const mysql_ = require('mysql');
const mysql = require('mysql2/promise');
// const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'eld'
// });

    // const connection = mysql.createPool({
    //     host: '208.109.67.112', //162.213.251.52
    //     user: 'Yadbir',//'arcopgcy_admin',   //adminEld admin edridhzx_admin
    //     password:'Canteen123!@#', //'Chirag!@#123'   1OkMChGhGOKK //
    //     database:'Punjabicanteen'  //edridhzx_EldBackend
    // });

    const connection = mysql.createPool({
        host: '162.213.251.52', //162.213.251.52
        user: 'edridhzx_admin',//'arcopgcy_admin',   //adminEld admin 
        password:'1OkMChGhGOKK', //'Chirag!@#123'   1OkMChGhGOKK //
        database:'edridhzx_EldBackend'  //
    });
    

    

module.exports = connection;