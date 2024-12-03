import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksRepository } from './books.repository';
import { BooksService } from './books.service';
import { BookEntity } from './book.entity';
import { BooksController } from './books.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity]),
  ],
  providers: [BooksService, BooksRepository], // maybe i should add borrowService here
  exports: [BooksService],
  controllers: [BooksController],
})

export class BooksModule { }
