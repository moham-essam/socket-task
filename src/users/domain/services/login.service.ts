import {Inject, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../models/user";
import {Repository} from "typeorm";
import {HASH_SERVICE} from "../interfaces/hash.interface";
import {HashService} from "./hash.service";
import {TOKEN_SERVICE, TokenServiceInterface} from "../interfaces/token-service.interface";
import {LoginRequest} from "../../api/requests/login.request";
import {InvalidCredentialsException} from "../exceptions/invalid-credentials.exception";

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(User) private repository: Repository<User>,
        @Inject(HASH_SERVICE) private hashService: HashService,
        @Inject(TOKEN_SERVICE) private tokenService: TokenServiceInterface
    ) {
    }

    async execute(login: LoginRequest) {
        const user = await this.repository.findOne({where: {username: login.username}});

        if (user && await this.hashService.compare(login.password, user.password)) {
            return this.tokenService.generate(user);
        }

        throw new InvalidCredentialsException();
    }
}
