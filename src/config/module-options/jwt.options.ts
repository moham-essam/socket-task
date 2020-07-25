import {JwtModuleAsyncOptions} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

export const JWT_OPTIONS: JwtModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET')
    }),
};
