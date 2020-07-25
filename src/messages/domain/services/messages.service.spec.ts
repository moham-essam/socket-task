import {MessagesService} from "./messages.service";
import {RoomPublisherInterface} from "../interfaces/room-publisher.interface";
import {RoomPublisherOptionsInterface} from "../interfaces/room-publisher-options.interface";
import {EventTypesEnum} from "../enums/event-types.enum";
import {RoomsEnum} from "../enums/rooms.enum";

describe('Messages Service', () => {
    let service: MessagesService;
    let publisher: RoomPublisherInterface;

    beforeAll(async () => {
        publisher = {
            publishToRoom(options: RoomPublisherOptionsInterface): boolean {
                return true;
            }
        };

        service = new MessagesService(publisher);
    });


    describe('create', () => {
        it('should publish message to default channel', function () {
            const publishSpy = jest.spyOn(publisher, 'publishToRoom');
            const message = 'Hello World!';
            service.create({message});
            expect(publishSpy).toBeCalled();
            expect(publishSpy).toBeCalledWith({message, event: EventTypesEnum.NEW_MESSAGE, room: RoomsEnum.DEFAULT});
        });
    })
})
