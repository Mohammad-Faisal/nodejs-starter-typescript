import { UserService } from "./service";
import * as express from 'express';
import Requests from './schema';
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
        const response = await this.userService.createNewUser(req.body);
        res.json(response);
    }

    getAllUsers = async (req, res, next) => {
        const allUsers = await this.userService.getAllUsers(req.body);
        res.json(allUsers);
    }

}
