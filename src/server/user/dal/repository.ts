import { Request, Response } from "express";
import { getManager, Repository } from "typeorm";
import { UserInfo } from "../models/model";
import { Result } from "../../../models/Result";
import ValidationExceptions from "../../../constants/ValidationExceptions";
import CustomError from "../../../models/CustomError";
import { IUserRepository } from "./irepository";
import { injectable } from "inversify";

@injectable()
export class UserRepository implements IUserRepository {

    private repository: Repository<any> ;

    constructor() {
        this.repository = getManager().getRepository(UserInfo)
    }

    public saveUser = async (userModel) => {
    
         return await this.repository.save(userModel)
         .then(response => {
            return Result.succesful(response);
         })
         .catch(error => {
            return Result.failure(new CustomError(450 , error.message));
         })
          
    }

    public getAllUsers = async () => {
        const response = await this.repository.find();
        if (!response) Result.failure(ValidationExceptions.USER_ALREADY_REGISTERED);
        return Result.succesful(response);
    }
}
