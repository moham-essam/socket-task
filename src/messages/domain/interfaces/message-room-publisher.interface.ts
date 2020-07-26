import {RoomPublisherOptionsInterface} from "./room-publisher-options.interface";

export const MESSAGE_ROOM_PUBLISHER = 'MESSAGE_ROOM_PUBLISHER';

export interface MessageRoomPublisherInterface {
    publishToRoom(options: RoomPublisherOptionsInterface): boolean;
}
