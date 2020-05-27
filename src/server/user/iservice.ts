import { Request } from "express";
import { BaseResponse } from "../../models/BaseResponse";
import { Result } from "../../models/Result";
import CreateUserRequest from "./models/CreateUserRequest";

export interface IUserService {

    createNewUser: (request: CreateUserRequest) => Promise<Result>;
    getAllUsers: () => Promise<Result>;

} 