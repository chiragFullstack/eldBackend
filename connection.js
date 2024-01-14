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
        host: '162.255.116.142', //162.213.251.52
        user: 'edrivebook_gill',//'arcopgcy_admin',   //adminEld admin edridhzx_admin
        password:'bOXq4NOi=*^S', //'Chirag!@#123'   1OkMChGhGOKK //
        database:'edrivebook_punjabicanteen'  //edridhzx_EldBackend
    });


module.exports = connection;