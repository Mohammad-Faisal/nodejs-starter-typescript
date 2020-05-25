
import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../models/ErrorResponse';
import CustomError from '../models/CustomError';
//import HttpException from '../exceptions/HttpException';

function errorMiddleware(error : any, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 500;
    const errorCode = error.errorCode || 99999;
    const message = error.message || 'Something went wrong';
    response
        .status(status)
        .json(new ErrorResponse(status ,errorCode, message));
        
}

export default errorMiddleware;
