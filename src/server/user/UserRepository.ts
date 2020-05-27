import {Request, Response} from "express";
import {getManager, Repository} from "typeorm";
import {UserInfo} from "./model";
import { Result } from "../../models/Result";
import ValidationExceptions from "../../constants/ValidationExceptions";
import CustomError from "../../models/CustomError";


export class UserRepository {

    private repository : Repository<any> ;

    constructor() {
        this.repository = getManager().getRepository(UserInfo)
    }

    public saveUser = async (userModel) => {
        const response = await this.repository.save(userModel);
        if(!response) Result.failure(ValidationExceptions.USER_ALREADY_REGISTERED);
        return Result.succesful(response);
    }

    public findUserById = async(name : string) => {
        const userObject = await this.repository.findOne({ where: { name: name } })
        return userObject;
    }

    public getAllUsers = async () => {
        const response = await this.repository.find();
        return Result.succesful(response);
    }

}
