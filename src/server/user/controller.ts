import { UserService } from "./service";
import * as express from 'express';
import Requests from './schema';
import { SuccessResponse } from "../../models/SuccessResponse";
import ValidationExceptions from "../../constants/ValidationExceptions";
import { IUserService } from "./iservice";
import { inject, injectable } from "inversify";
import TYPES from "../../injector/file.types";
import DIContainer from "../../injector/inversify.config";
let validate = require('../../middlewares/SchemaValidator');

@injectable()
export default class UserController {

    public userService : IUserService;
    public router = express.Router();

    //@inject(TYPES.IUserService) userService : IUserService 
    constructor( ) {
        this.userService = DIContainer.get<IUserService>(TYPES.IUserService);
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.route('/createUser').post(validate(Requests.createUser) ,this.createUser);
        this.router.route('/getUsers').get(this.getAllUsers);
    }

    createUser = async (req, res, next) => {
        const userInfo = await this.userService.createNewUser(req.body);
        
        res.json(new SuccessResponse(userInfo.getValue()));
    }

    getAllUsers = async (req, res, next) => {
        const allUsers = await this.userService.getAllUsers(req.body);
        if(allUsers.isFailure)next(allUsers.error);
        else res.json(new SuccessResponse(allUsers.getValue()));
    }

}
