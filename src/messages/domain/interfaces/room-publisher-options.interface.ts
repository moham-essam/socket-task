import {Message} from "../models/message";

export interface RoomPublisherOptionsInterface {
    room: string;
    event: string;
    message: Message;
}
