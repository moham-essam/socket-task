import {RoomPublisherOptionsInterface} from "./room-publisher-options.interface";

export const ROOM_PUBLISHER = 'ROOM_PUBLISHER';

export interface RoomPublisherInterface {
    publishToRoom(options: RoomPublisherOptionsInterface): boolean;
}
