import {User} from "../../../users/domain/models/user";

export class CreateMessageDto {
    message: string;
    user: User;
}
