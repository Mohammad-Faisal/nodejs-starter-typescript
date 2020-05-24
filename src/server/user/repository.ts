import {Request, Response} from "express";
import {getManager, Repository} from "typeorm";
import {UserInfo} from "./model";


export class UserRepository {

    private repository : Repository< any> ;

    constructor() {
        this.repository = getManager().getRepository(UserInfo)
    }

    public saveUser = async (userModel) => {
        const response = await this.repository.save(userModel);
        return response;
    }

    public getAllUsers = async () => {
        const response = await this.repository.find();
        return response;
    }
}
