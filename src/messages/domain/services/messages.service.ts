import {Inject, Injectable} from "@nestjs/common";
import {ROOM_PUBLISHER, RoomPublisherInterface} from "../interfaces/room-publisher.interface";
import {CreateMessageDto} from "../dtos/create-message.dto";
import {EventTypesEnum} from "../enums/event-types.enum";
import {RoomsEnum} from "../enums/rooms.enum";
import {InjectRepository} from "@nestjs/typeorm";
import {Message} from "../models/message";
import {Repository} from "typeorm";
import {User} from "../../../users/domain/models/user";

@Injectable()
export class MessagesService {
    constructor(
        @Inject(ROOM_PUBLISHER) private roomPublisher: RoomPublisherInterface,
        @InjectRepository(Message) private repository: Repository<Message>
    ) {
    }

    create(options: CreateMessageDto) {
        this.publish(options.message);
        this.save(options);
    }

    private publish(message: string) {
        this.roomPublisher.publishToRoom({message, event: EventTypesEnum.NEW_MESSAGE, room: RoomsEnum.DEFAULT});
    }

    private save(dto: CreateMessageDto) {
        return this.repository.save(dto)
    }
}
