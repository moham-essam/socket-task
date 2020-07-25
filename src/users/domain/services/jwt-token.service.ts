import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {User} from "../models/user";
import {TokenServiceInterface} from "../interfaces/token-service.interface";

@Injectable()
export class JwtTokenService implements TokenServiceInterface {
    constructor(private jwtService: JwtService) {
    }

    generate(user: User) {
        return this.jwtService.sign({id: user.id, username: user.username});
    }
}
