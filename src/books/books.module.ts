import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrow } from 'src/borrows/borrow.entity';
import { BorrowsService } from 'src/borrows/borrows.service';
import { Book } from './book.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Borrow])],
  exports: [TypeOrmModule],
  providers: [BooksService, BorrowsService],
  controllers: [BooksController]
})
export class BooksModule { }
