import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {SwaggerModule} from "@nestjs/swagger";
import {SWAGGER_CONFIG_OPTIONS} from "./config/module-options/swagger.option";
import {RedisIoAdapter} from "./shared/adapters/redis-io.adapter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe())
    app.setGlobalPrefix('api/v1');
    const document = SwaggerModule.createDocument(app, SWAGGER_CONFIG_OPTIONS);
    SwaggerModule.setup('docs', app, document);
    app.useWebSocketAdapter(new RedisIoAdapter(app));
    await app.listen(3000);
}

bootstrap();
