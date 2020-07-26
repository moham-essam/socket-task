import {ApiProperty} from "@nestjs/swagger";
import {Message} from "../../domain/models/message";

export class MessageListItemResponse {
    @ApiProperty()
    message: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    id: number;

    constructor(message: Message) {
        this.message = message.message;
        this.username = message.user.username;
        this.id = message.id;
    }
}
