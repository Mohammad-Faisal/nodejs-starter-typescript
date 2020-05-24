import { IUserService } from "./iservice";
import { Request } from "express";
import { BaseResponse } from "../../models/BaseResponse";
import { UserRepository } from "./repository";

export class UserService implements IUserService {


    createNewUser = async (createUserRequest: Request): Promise<BaseResponse> => {
        const userInfoObject = await new UserRepository().saveUser(createUserRequest);
        const response = new BaseResponse(userInfoObject);
        return response;
    }

    getAllUsers = async (getUserRequest: Request): Promise<BaseResponse> => {
        const usersList = await new UserRepository().getAllUsers();
        const response = new BaseResponse(usersList);
        return response;
    }
}