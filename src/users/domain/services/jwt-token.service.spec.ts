import {JwtTokenService} from "./jwt-token.service";

describe('JWT token service', () => {
    const jwtServiceMock: any = {
        sign(obj: any) {
            return 'token';
        }
    };

    const service = new JwtTokenService(jwtServiceMock);

    describe('generate', () => {
        it('should generate jwt token', function () {
            const spyOnSign = jest.spyOn(jwtServiceMock, 'sign');
            const result = service.generate({id: 21, password: 'test', username: 'test'})
            expect(result).toEqual('token');
            expect(spyOnSign).toBeCalled();
            expect(spyOnSign).toBeCalledWith({username: 'test', id: 21});
        });
    });
});
