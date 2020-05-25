
import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../models/ErrorResponse';
import { ErrorCodes } from '../constants/ErrorCodes';

function errorMiddleware(error : any, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 500;
    const errorCode = error.errorCode || ErrorCodes.DATABASE_ERROR;
    const message = error.message || 'Something went wrong';
    response
        .status(status)
        .json(new ErrorResponse(status ,errorCode, message));
        
}

export default errorMiddleware;
