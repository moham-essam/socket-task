import {Body, Controller, Post} from "@nestjs/common";
import {ApiOkResponse} from "@nestjs/swagger";
import {CreateMessageRequest} from "./requests/create-message.request";
import {MessagesService} from "../domain/services/messages.service";

@Controller('messages')
export class MessagesController {
    constructor(private service: MessagesService) {
    }

    @ApiOkResponse({description: 'Send a message'})
    @Post()
    create(@Body() body: CreateMessageRequest) {
        return this.service.create({message: body.message});
    }
}
