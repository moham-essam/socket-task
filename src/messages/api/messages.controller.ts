import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {ApiOkResponse} from "@nestjs/swagger";
import {CreateMessageRequest} from "./requests/create-message.request";
import {MessagesService} from "../domain/services/messages.service";
import {JwtGuard} from "../../shared/guards/jwt.guard";
import {LoggedInUser} from "../../shared/decorators/logged-in-user";
import {User} from "../../users/domain/models/user";

@UseGuards(JwtGuard)
@Controller('messages')
export class MessagesController {
    constructor(private service: MessagesService) {
    }

    @ApiOkResponse({description: 'Send a message'})
    @Post()
    create(@Body() body: CreateMessageRequest, @LoggedInUser() user: User) {
        return this.service.create({message: body.message, user});
    }
}
