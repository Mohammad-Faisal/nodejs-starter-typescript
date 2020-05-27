import {Middleware, ExpressErrorMiddlewareInterface} from "routing-controllers";
import { ValidationError } from "class-validator";
import { ErrorCodes } from "../constants/ErrorCodes";
import { ErrorResponse } from "../models/ErrorResponse";

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {

    error(error: any, request: any, response: any, next: (err: any) => any) {
        
        console.log(' an exception is thrown ' ,error.httpCode , error.errors);
        console.log(error)

        const status = error.status || 500;
        const errorCode = error.errorCode || ErrorCodes.DATABASE_ERROR;
        const message = error.message || 'Something went wrong';
        response
            .status(status)
            .json(new ErrorResponse(status ,errorCode, message));
    }

}