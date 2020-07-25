import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../../users/domain/models/user";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @ManyToOne(type => User)
    user: User;
}
