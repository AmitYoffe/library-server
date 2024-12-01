import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books';
import { BorrowsModule } from './borrows';
import { typeOrmConfig } from './config/typeorm.config';
import { LoggerModule } from './logger/logger.module';
import { HttpExceptionFilter, LoggerMiddleware } from './middleware';
import { UserModule } from './users';
import { WritersModule } from './writers';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfig),
    AuthModule,
    BooksModule,
    WritersModule,
    BorrowsModule,
    UserModule,
    JwtModule,
    LoggerModule,
    ConfigModule.forRoot() // my own comment: read more about forRoot(), and understand .env accessing a little deeper
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ]
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
