import {User} from "../models/user";
import {LoginService} from "./login.service";
import {InvalidCredentialsException} from "../exceptions/invalid-credentials.exception";

describe('Login Service', () => {
    const correctUsername = 'test';
    const userMock = {
        id: 50,
        username: correctUsername,
        password: 'hashed'
    }

    const correctPassword = 'correct';
    const tokenMock = 'token';

    const tokenService: any = {
        generate(user: User) {
            return tokenMock;
        }
    }

    const userRepoMock: any = {
        findOne({ where }) {
            if (where.username === userMock.username) {
                return userMock;
            } else {
                return null;
            }
        }
    }

    const hashServiceMock: any = {
        compare(text: string, hashedText) {
            return text === correctPassword;
        }
    }

    const service = new LoginService(userRepoMock, hashServiceMock, tokenService);

    describe('execute', () => {
        it('should return access token if credentials are valid', async () => {
            const loginCredentials = {password: correctPassword, username: correctUsername}
            const token = service.execute(loginCredentials);
            await expect(token).resolves.toEqual(tokenMock);
        });

        it('should throw invalid credentials exception if username is invalid', async () => {
            const loginCredentials = {password: correctPassword, username: 'invalid'}
            const token = service.execute(loginCredentials);
            await expect(token).rejects.toThrowError(InvalidCredentialsException);
        });

        it('should throw invalid credentials exception if password is invalid', async () => {
            const loginCredentials = {password: 'invalid', username: correctUsername}
            const token = service.execute(loginCredentials);
            await expect(token).rejects.toThrowError(InvalidCredentialsException);
        });
    });
});
