import {OnGatewayConnection, OnGatewayInit, WebSocketGateway} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {MessageRoomPublisherInterface} from "../../domain/interfaces/message-room-publisher.interface";
import {RoomPublisherOptionsInterface} from "../../domain/interfaces/room-publisher-options.interface";
import {RoomsEnum} from "../../domain/enums/rooms.enum";
import {MessageListItemResponse} from "../responses/message-list-item.response";

@WebSocketGateway({namespace: 'messages'})
export class MessagesGateway implements OnGatewayConnection, MessageRoomPublisherInterface, OnGatewayInit {
    server: Server;

    handleConnection(client: Socket): any {
        client.join(RoomsEnum.DEFAULT);
    }

    publishToRoom(options: RoomPublisherOptionsInterface): boolean {
        return this.server.to(options.room).emit(options.event, new MessageListItemResponse(options.message));
    }

    afterInit(server: Server) {
        this.server = server;
    }
}
