import {TypeOrmModuleAsyncOptions} from "@nestjs/typeorm";
import {ConfigService} from "@nestjs/config";
import {User} from "../../users/domain/models/user";
import {Message} from "../../messages/domain/models/message";

export const TYPEORM_OPTIONS: TypeOrmModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [User, Message],
        synchronize: true,
    })
}
