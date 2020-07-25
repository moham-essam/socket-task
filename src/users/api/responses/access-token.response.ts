import {ApiProperty} from "@nestjs/swagger";

export class AccessTokenResponse {
    @ApiProperty()
    accessToken: string;

    constructor(token: string) {
        this.accessToken = token;
    }
}
