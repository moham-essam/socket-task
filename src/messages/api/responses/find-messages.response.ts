import {MessageListItemResponse} from "./message-list-item.response";
import {ApiProperty} from "@nestjs/swagger";
import {Message} from "../../domain/models/message";

export class FindMessagesResponse {
    @ApiProperty({isArray: true, type: MessageListItemResponse})
    list: MessageListItemResponse[];

    constructor(result: Message[]) {
        this.list = result.map(item => new MessageListItemResponse(item));
    }
}
