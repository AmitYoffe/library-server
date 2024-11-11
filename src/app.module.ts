import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { BorrowsModule } from './borrows/borrows.module';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { WritersModule } from './writers/writers.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    BooksModule,
    WritersModule,
    BorrowsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }