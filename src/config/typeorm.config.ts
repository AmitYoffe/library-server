import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const port = parseInt(process.env.PORT);
const username = process.env.DB_USERNAME;
const password = process.env.PASSWORD;
const dbName = process.env.DB_NAME;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: port,
  username: username,
  password: password,
  database: dbName,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  // turn this to false when i'm done altering entities
};
