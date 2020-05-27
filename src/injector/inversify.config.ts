import {Container} from 'inversify';
import { UserService } from '../server/user/UserService';
import TYPES from './file.types';
import { IUserService } from '../server/user/IUserService';
import "reflect-metadata";


var DIContainer = new Container();

DIContainer.bind<IUserService>(TYPES.IUserService ).to(UserService).inSingletonScope();

export default DIContainer;