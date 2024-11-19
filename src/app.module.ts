import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController, AppService } from './';
import { AuthGuard } from './auth/auth.guard';
import { BooksModule } from './books/books.module';
import { BorrowsModule } from './borrows/borrows.module';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { HttpExceptionFilter } from './http-exception.filter';
import { UserModule } from './users/user.module';
import { WritersModule } from './writers/writers.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    BooksModule,
    WritersModule,
    BorrowsModule,
    UserModule
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

export class AppModule { }

// APP_FILTER to make it a global filter class
// useClass is used to instantiate the privided class if necessary

// Read up on the providers docs