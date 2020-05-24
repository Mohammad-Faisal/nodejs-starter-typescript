import express from "express";
import logger from 'morgan';
import "reflect-metadata";
import * as bodyParser from 'body-parser';

export default class App {

    public app: express.Application;
    public port?: number;

    constructor(controllers) {
        this.app = express();
        this.port = 3001;
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
        this.app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.json({
                message: err.message
            })
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}


