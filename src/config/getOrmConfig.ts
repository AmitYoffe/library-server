import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export function getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
        type: "postgres",
        // host: configService.get("HOST"), maybe this is unnecessary
        port: configService.get("PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        entities: [__dirname + 'src/**/*.entity{.ts,.js}'],
        synchronize: true,
        // schema: 'public'
    }
}