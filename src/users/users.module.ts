import {Module} from "@nestjs/common";
import {HASH_SERVICE} from "./domain/interfaces/hash.interface";
import {HashService} from "./domain/services/hash.service";
import {RegisterService} from "./domain/services/register.service";
import {UsersController} from "./api/users.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./domain/models/user";
import {JwtModule} from "@nestjs/jwt";
import {JWT_OPTIONS} from "../config/module-options/jwt.options";
import {TOKEN_SERVICE} from "./domain/interfaces/token-service.interface";
import {JwtTokenService} from "./domain/services/jwt-token.service";
import {LoginService} from "./domain/services/login.service";

@Module({
    imports: [TypeOrmModule.forFeature([User]), JwtModule.registerAsync(JWT_OPTIONS)],
    controllers: [UsersController],
    providers: [
        {provide: HASH_SERVICE, useClass: HashService},
        {provide: TOKEN_SERVICE, useClass: JwtTokenService},
        RegisterService,
        LoginService,
    ]
})
export class UsersModule {
}
