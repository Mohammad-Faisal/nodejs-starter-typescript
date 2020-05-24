
import config from '../config/index';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {UserInfo} from "../server/user/model";

createConnection({
    type: "postgres",
    host: config.dbURL,
    port:  5432,
    username: config.dbUserName,
    password: config.dbPassword,
    database: config.dbName,
    entities: [
        UserInfo
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    console.log('a new connection is created')
}).catch(error => console.log(error));

//this is for raw postgres query

// const { Pool } = require('pg');
// const pool = new Pool({
//     user: config.dbUserName,
//     host: config.dbURL,
//     database: config.dbName,
//     password: config.dbPassword,
//     port:config.dbPort,
// })
// module.exports = {
//     query: (text, params, callback) => {
//         const start = Date.now()
//         return pool.query(text, params, (err, res) => {
//             const duration = Date.now() - start
//             console.log('executed query', { text, params , duration })
//             callback(err, res)
//         })
//     },

//     getClient: (callback) => {
//         pool.connect((err, client, done) => {
//             const query = client.query

//             // monkey patch the query method to keep track of the last query executed
//             client.query = (...args) => {
//                 client.lastQuery = args
//                 return query.apply(client, args)
//             }

//             // set a timeout of 5 seconds, after which we will log this client's last query
//             const timeout = setTimeout(() => {
//                 console.error('A client has been checked out for more than 5 seconds!')
//                 console.error(`The last executed query on this client was: ${client.lastQuery}`)
//             }, 5000)

//             const release = (err) => {
//                 done(err)
//                 clearTimeout(timeout)
//                 client.query = query
//             }
//             callback(err, client, release)
//         })
//     }
// }