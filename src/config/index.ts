const dotenv = require('dotenv');
dotenv.config();

export default {
    applicationPort: process.env.PORT,
    dbURL: process.env.DB_URL,
    dbPort: process.env.DB_PORT ,
    dbName: process.env.DB_NAME ,
    dbUserName: process.env.DB_USER_NAME ,
    dbPassword: process.env.DB_PASSWORD ,
}