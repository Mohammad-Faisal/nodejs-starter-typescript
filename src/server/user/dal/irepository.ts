import { Result } from "../../../models/Result";

export interface IUserRepository {

    saveUser: (createUserRequest) => Promise<Result>;
    getAllUsers: () => Promise<Result>;

}