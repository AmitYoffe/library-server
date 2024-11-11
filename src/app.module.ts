import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { BorrowsModule } from './borrows/borrows.module';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { HttpExceptionFilter } from './http-exception.filter';
import { WritersModule } from './writers/writers.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    BooksModule,
    WritersModule,
    BorrowsModule
  ],
  controllers: [AppController],
  providers: [AppService, 
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
]
})

export class AppModule { }