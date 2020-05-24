import { Request } from "express";
import { BaseResponse } from "../../models/BaseResponse";

export interface IUserService {

    createNewUser: (request: Request) => Promise<BaseResponse>;
    getAllUsers: (request: Request) => Promise<BaseResponse>;

}