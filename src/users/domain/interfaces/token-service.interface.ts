import {User} from "../models/user";

export const TOKEN_SERVICE = 'TOKEN_SERVICE';

export interface TokenServiceInterface {
    generate(auth: User): Promise<string> | string;
    verify(token: string): Promise<boolean>;
}
