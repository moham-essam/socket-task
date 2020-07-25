import {Body, Controller, HttpCode, HttpStatus, Post} from "@nestjs/common";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {RegisterRequest} from "./requests/register.request";
import {RegisterService} from "../domain/services/register.service";
import {AccessTokenResponse} from "./responses/access-token.response";
import {LoginRequest} from "./requests/login.request";
import {LoginService} from "../domain/services/login.service";

@Controller('users')
export class UsersController {
    constructor(private registerService: RegisterService, private loginService: LoginService) {
    }

    @ApiCreatedResponse({description: 'Create User', type: AccessTokenResponse})
    @Post('register')
    async register(@Body() body: RegisterRequest): Promise<AccessTokenResponse> {
        return new AccessTokenResponse(await this.registerService.execute(body));
    }

    @ApiOkResponse({description: 'Login', type: AccessTokenResponse})
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() body: LoginRequest): Promise<AccessTokenResponse> {
        return new AccessTokenResponse(await this.loginService.execute(body));
    }
}
