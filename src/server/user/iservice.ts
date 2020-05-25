import { Request } from "express";
import { BaseResponse } from "../../models/BaseResponse";
import { Result } from "../../models/Result";

export interface IUserService {

    createNewUser: (request: Request) => Promise<Result>;
    getAllUsers: (request: Request) => Promise<Result>;

}