import {Body, Controller, Get, Post, Query, UseGuards} from "@nestjs/common";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateMessageRequest} from "./requests/create-message.request";
import {MessagesService} from "../domain/services/messages.service";
import {JwtGuard} from "../../shared/guards/jwt.guard";
import {LoggedInUser} from "../../shared/decorators/logged-in-user";
import {User} from "../../users/domain/models/user";
import {FindMessagesResponse} from "./responses/find-messages.response";

@UseGuards(JwtGuard)
@Controller('messages')
export class MessagesController {
    constructor(private service: MessagesService) {
    }

    @ApiCreatedResponse({description: 'Send a message'})
    @Post()
    create(@Body() body: CreateMessageRequest, @LoggedInUser() user: User) {
        return this.service.create({message: body.message, user});
    }

    @Get()
    @ApiOkResponse({description: 'Find all messages', type: FindMessagesResponse})
    async find() {
        const messages = await this.service.find();
        return new FindMessagesResponse(messages);
    }

}
