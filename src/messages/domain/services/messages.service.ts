import {Inject, Injectable} from "@nestjs/common";
import {MESSAGE_ROOM_PUBLISHER, MessageRoomPublisherInterface} from "../interfaces/message-room-publisher.interface";
import {CreateMessageDto} from "../dtos/create-message.dto";
import {EventTypesEnum} from "../enums/event-types.enum";
import {RoomsEnum} from "../enums/rooms.enum";
import {InjectRepository} from "@nestjs/typeorm";
import {Message} from "../models/message";
import {Repository} from "typeorm";

@Injectable()
export class MessagesService {
    constructor(
        @Inject(MESSAGE_ROOM_PUBLISHER) private roomPublisher: MessageRoomPublisherInterface,
        @InjectRepository(Message) private repository: Repository<Message>
    ) {
    }

    async create(options: CreateMessageDto) {
        const message = await this.save(options);
        this.publish(message);
    }

    find() {
        return this.repository.find({relations: ['user'], order: {id: 'DESC'}});
    }

    private publish(message: Message) {
        this.roomPublisher.publishToRoom({message, event: EventTypesEnum.NEW_MESSAGE, room: RoomsEnum.DEFAULT});
    }

    private save(dto: CreateMessageDto) {
        return this.repository.save(dto)
    }
}
