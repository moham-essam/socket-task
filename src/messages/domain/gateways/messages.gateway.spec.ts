import {MessagesGateway} from "./messages.gateway";
import {RoomsEnum} from "../enums/rooms.enum";

describe('Messages Gateway', () => {
    const gateway = new MessagesGateway();

    const socketMock: any = {
        join(room: string) {
            return true;
        }
    };

    const serverMock: any = {
        to(room: string) {
            return this;
        },
        emit(event: string, message: any) {
            return true;
        }
    };

    describe('afterInit', () => {
        it('should initialize server property', function () {
            gateway.afterInit(serverMock);
            expect(gateway.server).toEqual(serverMock);
        });
    });


    describe('handleConnection', () => {
        it('should link the client with default room', function () {
            const spyOnJoin = jest.spyOn(socketMock, 'join');
            gateway.handleConnection(socketMock);
            expect(spyOnJoin).toBeCalled();
            expect(spyOnJoin).toBeCalledWith(RoomsEnum.DEFAULT);
        });
    });

    describe('publishToRoom', () => {
        it('should publish to room', function () {
            const spyOnServerTo = jest.spyOn(serverMock, 'to');
            const spyOnServerEmit = jest.spyOn(serverMock, 'emit');
            gateway.publishToRoom({room: 'test', event: 'test-event', message: 'test-message'});

            expect(spyOnServerTo).toBeCalled();
            expect(spyOnServerTo).toBeCalledWith('test');

            expect(spyOnServerEmit).toBeCalled();
            expect(spyOnServerEmit).toBeCalledWith('test-event', 'test-message');
        });
    });
});
