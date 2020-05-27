import express from "express";
import logger from 'morgan';
import "reflect-metadata";
import * as bodyParser from 'body-parser';
import { createExpressServer, useExpressServer } from "routing-controllers";
import UserController from "./server/user/UserController";
import { CustomErrorHandler } from "./middlewares/CustomErrorHandler";
import "reflect-metadata";


export default class App {

    public app: express.Application;
    public port: number = 3001;

    constructor() {

        // this.app = express()
        

       

        // this.app.use(bodyParser.json());
        // this.app.use(bodyParser.urlencoded({ extended: true }))

        // useExpressServer(this.app, {
        //     routePrefix: "/api/v1",
        //     defaultErrorHandler: false,
        //     middlewares: [CustomErrorHandler],
        //     controllers: [UserController]

        //     // controllerDirs: [__dirname + "/controller/**/*.controller.js"],
        //     // middlewareDirs: [__dirname + "/middleware/**/*.middleware.js"],
        //     // interceptorDirs: [__dirname + "/interceptor/**/*.interceptor.js"]
        // });


        this.app = createExpressServer({
            routePrefix: "/api/v1",
            defaultErrorHandler: false,
            controllers: [UserController] ,
            middlewares: [CustomErrorHandler],
             // we specify controllers we want to use
        });

        //this.setRequestPreProcessors();
        //this.setRequestPreProcessors();
        //this.initializeControllers(controllers);
        //this.handleError();
    }



    private setRequestPreProcessors() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(logger('dev'));
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }

}


