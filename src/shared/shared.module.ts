import {Global, Module} from "@nestjs/common";
import {JwtStrategy} from "./passport-startegies/jwt.startegy";

@Global()
@Module({
    providers: [JwtStrategy]
})
export class SharedModule {
}
