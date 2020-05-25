import { IUserService } from "./iservice";
import { Request } from "express";
import { BaseResponse } from "../../models/BaseResponse";
import { UserRepository } from "./repository";
import { Result } from "../../models/Result";

export class UserService implements IUserService {


    createNewUser = async (createUserRequest: Request): Promise<Result> => {
        const result = await new UserRepository().saveUser(createUserRequest);
        return result;
    }

    getAllUsers = async (getUserRequest: Request): Promise<Result> => {
        const result = await new UserRepository().getAllUsers();
        return result;
    }
}