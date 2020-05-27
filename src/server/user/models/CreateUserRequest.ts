import { IsPositive  , IsAlpha} from "class-validator";

export default class CreateUserRequest {

    @IsPositive()
    age: number = 10;

    @IsAlpha()
    name: string = "";

}