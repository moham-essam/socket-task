import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {SwaggerModule} from "@nestjs/swagger";
import {SWAGGER_CONFIG_OPTIONS} from "./config/module-options/swagger.option";
import {SocketIoAdapter} from "./shared/adapters/socket-io.adapter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe())
    app.setGlobalPrefix('api/v1');
    const document = SwaggerModule.createDocument(app, SWAGGER_CONFIG_OPTIONS);
    SwaggerModule.setup('docs', app, document);
    app.useWebSocketAdapter(new SocketIoAdapter(app));
    await app.listen(3000);
}

bootstrap();
