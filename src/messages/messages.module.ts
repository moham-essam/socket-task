import {Module} from "@nestjs/common";
import {ROOM_PUBLISHER} from "./domain/interfaces/room-publisher.interface";
import {MessagesGateway} from "./domain/gateways/messages.gateway";
import {MessagesService} from "./domain/services/messages.service";
import {MessagesController} from "./api/messages.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Message} from "./domain/models/message";

@Module({
    imports: [
        TypeOrmModule.forFeature([Message])
    ],
    controllers: [
        MessagesController,
    ],
    providers: [
        {
            provide: ROOM_PUBLISHER,
            useClass: MessagesGateway,
        },
        MessagesService,
    ]
})
export class MessagesModule {
}
