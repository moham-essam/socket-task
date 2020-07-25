import {DocumentBuilder} from "@nestjs/swagger";

export const SWAGGER_CONFIG_OPTIONS = new DocumentBuilder()
    .setTitle('Chat Example')
    .setDescription('The Chat API description')
    .setVersion('1.0')
    .build();
