import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { BookEntity } from "src/books/book.entity";
import { BorrowEntity } from "src/borrows";
import { UserEntity } from "src/users";
import { WriterEntity } from "src/writers";

export function getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
        type: "postgres",
        host: configService.get("HOST"),
        port: configService.get("PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        // entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
        entities: [UserEntity, BorrowEntity, WriterEntity, BookEntity],
        // synchronize: true,
    }
}