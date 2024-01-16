// const mysql_ = require('mysql');
// const mysql = require('mysql2/promise');

// const { Client } = require("ssh2");
// const sshClient = new Client();
// const { readFileSync } = require("fs");

// // const connection = mysql.createPool({
// //     host: 'localhost',
// //     user: 'root',
// //     password: '',
// //     database: 'eld'
// // });

//     // const connection = mysql.createPool({
//     //     host: '208.109.67.112', //162.213.251.52
//     //     user: 'Yadbir',//'arcopgcy_admin',   //adminEld admin edridhzx_admin
//     //     password:'Canteen123!@#', //'Chirag!@#123'   1OkMChGhGOKK //
//     //     database:'Punjabicanteen'  //edridhzx_EldBackend
//     // });

//     // const connection = mysql.createPool({
//     //     host: '162.255.116.142:2083', //162.213.251.52
//     //     user: 'edrivebook_gill',//'arcopgcy_admin',   //adminEld admin edridhzx_admin
//     //     password:'bOXq4NOi=*^S', //'Chirag!@#123'   1OkMChGhGOKK //
//     //     database:'edrivebook_punjabicanteen'  //edridhzx_EldBackend
//     // });

// // const connection = mysql.createPool({
// //         host: '127.0.0.1', //162.213.251.52
// //         user: '"edridhzx_gill"',//'arcopgcy_admin',   //adminEld admin edridhzx_admin
// //         password:'bOXq4NOi=*^S(', //'Chirag!@#123'   1OkMChGhGOKK //
// //         database:'edridhzx_punjabicanteen'  //edridhzx_EldBackend
// //     });

// const tunnelConfig = {
//   host: "162.255.116.142", //"162.213.251.52",
//   port: 22, //21098,
//   username: "edrivebook", //"edridhzx",
//   //password: //"0nVkjUyaIceT",
//   privateKey: readFileSync("./id_rsa"),
//   passphrase: "qhYvsY&&mD0d",
// };

// const dbServer = {
//   host: "127.0.0.1",
//   port: 3306,
//   user: "edrivebook_gill",
//   password: "bOXq4NOi=*^S",
//   database: "edrivebook_punjabicanteen", //"edridhzx_EldBackend",
// };

// const forwardConfig = {
//   srcHost: "127.0.0.1",
//   srcPort: 5522,
//   dstHost: dbServer.host,
//   dstPort: dbServer.port,
// };
// const SSHConnection = new Promise((resolve, reject) => {
//   sshClient
//     .on("ready", () => {
//       console.log("tunnel connection established");

//       sshClient.forwardOut(
//         forwardConfig.srcHost,
//         forwardConfig.srcPort,
//         forwardConfig.dstHost,
//         forwardConfig.dstPort,
//         (err, stream) => {
//           if (err) reject(err);
//           const updatedDbServer = {
//             ...dbServer,
//             stream,
//           };
//           const connection = mysql.createConnection(updatedDbServer);
//           connection.connect((error) => {
//             if (error) {
//               reject(error);
//             }
//             resolve(connection);
//           });
//         }
//       );
//     })
//     .connect(tunnelConfig);
// });



// module.exports = connection;

// connection.js
const mysql = require('mysql2/promise');
const { Client } = require('ssh2');
const { readFileSync } = require('fs');

const establishConnection = async () => {
  const sshClient = new Client();

  const tunnelConfig = {
    host: "162.255.116.142",
    port: 22,
    username: "edrivebook",
    privateKey: readFileSync("./id_rsa"),
    passphrase: "qhYvsY&&mD0d",
  };

  const dbServer = {
    host: "127.0.0.1",
    port: 3306,
    user: "edrivebook_gill",
    password: "bOXq4NOi=*^S",
    database: "edrivebook_punjabicanteen",
  };

  const forwardConfig = {
    srcHost: "127.0.0.1",
    srcPort: 5522,
    dstHost: dbServer.host,
    dstPort: dbServer.port,
  };

  return new Promise((resolve, reject) => {
    sshClient
      .on("ready", () => {
        console.log("Tunnel connection established");

        sshClient.forwardOut(
          forwardConfig.srcHost,
          forwardConfig.srcPort,
          forwardConfig.dstHost,
          forwardConfig.dstPort,
          (err, stream) => {
            if (err) reject(err);

            const updatedDbServer = {
              ...dbServer,
              stream,
            };
            const connection = mysql.createConnection(updatedDbServer);
            resolve(connection);
          }
        );
      })
      .connect(tunnelConfig);
  });
};

module.exports = establishConnection;
