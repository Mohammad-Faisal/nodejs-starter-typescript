//import userSchema from "../domain/users/models/UserSchema";
import Requests from './schema';
let userController = require('./controller');
let validate = require('../../middlewares/SchemaValidator');

export default (router) => {

    router.route('/createUser')
        .post(
            validate(Requests.createUser),
            userController.createUser
        );

    router.route('/getUsers')
        .get(
            userController.getAllUsers
        )
        
}