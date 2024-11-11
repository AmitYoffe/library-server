import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrow, BorrowsService } from 'src/borrows';
import { Book, BooksController, BooksService } from './';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Borrow])],
  exports: [TypeOrmModule],
  providers: [BooksService, BorrowsService],
  controllers: [BooksController]
})
export class BooksModule { }
