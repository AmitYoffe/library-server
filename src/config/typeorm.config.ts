import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: configService.get("HOST"),
      port: configService.get("PORT"),
      username: configService.get("DB_USERNAME"),
      password: configService.get("DB_PASSWORD"),
      database: configService.get("DB_NAME"),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
      // turn synchronize to false when i'm done altering entities
    }
  }
};

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> =>
    TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService]
}