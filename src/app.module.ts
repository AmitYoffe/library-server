import { MiddlewareConsumer, Module } from '@nestjs/common';
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
  ]
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}

// APP_FILTER to make it a global filter class
// useClass is used to instantiate the privided class if necessary

// Read up on the providers docs