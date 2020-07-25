import {Inject, Injectable} from "@nestjs/common";
import {ROOM_PUBLISHER, RoomPublisherInterface} from "../interfaces/room-publisher.interface";
import {CreateMessageDto} from "../dtos/create-message.dto";
import {EventTypesEnum} from "../enums/event-types.enum";
import {RoomsEnum} from "../enums/rooms.enum";

@Injectable()
export class MessagesService {
    constructor(@Inject(ROOM_PUBLISHER) private roomPublisher: RoomPublisherInterface) {
    }

    create(options: CreateMessageDto) {
        this.publish(options.message);
    }

    private publish(message: string) {
        this.roomPublisher.publishToRoom({message, event: EventTypesEnum.NEW_MESSAGE, room: RoomsEnum.DEFAULT});
    }
}
