import {IsNotEmpty, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Unique} from "../../../shared/validators/unique.validator";
import {User} from "../../domain/models/user";

export class RegisterRequest {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Unique({model: User.name, field: 'username'})
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}
