import {IoAdapter} from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';
import {INestApplication} from "@nestjs/common";
import {TOKEN_SERVICE, TokenServiceInterface} from "../../users/domain/interfaces/token-service.interface";

export class SocketIoAdapter extends IoAdapter {
    private tokenService: TokenServiceInterface;

    constructor(app: INestApplication) {
        super(app);
        this.tokenService = app.get(TOKEN_SERVICE);
    }

    createIOServer(port: number, options?: any): any {
        const server = super.createIOServer(port, this.buildOptions());
        const redisAdapter = redisIoAdapter({host: process.env.REDIS_HOST, port: process.env.REDIS_PORT});

        server.adapter(redisAdapter);
        return server;
    }

    private buildOptions() {
        return {
            allowRequest: async (request, allowFunction) => {
                try {
                    await this.tokenService.verify(request.headers.authorization);
                    return allowFunction(null, true);
                } catch (e) {
                    return allowFunction('Unauthorized', false);
                }
            }
        }
    }
}
