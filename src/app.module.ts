import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController, AppService } from './';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books';
import { BorrowsModule } from './borrows';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { HttpExceptionFilter, LoggerMiddleware } from './middleware';
import { UserModule } from './users';
import { WritersModule } from './writers';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    AuthModule,
    BooksModule,
    WritersModule,
    BorrowsModule,
    UserModule,
    // removing [ JwtModule, ConfigModule ] causes errors but i'm pretty sure i do not need them here
    JwtModule,
    ConfigModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    Logger,
  ]
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
