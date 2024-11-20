import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowEntity, BorrowsService } from 'src/borrows';
import { BooksController, BookEntity } from './index';
import { BooksService } from './books.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, BorrowEntity])],
  exports: [TypeOrmModule],
  providers: [BooksService, BorrowsService],
  controllers: [BooksController]
})
export class BooksModule { }
