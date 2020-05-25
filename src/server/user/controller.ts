import { UserService } from "./service";
import * as express from 'express';
import Requests from './schema';
import { SuccessResponse } from "../../models/SuccessResponse";
import ValidationExceptions from "../../constants/ValidationExceptions";
let validate = require('../../middlewares/SchemaValidator');

export default class UserController {

    public userService = new UserService();
    public router = express.Router();

    constructor() {
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
