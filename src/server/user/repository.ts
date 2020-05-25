import {Request, Response} from "express";
import {getManager, Repository} from "typeorm";
import {UserInfo} from "./model";
import { Result } from "../../models/Result";
import ValidationExceptions from "../../constants/ValidationExceptions";


export class UserRepository {

    private repository : Repository< any> ;

    constructor() {
        this.repository = getManager().getRepository(UserInfo)
    }

    public saveUser = async (userModel) => {
        const response = await this.repository.save(userModel);
        if(!response) Result.failure(ValidationExceptions.USER_ALREADY_REGISTERED);
        return Result.succesful(response);
    }

    public getAllUsers = async () => {
        const response = await this.repository.find();
        if(!response) Result.failure(ValidationExceptions.USER_ALREADY_REGISTERED);
        return Result.succesful(response);
    }
}
