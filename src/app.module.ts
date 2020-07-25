import {Module} from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import {MessagesModule} from "./messages/messages.module";
import {SERVE_STATIC_OPTIONS} from "./config/module-options/serve-static.option";
import {ConfigModule} from "@nestjs/config";
import {CONFIG_OPTIONS} from "./config/module-options/config.options";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TYPEORM_OPTIONS} from "./config/module-options/type-orm.options";
import {UsersModule} from "./users/users.module";
import {SharedModule} from "./shared/shared.module";

@Module({
    imports: [
        ConfigModule.forRoot(CONFIG_OPTIONS),
        MessagesModule,
        UsersModule,
        TypeOrmModule.forRootAsync(TYPEORM_OPTIONS),
        ServeStaticModule.forRoot(SERVE_STATIC_OPTIONS),
        SharedModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
