import {Body, Controller, Post} from "@nestjs/common";
import {ApiOkResponse} from "@nestjs/swagger";
import {RegisterRequest} from "./requests/register.request";
import {RegisterService} from "../domain/services/register.service";
import {AccessTokenResponse} from "./responses/access-token.response";

@Controller('users')
export class UsersController {
    constructor(private registerService: RegisterService) {
    }

    @ApiOkResponse({description: 'Create User', type: AccessTokenResponse})
    @Post('register')
    async register(@Body() body: RegisterRequest): Promise<AccessTokenResponse> {
        return new AccessTokenResponse(await this.registerService.execute(body));
    }
}
