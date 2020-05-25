import {Container} from 'inversify';
import { UserService } from '../server/user/service';
import TYPES from './file.types';
import { IUserService } from '../server/user/iservice';


var DIContainer = new Container();

DIContainer.bind<IUserService>(TYPES.IUserService ).to(UserService).inSingletonScope();

export default DIContainer;