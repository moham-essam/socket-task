import {TypeOrmModuleAsyncOptions} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {User} from "../../users/domain/models/user";

export const TYPEORM_OPTIONS: TypeOrmModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [User],
        synchronize: true,
    })
}
