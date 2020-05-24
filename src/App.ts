import express from "express";
import logger from 'morgan';
import "reflect-metadata";
import * as bodyParser from 'body-parser';
import routes from './server/index';

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.setRequestPreProcessors();
        this.mountRoutes();
        this.handleError();
    }

    private setRequestPreProcessors() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(logger('dev'));
    }

    private mountRoutes(): void {
        const router = express.Router()
        this.app.use('/api/v1', routes(router))
        
    }

    private handleError() : void {
        this.app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.json({
                message : err.message
            })
        })
    }
}

export default new App().app

