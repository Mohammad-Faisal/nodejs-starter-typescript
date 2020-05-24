import { UserRepository } from "./repository";
import { UserService } from "./service";
const db = require('../../database');


// export class UserController {

//     private userService : UserService;

//     constructor() {
//         this.userService = new UserService();
//     }
// }

module.exports =  {

    createUser : async (req, res , next) => {
        const response = await new UserService().createNewUser(req.body);
        res.json(response);
    },

    getAllUsers: async (req , res , next) => {
        const allUsers = await new UserService().getAllUsers(req.body);
        res.json(allUsers);
    }

}