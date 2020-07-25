import {OnGatewayConnection, OnGatewayInit, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {RoomPublisherInterface} from "../interfaces/room-publisher.interface";
import {RoomPublisherOptionsInterface} from "../interfaces/room-publisher-options.interface";
import {RoomsEnum} from "../enums/rooms.enum";

@WebSocketGateway({namespace: 'messages'})
export class MessagesGateway implements OnGatewayConnection, RoomPublisherInterface, OnGatewayInit {
    server: Server;

    handleConnection(client: Socket): any {
        client.join(RoomsEnum.DEFAULT);
    }

    publishToRoom(options: RoomPublisherOptionsInterface): boolean {
        return this.server.to(options.room).emit(options.event, options.message);
    }

    afterInit(server: Server) {
        this.server = server;
    }
}
