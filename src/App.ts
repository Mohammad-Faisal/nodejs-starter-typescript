import express from "express";
import logger from 'morgan';
import "reflect-metadata";
import * as bodyParser from 'body-parser';
import errorMiddleware from './middlewares/ErrorHandler';


export default class App {

    public app: express.Application;
    public port: number = 3001;

    constructor(controllers) {
        
        this.app = express();

        this.setRequestPreProcessors();
        this.initializeControllers(controllers);
        this.handleError();
    }

    private initializeControllers(controllers) {

        controllers.forEach((controller) => {
            this.app.use('/api/v1', controller.router);
        });
    }

    private setRequestPreProcessors() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(logger('dev'));
    }

    private handleError(): void {
        this.app.use(errorMiddleware)
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
    
}


