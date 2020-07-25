import {MessagesService} from "./messages.service";
import {RoomPublisherInterface} from "../interfaces/room-publisher.interface";
import {RoomPublisherOptionsInterface} from "../interfaces/room-publisher-options.interface";
import {EventTypesEnum} from "../enums/event-types.enum";
import {RoomsEnum} from "../enums/rooms.enum";
import {Message} from "../models/message";

describe('Messages Service', () => {
    let service: MessagesService;
    let publisher: RoomPublisherInterface;
    let repository: any;

    const userMock: any = {id: 40};
    const messagesMock = [{message: 'test', user: {id: 50, username: 'test'}}]

    beforeAll(async () => {
        publisher = {
            publishToRoom(options: RoomPublisherOptionsInterface): boolean {
                return true;
            }
        };

        repository = {
            save(message: Message) {
                return Promise.resolve(message);
            },
            find() {
                return messagesMock;
            }
        }


        service = new MessagesService(publisher, repository);
    });


    describe('create', () => {
        it('should publish message to default channel and save the message', function () {
            const publishSpy = jest.spyOn(publisher, 'publishToRoom');
            const saveSpy = jest.spyOn(repository, 'save');
            const message = 'Hello World!';
            service.create({message, user: userMock});
            expect(publishSpy).toBeCalled();
            expect(publishSpy).toBeCalledWith({message, event: EventTypesEnum.NEW_MESSAGE, room: RoomsEnum.DEFAULT});
            expect(saveSpy).toBeCalledWith({message, user: userMock});
        });
    });

    describe('find', () => {
        it('should return all messages on database', async () => {
            const findSpy = jest.spyOn(repository, 'find');
            const result = await service.find();
            expect(result).toEqual(messagesMock);
            expect(findSpy).toBeCalledWith({relations: ['user']});
        });

    })
})
