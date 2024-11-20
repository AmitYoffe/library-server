import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController, AppService } from './';
import { BooksModule } from './books';
import { BorrowsModule } from './borrows';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { HttpExceptionFilter } from './http-exception.filter';
import { WritersModule } from './writers';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { UserModule } from './users';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    AuthModule,
    BooksModule,
    WritersModule,
    BorrowsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // The authguard is causing some module import issue:
    // Error: Nest can't resolve dependencies of the AuthGuard (?, ConfigService). 
    // Please make sure that the argument JwtService at index [0] is available in the AppModule context.

    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ]
})

export class AppModule { }

// APP_FILTER to make it a global filter class
// useClass is used to instantiate the privided class if necessary

// Read up on the providers docs