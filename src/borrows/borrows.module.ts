import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/books/book.entity';
import { Borrow } from './borrow.entity';
import { BorrowsService } from './borrows.service';

@Module({
  imports: [TypeOrmModule.forFeature([Borrow, Book])],
  exports: [TypeOrmModule],
  providers: [BorrowsService]
})
export class BorrowsModule { }
