
// import app from './App';
// const port = 3001;

// app.listen(3001 , () => {
    
//     return console.log(`server is listening on ${port}`);
// })


import App from './App';


import config from './config/index';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {UserInfo} from "./server/user/model";



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
    const app = new App();
    
    app.listen();
}).catch(error => console.log(error));



// call database using class
// how to handle error using database
// improve Schema validation
// improve DAL layuer by implementing super class
// remove constants form here and there
