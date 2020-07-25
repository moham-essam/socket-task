import {Module} from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import {MessagesModule} from "./messages/messages.module";
import {SERVE_STATIC_OPTIONS} from "./config/module-options/serve-static.option";
import {ConfigModule} from "@nestjs/config";
import {CONFIG_OPTIONS} from "./config/module-options/config.options";

@Module({
    imports: [
        MessagesModule,
        ConfigModule.forRoot(CONFIG_OPTIONS),
        ServeStaticModule.forRoot(SERVE_STATIC_OPTIONS),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
