import {Inject, Injectable} from "@nestjs/common";
import {RegisterRequest} from "../../api/requests/register.request";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../models/user";
import {Repository} from "typeorm";
import {HashService} from "./hash.service";
import {HASH_SERVICE} from "../interfaces/hash.interface";
import {TOKEN_SERVICE, TokenServiceInterface} from "../interfaces/token-service.interface";

@Injectable()
export class RegisterService {
    constructor(
        @InjectRepository(User) private repository: Repository<User>,
        @Inject(HASH_SERVICE) private hashService: HashService,
        @Inject(TOKEN_SERVICE) private tokenService: TokenServiceInterface,
    ) {
    }

    async execute(register: RegisterRequest) {
        const hashedPassword = await this.hashService.hash(register.password);
        const user = await this.save(register.username, hashedPassword);
        return this.tokenService.generate(user);
    }

    private save(username: string, password: string) {
        return this.repository.save({username, password});
    }
}
