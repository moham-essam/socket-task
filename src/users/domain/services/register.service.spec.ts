import {User} from "../models/user";
import {RegisterService} from "./register.service";

describe('Register Service', () => {
    const hashedMock = 'hashed';
    const idMock = 50;
    const tokenMock = 'token';

    const userRepoMock: any = {
        save(user: User) {
            const result = Object.assign({}, user)
            result.id = idMock;
            return result;
        }
    }

    const hashServiceMock: any = {
        hash(text: string) {
            return hashedMock;
        }
    }

    const tokenService: any = {
        generate(user: User) {
            return tokenMock;
        }
    }

    const service = new RegisterService(userRepoMock, hashServiceMock, tokenService);

    describe('execute', () => {
        it('should orchestrate the registration process', async () => {
            const spyOnRepoSave = jest.spyOn(userRepoMock, 'save');
            const spyOnHash = jest.spyOn(hashServiceMock, 'hash');
            const spyOnTokenService = jest.spyOn(tokenService, 'generate');
            const userMock = {password: 'test-password', username: 'test'}

            const token = service.execute(userMock);

            await expect(token).resolves.toEqual(tokenMock);
            expect(spyOnHash).toBeCalledWith(userMock.password);
            expect(spyOnRepoSave).toBeCalledWith({username: userMock.username, password: hashedMock});
            expect(spyOnTokenService).toBeCalledWith({id: idMock, username: userMock.username, password: hashedMock});
        });
    });
});
